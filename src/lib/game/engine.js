/*
 * «رُقعة النرد» — THE RULES, as a pure state machine. No React, no DOM, no
 * clock: `reduce(state, action)` in, a new state out. The page (pages/Game.jsx)
 * owns the dice animation, the sounds and the timers and tells this file only
 * what happened ("rolled a 4", "arrived", "picked the second option").
 *
 * It is pure for two reasons that both matter here:
 *
 * 1. THE WHOLE GAME LIVES IN THE ADDRESS BAR. The project keeps no storage —
 *    no localStorage, ever — so a refresh used to mean a new sitting. That is
 *    fine for a reading tick and fatal for a forty-minute game played on a
 *    call: one pull-to-refresh on the host's phone and the score is gone. So
 *    the state is plain JSON, `encode()`d into `#/game?g=…` after every move,
 *    and `decode()`d on arrival. A refresh resumes; so does the Back button;
 *    and if the host's connection drops, anyone they sent the link to can carry
 *    the same game on from the same square.
 * 2. A URL IS INPUT. Anything can be pasted into it, so `decode()` rebuilds a
 *    state field by field and throws away whatever it does not recognise,
 *    rather than trusting a parsed blob.
 *
 * THE GAME, in one paragraph. Two to six players take turns: roll, move along
 * the board, and do what the square says — a QUESTION from that square's book
 * (+2), a MYTH-OR-FACT statement from the books' own decks (+1), a DARE the
 * group judges (+2), or a LUCK card. The first to reach the last square earns
 * +3 and ends the game — but the ROUND is finished first, so everyone has had
 * the same number of turns. Then the highest score wins: getting there first
 * is worth three points, not the game.
 */

export const LENGTHS = { short: 20, medium: 30, long: 40 }
export const TIMERS = [0, 30, 60]
export const POINTS = { mcq: 2, tf: 1, dare: 2, finish: 3, finishLate: 1 }
export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 6
export const NAME_MAX = 18
const VERSION = 1

/* ---- a small seeded generator (mulberry32) ----
   The BOARD is built from a seed so that it can be rebuilt from the URL rather
   than stored in it. Card draws use Math.random: the drawn card's id goes into
   the state, so there is nothing to reproduce. */
function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffled(list, rand = Math.random) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/* The rhythm of the squares between start and finish. Eight in fourteen are
   book questions; the rest alternate so two of a kind never touch. The seed
   only decides where in the rhythm the board starts and in what order the
   books take their turns. */
const PATTERN = ['book', 'book', 'tf', 'book', 'luck', 'book', 'dare', 'book', 'book', 'tf', 'book', 'luck', 'book', 'dare']

export function buildBoard(seed, length, bookIds) {
  const n = LENGTHS[length] || LENGTHS.medium
  const rand = seeded(seed)
  const order = shuffled(bookIds, rand)
  const offset = Math.floor(rand() * PATTERN.length)
  const squares = [{ type: 'start' }]
  let b = 0
  for (let i = 1; i < n - 1; i++) {
    const type = PATTERN[(i - 1 + offset) % PATTERN.length]
    squares.push(type === 'book' ? { type, book: order[b++ % order.length] } : { type })
  }
  squares.push({ type: 'finish' })
  return squares
}

/* ---------------- state ---------------- */

export function setupState(decks, keep = {}) {
  return {
    v: VERSION,
    phase: 'setup',
    names: keep.names || ['', ''],
    settings: keep.settings || { length: 'medium', books: [...decks.books], timer: 0 },
  }
}

function freshUsed() {
  return { mcq: [], tf: [], luck: [], dare: [] }
}

function startState(names, settings, seed) {
  return {
    v: VERSION,
    phase: 'play',
    settings,
    seed,
    players: names.map((name) => ({ name, pos: 0, score: 0, skip: false, debt: 0, done: false })),
    turn: 0,
    round: 1,
    step: 'roll',
    die: null,
    card: null,
    used: freshUsed(),
    finisher: null,
    notices: [],
  }
}

const lastSquare = (state) => LENGTHS[state.settings.length] - 1
const clampScore = (n) => Math.max(0, n)

/* ---------------- drawing cards ---------------- */

/* One unused item from a pool, and the `used` list with it added. When a pool
   runs dry it starts over — a long game with one book has more book squares
   than that book has questions — but never by handing back the card that was
   just played. */
function draw(pool, used) {
  if (!pool.length) return null
  let fresh = pool.filter((c) => !used.includes(c.id))
  let nextUsed = used
  if (!fresh.length) {
    const last = used[used.length - 1]
    fresh = pool.length > 1 ? pool.filter((c) => c.id !== last) : pool
    nextUsed = []
  }
  const pick = fresh[Math.floor(Math.random() * fresh.length)]
  return { pick, used: [...nextUsed, pick.id] }
}

