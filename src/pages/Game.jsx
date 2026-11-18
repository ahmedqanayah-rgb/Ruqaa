import { useLocation } from 'react-router-dom'
import { books } from '../data/books.js'
import { luckCards, dares } from '../data/game/cards.js'
import { assembleDecks } from '../lib/game/decks.js'
import { ROOM_RE, PID_RE, cleanRoomCode } from '../lib/game/net.js'
import GameEntry from '../components/game/GameEntry.jsx'
import GameRoom from '../components/game/GameRoom.jsx'
import '../styles/game.css'

/*
 * «رُقعة النرد» — THE CLUB'S BOARD GAME, played on the weekly call with
 * EVERYONE ON THEIR OWN PHONE. One player opens a room and reads its six-digit
 * code out on the call; the others join with it. Every phone shows the same
 * board, and every round is played by everyone at once.
 *
 * HOW THE PHONES TALK: through a small mailbox on our own origin
 * (api/room.js → api/_mailbox.js), polled about once a second — so the site
 * still makes no request to anyone else. The rules run on every phone
 * (lib/game/engine.js), the phones keep each other's copies honest
 * (lib/game/net.js), and scripts/sim-game.mjs plays hundreds of games over a
 * deliberately bad network to prove that they agree.
 *
 * WHERE THINGS LIVE — no storage, as everywhere on this site:
 *   the address bar   `#/game?room=123456&me=<id>` — which room, and which
 *                     player this tab is. A refresh lands back in the same seat.
 *                     The INVITE link has no `me`: whoever opens it is asked
 *                     for a name and gets a seat of their own.
 *   the mailbox       the game itself, while anyone is playing (forgotten three
 *                     hours after the last move), and copied on every phone.
 *
 * THIS PAGE IS A LAZY CHUNK (App.jsx), like each book. The decks are found by
 * glob — every `data/books/<slug>/game.js` puts its book in the game, and the
 * book's myth-or-fact deck becomes its «خرافة أم حقيقة؟» rounds. They import
 * each book's `game.js` and `mythOrFact.js` ONLY, never the book itself, so
 * the books' content stays in the books' own chunks.
 */
const deckFiles = import.meta.glob('../data/books/*/game.js', { eager: true })
const mythFiles = import.meta.glob('../data/books/*/mythOrFact.js', { eager: true })
const byBook = (files) => Object.fromEntries(Object.entries(files).map(([path, mod]) => [path.split('/').slice(-2)[0], mod]))

const decks = assembleDecks({
  order: books.map((b) => b.id),
  games: byBook(deckFiles),
  myths: byBook(mythFiles),
  luck: luckCards,
  dares,
})

export default function Game() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const code = cleanRoomCode(params.get('room'))
  const me = params.get('me') || ''

  if (ROOM_RE.test(code) && PID_RE.test(me)) {
    // A new seat or a new room is a new mount: nothing of the last one leaks in.
    return <GameRoom key={`${code}:${me}`} code={code} me={me} decks={decks} />
  }
  // The front door too. GameEntry copies `invite` into its state once, when it
  // mounts, so an invite that arrives WITHOUT a page load — the link pasted
  // into a tab already on #/game — has to be a new mount, or its «ادخل الغرفة»
  // keeps the old empty code and quietly does nothing (found live 2026-11-18).
  const invite = ROOM_RE.test(code) ? code : ''
  return <GameEntry key={invite} decks={decks} invite={invite} />
}
