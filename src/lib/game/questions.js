import { asking } from './engine.js'

/*
 * THE GAME'S QUESTIONS, WITHOUT THE GAME (the club, 2026-11-20: "a separate
 * part from the game where we can answer all the questions … in a fixed order
 * so we all open them together and keep track on the call that we're all
 * looking at the same question" — and after a game, "an option to answer the
 * rest of the questions that we didn't get in the game"). The page is
 * components/game/Practice.jsx; this file decides WHAT is in it, and in what
 * order. Pure: no React.
 *
 * EVERY QUESTION A GAME CAN DEAL — the eight kinds below, from the very decks
 * the game plays with (pages/Game.jsx assembles them once, for both) — and
 * nothing that is not a question: no dares, chance cards or Lab games.
 *
 * ONE FIXED ORDER, the same on every phone, so "question 12" said on the call
 * is the same question everywhere. Each deck is spread evenly through the list
 * (card j of a deck of n sits at (j + ½) / n), so the kinds and the books come
 * mixed, as they do in a game; ties go to the registry's book order, then
 * KINDS. The order only moves when the decks change: a question added shifts
 * the ones after it.
 *
 * What a game could not deal is left out, by the game's own rules
 * (engine.js → `challenge`): a question that links books (`also`) unless all of
 * them are in the list, «من أيّ كتاب؟» pictures in a one-book list, and
 * «من هو؟» / «من هذا؟» from a book with fewer than four people.
 */
export const KINDS = ['mcq', 'tf', 'who', 'num', 'face', 'graph', 'pic', 'bluff']

/* The list for `books` (all of them by default), less the ids in `skip`. */
export function questionList(decks, { books = decks.books, skip = null } = {}) {
  const rows = []
  for (const b of books) {
    const bi = decks.books.indexOf(b)
    KINDS.forEach((k, ki) => {
      const deck = (decks.byBook[b]?.[k] || []).filter((item) => (!item.also || item.also.every((x) => books.includes(x)))
        && (k !== 'pic' || books.length > 1 || item.kind !== 'book'))
      if ((k === 'who' || k === 'face') && (decks.byBook[b]?.[k] || []).length < 4) return
      deck.forEach((item, j) => rows.push({ k, id: item.id, book: b, at: (j + 0.5) / deck.length, bi, ki }))
    })
  }
  rows.sort((x, y) => x.at - y.at || x.bi - y.bi || x.ki - y.ki)
  return rows.filter((row) => !skip?.has(row.id)).map(({ k, id, book }) => ({ k, id, book }))
}

/* "THE REST": a finished game's books, and the questions it did not ask. */
export function restOf(core, decks) {
  const { keys } = asking(decks)
  const skip = new Set((core.asked || []).map((i) => keys[i]).filter((key) => key?.startsWith('q:')).map((key) => key.slice(2)))
  return { books: decks.books.filter((b) => (core.boards || []).includes(b)), skip }
}

/* …written into the address, so every phone at the table opens the same list
   and a refresh keeps it: the books by their place in the registry, and what
   was asked by its number (engine.js → `asking`), in base 36. */
export function restSearch(core, decks) {
  const { at } = asking(decks)
  const { books, skip } = restOf(core, decks)
  return new URLSearchParams({
    books: books.map((b) => decks.books.indexOf(b)).join('.'),
    asked: [...skip].map((id) => at.get(`q:${id}`).toString(36)).join('.'),
  }).toString()
}

/* …and read back: { books, skip }, or null when the address is not a game's rest. */
export function readRest(params, decks) {
  if (!params.has('asked')) return null
  const { keys } = asking(decks)
  const listed = new Set((params.get('books') || '').split('.').map((s) => decks.books[Number(s)]).filter(Boolean))
  const skip = new Set((params.get('asked') || '').split('.').filter(Boolean)
    .map((s) => keys[parseInt(s, 36)]).filter((key) => key?.startsWith('q:')).map((key) => key.slice(2)))
  return { books: listed.size ? decks.books.filter((b) => listed.has(b)) : decks.books, skip }
}