function drawFor(state, square, decks) {
  const books = state.settings.books
  const inPlay = (c) => c.book == null || books.includes(c.book)
  const put = (kind, got, extra) => ({
    card: { kind, id: got.pick.id, ...extra },
    used: { ...state.used, [kind]: got.used },
  })

  if (square.type === 'book') {
    const got = draw(decks.mcq[square.book] || [], state.used.mcq)
    if (!got) return null
    // The options' on-screen order. Stored, so a refresh shows the same card.
    const order = shuffled(got.pick.opts.map((_, i) => i))
    return put('mcq', got, { book: square.book, order, picked: null, right: null })
  }
  if (square.type === 'tf') {
    const pool = books.flatMap((b) => decks.tf[b] || [])
    const got = draw(pool, state.used.tf)
    return got && put('tf', got, { book: got.pick.book, picked: null, right: null })
  }
  if (square.type === 'luck') {
    const got = draw(decks.luck.filter(inPlay), state.used.luck)
    return got && put('luck', got, { book: got.pick.book })
  }
  if (square.type === 'dare') {
    const got = draw(decks.dare.filter(inPlay), state.used.dare)
    return got && put('dare', got, { book: got.pick.book })
  }
  return null
}

/* Find a card's content again from the id the state carries. */
export function cardContent(card, decks) {
  if (!card) return null
  if (card.kind === 'mcq') return (decks.mcq[card.book] || []).find((c) => c.id === card.id) || null
  if (card.kind === 'tf') return (decks.tf[card.book] || []).find((c) => c.id === card.id) || null
  if (card.kind === 'luck') return decks.luck.find((c) => c.id === card.id) || null
  if (card.kind === 'dare') return decks.dare.find((c) => c.id === card.id) || null
  return null
}

/* ---------------- turn order ---------------- */

/* Reaching the last square. The first to do it gets the bonus and starts the
   end of the game; anyone who also gets there before the round is out gets a
   smaller one, so a late arrival is still worth something. */
function finish(state, i) {
  const first = state.finisher == null
  const bonus = first ? POINTS.finish : POINTS.finishLate
  const players = state.players.map((p, k) => (k === i ? { ...p, score: p.score + bonus, done: true } : p))
  return { state: { ...state, players, finisher: first ? i : state.finisher }, bonus }
}

/* Pass the turn. A player who owes a turn is stepped over (and told so); a
   player with a loan repays it as their turn begins. When the order wraps and
   somebody has finished, the round is complete and the game is over. */
function advance(state) {
  const players = state.players.map((p) => ({ ...p }))
  const notices = []
  let i = state.turn
  let round = state.round
  for (let guard = 0; guard <= players.length * 2; guard++) {
    i += 1
    if (i >= players.length) {
      if (state.finisher != null) {
        return { ...state, players, phase: 'over', step: 'done', card: null, die: null, notices: [] }
      }
      i = 0
      round += 1
    }
    if (players[i].skip) {
      players[i].skip = false
      notices.push({ kind: 'skip', player: i })
      continue
    }
    break
  }
  if (players[i].debt > 0) {
    notices.push({ kind: 'debt', player: i, n: players[i].debt })
    players[i].score = clampScore(players[i].score - players[i].debt)
    players[i].debt = 0
  }
  return { ...state, players, turn: i, round, step: 'roll', card: null, die: null, notices }
}

/* ---------------- luck ---------------- */

function applyLuck(state, effect) {
  const me = state.turn
  const last = lastSquare(state)
  let players = state.players.map((p) => ({ ...p }))
  const others = players.map((_, i) => i).filter((i) => i !== me)
  const notices = []
  let again = false

  switch (effect.kind) {
    case 'move':
      players[me].pos = Math.min(last, Math.max(0, players[me].pos + effect.n))
      break
    case 'score':
      players[me].score = clampScore(players[me].score + effect.n)
      break
    case 'again':
      again = true
      break
    case 'skip':
      players[me].skip = true
      break
    case 'steal': {
      // From whoever is ahead of the rest. Nobody with a point to take: the
      // bank pays instead, so the card is never a dud.
      const victim = others.filter((i) => players[i].score > 0).sort((a, b) => players[b].score - players[a].score)[0]
      if (victim != null) {
        players[victim].score -= 1
        notices.push({ kind: 'stolen', player: victim, by: me })
      }
      players[me].score += 1
      break
    }
    case 'gift': {
      const poorest = [...others].sort((a, b) => players[a].score - players[b].score)[0]
      if (poorest != null && players[me].score > 0) {
        players[me].score -= 1
        players[poorest].score += 1
        notices.push({ kind: 'gift', player: poorest, by: me })
      }
      break
    }
    case 'others':
      // Not the ones who have already finished: they are off the board.
      others.filter((i) => !players[i].done).forEach((i) => {
        players[i].pos = Math.min(last, Math.max(0, players[i].pos + effect.n))
      })
      break
    case 'all':
      players = players.map((p) => ({ ...p, score: clampScore(p.score + effect.n) }))
      break
    case 'loan':
      players[me].score += effect.now
      players[me].debt += effect.later
      break
    default:
      break
  }

  let next = { ...state, players }
  // A luck card can carry a player onto the last square.
  if (players[me].pos >= last && !players[me].done) {
    const done = finish(next, me)
    next = done.state
    notices.push({ kind: 'finished', player: me, n: done.bonus })
  }
  if (again && !next.players[me].done) {
    return { ...next, step: 'roll', card: null, die: null, notices: [{ kind: 'again', player: me }] }
  }
  const passed = advance(next)
  return passed.phase === 'over' ? passed : { ...passed, notices: [...notices, ...passed.notices] }
}

