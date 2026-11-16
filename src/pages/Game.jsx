import { useEffect, useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import { books } from '../data/books.js'
import { luckCards, dares } from '../data/game/cards.js'
import { makeReducer, setupState, decode, encode } from '../lib/game/engine.js'
import GameSetup from '../components/game/GameSetup.jsx'
import GameStage from '../components/game/GameStage.jsx'
import '../styles/game.css'

/*
 * «رُقعة النرد» — THE CLUB'S DICE GAME. A board, a die, and questions from the
 * books the club has read, played by everyone on the weekly call.
 *
 * HOW IT IS PLAYED TOGETHER: one person opens this page and shares their screen
 * in the meeting. Players answer out loud; the host taps what they said. There
 * is no server and nothing to join — the site has no backend, and a game that
 * needed every member to connect a phone to it would be the first thing on this
 * site that could fail for a reason other than the reader's own connection.
 *
 * THIS PAGE IS A LAZY CHUNK (App.jsx), like each book: the questions, the board
 * and this stylesheet are downloaded when someone opens the game, not by a
 * reader who came for a chapter.
 *
 * THE DECKS ARE FOUND, NOT REGISTERED. Every book that has a
 * `data/books/<slug>/game.js` is in the game, and its myth-or-fact deck becomes
 * the «خرافة أم حقيقة؟» squares. Adding next season's book to the game is
 * writing that one file. The globs are `eager` — they are inside this lazy
 * chunk already, and the game needs all of them at once.
 *
 * ⚠ They import each book's `game.js` and `mythOrFact.js` ONLY. Neither file
 * imports the book, so the books' content stays in the books' own chunks; a
 * deck that imported its book's `index.js` would drag the whole book in here.
 */
const deckFiles = import.meta.glob('../data/books/*/game.js', { eager: true })
const mythFiles = import.meta.glob('../data/books/*/mythOrFact.js', { eager: true })
const bookIdOf = (path) => path.split('/').slice(-2)[0]

function buildDecks() {
  const mcq = {}
  const icon = {}
  const art = {}
  const tf = {}
  for (const [path, mod] of Object.entries(deckFiles)) {
    const id = bookIdOf(path)
    mcq[id] = mod.gameDeck || []
    icon[id] = mod.gameIcon || '📖'
    // Optional: a book with no picture of its own gets its tone as the band.
    art[id] = mod.gameArt || null
  }
  for (const [path, mod] of Object.entries(mythFiles)) {
    const id = bookIdOf(path)
    // The myth deck has no ids of its own; its order in the file is stable
    // enough to be one for the length of a game.
    if (mcq[id]) tf[id] = (mod.mythOrFact || []).map((item, i) => ({ ...item, id: `${id}:${i}`, book: id }))
  }
  // Registry order, and only the books that have questions.
  const playable = books.filter((b) => mcq[b.id]?.length).map((b) => b.id)
  return { books: playable, mcq, icon, art, tf, luck: luckCards, dare: dares }
}

const decks = buildDecks()
const reduce = makeReducer(decks)

export default function Game() {
  const { search } = useLocation()
  /* A game in the address bar is resumed; anything else starts at the setup
     screen. Read ONCE, on arrival: after that the state writes the URL, not the
     other way round. */
  const [state, dispatch] = useReducer(reduce, null, () => {
    const saved = new URLSearchParams(search).get('g')
    return (saved && decode(saved, decks)) || setupState(decks)
  })

  /* THE GAME IS KEPT IN THE URL (see lib/game/engine.js for why).
     `replaceState`, not the router's navigate, for two reasons: a move must not
     be a history entry — Back should leave the game, not undo a turn — and the
     router must not hear about it, because Analytics fires a pageview on every
     location change and would log forty of them per game, each with the
     players' names in it. Passing `history.state` back keeps the router's own
     bookkeeping (its entry index) intact. */
  useEffect(() => {
    const hash = state.phase === 'setup' ? '#/game' : `#/game?g=${encode(state)}`
    if (window.location.hash !== hash) window.history.replaceState(window.history.state, '', hash)
  }, [state])

  /* While a game is on, the whole window is the board: `data-stage` tells the
     shell to put its chrome away (components.css), the way presentation mode
     does. Removed on the way out so the next page gets its navigation back. */
  const onStage = state.phase !== 'setup'
  useEffect(() => {
    document.documentElement.toggleAttribute('data-stage', onStage)
    return () => document.documentElement.removeAttribute('data-stage')
  }, [onStage])

  return onStage
    ? <GameStage state={state} dispatch={dispatch} decks={decks} />
    : <GameSetup state={state} dispatch={dispatch} decks={decks} />
}