/* ---------------- the reducer ---------------- */

export function makeReducer(decks) {
  return function reduce(state, action) {
    switch (action.type) {
      case 'load':
        return action.state

      /* ---- setup ---- */
      case 'names':
        return state.phase === 'setup' ? { ...state, names: action.names } : state
      case 'settings':
        return state.phase === 'setup' ? { ...state, settings: { ...state.settings, ...action.patch } } : state
      case 'start': {
        if (state.phase !== 'setup') return state
        const names = state.names.map((n, i) => n.trim().slice(0, NAME_MAX) || action.fallback(i))
        if (names.length < MIN_PLAYERS || !state.settings.books.length) return state
        return startState(names, state.settings, action.seed)
      }

      /* ---- a turn ---- */
      case 'roll': {
        if (state.phase !== 'play' || state.step !== 'roll') return state
        const value = Math.min(6, Math.max(1, action.value | 0))
        const me = state.turn
        const players = state.players.map((p, i) => (i === me
          ? { ...p, pos: Math.min(lastSquare(state), p.pos + value) }
          : p))
        return { ...state, players, die: value, step: 'moving', notices: [] }
      }
      case 'arrive': {
        if (state.phase !== 'play' || state.step !== 'moving') return state
        const me = state.turn
        const board = buildBoard(state.seed, state.settings.length, state.settings.books)
        const square = board[state.players[me].pos]
        if (square.type === 'finish') {
          const done = finish(state, me)
          return { ...done.state, step: 'card', card: { kind: 'finish', bonus: done.bonus } }
        }
        const drawn = drawFor(state, square, decks)
        // An empty deck (a book with no questions yet) is a free square.
        if (!drawn) return advance(state)
        return { ...state, step: 'card', card: drawn.card, used: drawn.used }
      }
      case 'answer': {
        // `pick` is the position tapped (mcq) or the boolean "it's a myth" (tf);
        // null means the timer ran out.
        if (state.step !== 'card' || !state.card) return state
        const { card } = state
        const content = cardContent(card, decks)
        if (!content) return advance(state)
        let right = false
        if (card.kind === 'mcq') right = action.pick != null && card.order[action.pick] === 0
        else if (card.kind === 'tf') right = action.pick != null && action.pick === content.isMyth
        else return state
        const gain = right ? POINTS[card.kind] : 0
        const players = state.players.map((p, i) => (i === state.turn ? { ...p, score: p.score + gain } : p))
        return { ...state, players, step: 'reveal', card: { ...card, picked: action.pick, right } }
      }
      case 'judge': {
        if (state.step !== 'card' || state.card?.kind !== 'dare') return state
        const gain = action.passed ? POINTS.dare : 0
        const players = state.players.map((p, i) => (i === state.turn ? { ...p, score: p.score + gain } : p))
        const passed = advance({ ...state, players })
        if (passed.phase === 'over') return passed
        return { ...passed, notices: [{ kind: 'dare', player: state.turn, n: gain }, ...passed.notices] }
      }
      case 'apply': {
        if (state.step !== 'card' || state.card?.kind !== 'luck') return state
        const content = cardContent(state.card, decks)
        return content ? applyLuck(state, content.effect) : advance(state)
      }
      case 'next': {
        if (state.phase !== 'play') return state
        if (state.step === 'reveal' || (state.step === 'card' && state.card?.kind === 'finish')) return advance(state)
        return state
      }

      /* ---- after ---- */
      case 'again':
        // Same people, same settings, a new board.
        return startState(state.players.map((p) => p.name), state.settings, action.seed)
      case 'setup':
        return setupState(decks, {
          names: state.players ? state.players.map((p) => p.name) : state.names,
          settings: state.settings,
        })
      default:
        return state
    }
  }
}

/* ---------------- the result ---------------- */

/* Highest score first; among equals, whoever got further along the board. The
   winners are everyone level with the top on BOTH — a real tie is shared, not
   broken by the order people happened to sit in. */
export function ranking(players) {
  const order = players.map((p, i) => ({ ...p, index: i }))
    .sort((a, b) => b.score - a.score || b.pos - a.pos)
  const top = order[0]
  return order.map((p) => ({ ...p, winner: p.score === top.score && p.pos === top.pos }))
}

/* ---------------- the address bar ---------------- */

const b64 = {
  to: (text) => {
    const bytes = new TextEncoder().encode(text)
    let bin = ''
    bytes.forEach((b) => { bin += String.fromCharCode(b) })
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  },
  from: (str) => {
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'))
    return new TextDecoder().decode(Uint8Array.from(bin, (ch) => ch.charCodeAt(0)))
  },
}

export function encode(state) {
  return b64.to(JSON.stringify(state))
}

const int = (v, min, max, fallback = min) => (Number.isFinite(v) ? Math.min(max, Math.max(min, Math.trunc(v))) : fallback)
const ids = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 400) : [])

/* A state from the `?g=` parameter, or null if it is not one. REBUILT, never
   trusted: every field is read, typed and clamped, and a card that no longer
   exists in the decks (the site was updated mid-game) simply ends that turn. */
export function decode(str, decks) {
  let raw
  try { raw = JSON.parse(b64.from(str)) } catch { return null }
  if (!raw || raw.v !== VERSION || !['play', 'over'].includes(raw.phase)) return null

  const s = raw.settings || {}
  const books = ids(s.books).filter((b) => decks.books.includes(b))
  if (!books.length || !LENGTHS[s.length]) return null
  const settings = { length: s.length, books, timer: TIMERS.includes(s.timer) ? s.timer : 0 }
  const last = LENGTHS[settings.length] - 1

  if (!Array.isArray(raw.players) || raw.players.length < MIN_PLAYERS || raw.players.length > MAX_PLAYERS) return null
  const players = raw.players.map((p, i) => ({
    name: String(p?.name ?? '').slice(0, NAME_MAX) || `#${i + 1}`,
    pos: int(p?.pos, 0, last),
    score: int(p?.score, 0, 9999),
    skip: !!p?.skip,
    debt: int(p?.debt, 0, 99),
    done: !!p?.done,
  }))

  const state = {
    v: VERSION,
    phase: raw.phase,
    settings,
    seed: int(raw.seed, 0, 0xffffffff),
    players,
    turn: int(raw.turn, 0, players.length - 1),
    round: int(raw.round, 1, 999, 1),
    step: ['roll', 'moving', 'card', 'reveal', 'done'].includes(raw.step) ? raw.step : 'roll',
    die: raw.die == null ? null : int(raw.die, 1, 6, 1),
    card: null,
    used: { mcq: ids(raw.used?.mcq), tf: ids(raw.used?.tf), luck: ids(raw.used?.luck), dare: ids(raw.used?.dare) },
    finisher: raw.finisher == null ? null : int(raw.finisher, 0, players.length - 1),
    notices: [],
  }

  const c = raw.card
  if (c && state.phase === 'play' && (state.step === 'card' || state.step === 'reveal')) {
    if (c.kind === 'finish') {
      state.card = { kind: 'finish', bonus: int(c.bonus, 0, POINTS.finish) }
    } else {
      const card = { kind: c.kind, id: String(c.id), book: c.book == null ? null : String(c.book) }
      const content = cardContent(card, decks)
      if (content && c.kind === 'mcq') {
        const n = content.opts.length
        const order = Array.isArray(c.order) ? c.order.map((x) => int(x, 0, n - 1)) : []
        const whole = order.length === n && new Set(order).size === n
        state.card = {
          ...card,
          order: whole ? order : content.opts.map((_, i) => i),
          picked: c.picked == null ? null : int(c.picked, 0, n - 1),
          right: c.right == null ? null : !!c.right,
        }
      } else if (content && c.kind === 'tf') {
        state.card = { ...card, picked: c.picked == null ? null : !!c.picked, right: c.right == null ? null : !!c.right }
      } else if (content) {
        state.card = card
      }
    }
  }
  // A card step with no card to show cannot be played; hand the dice back.
  if ((state.step === 'card' || state.step === 'reveal') && !state.card) state.step = 'roll'
  if (state.phase === 'over') state.step = 'done'
  return state
}
