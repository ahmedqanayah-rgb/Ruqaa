import { lastOf, typeAt, boardOf } from './board.js'
import { MINIS, miniScore, rankAwards, AUCTION, STAG } from './minis.js'
import { hash32, seeded, shuffled, range } from './rand.js'
import { matchesName } from './match.js'

/*
 * «رُقعة النرد» — THE RULES. One pure function, `advance(core, entries, env)`:
 * given the game as it stands (`core`), what each player has put in their own
 * entry (`entries`), and the time (`env.now`), it returns the next core — or
 * null if nothing is due yet. No React, no DOM, no network, no clock of its
 * own, no Math.random.
 *
 * EVERY PHONE RUNS THIS, AND THEY MUST AGREE (see net.js). Three habits keep
 * them agreeing, and a change that breaks one will desynchronise real games:
 *
 *  1. `env.now` and `env.present` are only ever a GATE — "is it time?", "are we
 *     still waiting on her?". They never go INTO the result. Every time written
 *     into a core comes from an entry (when the player tapped) or from a
 *     deadline already in the core. Two phones that decide a step a second
 *     apart therefore write the identical core.
 *  2. Chance comes from the room's seeds (rand.js), keyed by turn.
 *  3. A core is sealed with a hash of its content (`h`). Same content, same
 *     hash — which is also how "nothing changed" is detected.
 *
 * A PLAYER'S ENTRY is their inputs, each stamped with what it is FOR, so a
 * stale one is ignored rather than misapplied:
 *   name, j            who they are, and when they joined
 *   books, start, st   (host) the books in play; "start game g" and when
 *   timed              (host) whether rounds run against a clock
 *   kick, again        (host) players removed in the lobby; "play game g again"
 *   roll, rt           "roll for this turn" (`turnKey`: game and turn), and when
 *   rollFor, rft       "roll for whoever's turn it is" (see `override`), and when
 *   a: { s, v, at }    an answer to slot s = "<game>:<turn>:<stage>", its value, when
 *   end, et            "close round slot s now" (see `override`), and when
 *   next, nt           "I have read this turn's result" (`turnKey`), and when
 *   go, gt             "move on from this turn's result NOW" (see `override`), and when
 *   acc: { n, p }      (host) typed answers accepted by hand, this turn (`turnKey`)
 *   left               walked out
 *
 * THE SHAPE OF A TURN. The player whose turn it is rolls and moves; the square
 * they land on sets a challenge that EVERYONE plays at once on their own phone;
 * the result is shown, and those who earned steps move. One currency: squares.
 * There is no separate score — where you stand on the road is how you are
 * doing, and the first token to the end of the last board ends the game.
 *
 * NO CLOCK UNLESS THE HOST ASKS FOR ONE (`core.timed`, off by default — the
 * club's choice: a reading club plays to read, not to race). Untimed, a round
 * waits until everyone still here has answered, a result stays up until
 * everyone has read it and tapped on, and nobody's die rolls itself — and the
 * host has a button for each of the three, for the friend who has wandered off
 * from their phone. The rounds that ARE a clock keep theirs either way: the
 * Lab's tests of speed, and «من هو؟», whose clues arrive one by one.
 */

export const MAX_PLAYERS = 8
export const NAME_MAX = 16
export const LIE_MAX = 48

/* Every duration, in milliseconds. The stage reads these too, so what is drawn
   and what is decided run on one set of numbers. */
export const T = {
  dice: 2300, // the die is shaken, thrown and read (lib/game/throw.js)
  hop: 300, // a token crosses one square
  repay: 900, // a debt is collected before the move
  card: 2800, // "you landed on…" before a challenge opens
  rollWait: 25000, // then the die rolls itself (a timed game only)
  rollAway: 5000, // …or this soon, if the player has gone (any game)
  grace: 2000, // after a deadline, for answers still in the air
  clue: 7000, // between clues in «من هو؟»
  minReveal: 2500, // a result cannot be skipped faster than this
  dur: { mcq: 26000, tf: 14000, graph: 34000, who: 24000, num: 26000, bluff: 45000, vote: 26000, dare: 45000, judge: 14000, pic: 45000, picBook: 22000, face: 20000 },
  dwell: { luck: 10000, bluff: 22000, default: 16000 }, // a result moves on by itself (timed)
  untimed: 6 * 3600_000, // the furthest an untimed answer's time is believed
  anyone: 60000, // after this long, anyone (not only the host) may move a stuck table on
}

/* The mix of question kinds on a book square, drawn without replacement. */
const KBAG = ['mcq', 'mcq', 'mcq', 'mcq', 'mcq', 'tf', 'tf', 'num', 'num', 'who', 'who', 'graph', 'graph', 'pic', 'pic', 'face', 'face']

/* Rounds that are a race against the clock by nature, timed game or not. */
const CLOCKED = (k, id) => k === 'who' || (k === 'mini' && id !== 'stag' && id !== 'auction')

/*
 * HINTS — EVERY QUESTION HAS ONE TO BUY (the club asked: "i want the hint option
 * for all questions"). A right answer is worth 2 steps, and each hint costs one
 * of them, never below 1 — so a bare right answer is always worth the most:
 *   mcq, graph   50:50 — two wrong options taken away (`fiftyFifty`)
 *   face         the person's role, from their card (`tag`)
 *   tf           a nudge written for the statement (`hint`, tfHints in game.js)
 *   num          a range the number lies in (`numRange`)
 *   who          the next clue, now — worth what waiting for it would be
 *   bluff        (the vote) one lie struck out (`bluffHint`)
 *   pic          its own ladder of hints and options (`picPrize`)
 * A hint is written into the player's entry the moment it is bought (`rv`), so
 * a refresh cannot undo it, and the answer carries it too (`h`).
 */
export function maxHints(ch) {
  switch (ch?.k) {
    case 'mcq': case 'graph': case 'face': case 'tf': case 'num': return 1
    case 'who': return 2
    case 'bluff': return ch.s === 1 ? 1 : 0
    default: return 0
  }
}
const prize = (h) => Math.max(1, 2 - (h || 0))

/* 50:50: the two wrong options a hint takes away (deck indices). */
export const fiftyFifty = (ch) => shuffled([1, 2, 3], seeded(ch.seed, 'fifty')).slice(0, 2)

/* A range the number lies in — never centred on it, rounded to two figures. */
export function numRange(item, ch) {
  const r = seeded(ch.seed, 'range')
  const a = Math.abs(item.a)
  const round = (x, up) => {
    if (x <= 0) return 0
    const step = 10 ** Math.max(0, Math.floor(Math.log10(x)) - 1)
    return (up ? Math.ceil(x / step) : Math.floor(x / step)) * step
  }
  let lo = round(a * (0.45 + 0.3 * r()), false)
  let hi = round(a * (1.3 + 0.5 * r()), true)
  if (hi <= a) hi = round(a + 1, true)
  if (lo >= a) lo = Math.max(0, round(a - 1, false))
  return item.a < 0 ? [-hi, -lo] : [lo, hi]
}

/* The white lie's vote: the one lie a hint strikes out for player `pid` —
   never the truth, never their own. */
export function bluffHint(ch, pid) {
  const lies = (ch.o || []).map((o, i) => i).filter((i) => !ch.o[i].t && !ch.o[i].p?.includes(pid))
  return lies.length ? lies[Math.floor(seeded(ch.seed, 'lie', pid)() * lies.length)] : null
}

/*
 * «خمّن الصورة» — a picture round. Two kinds of question:
 *   name  "who / what is this?" — answered by TYPING, judged by match.js. Help
 *         costs: each hint −1, showing the four options −1 (`op`); a right
 *         answer is worth 3 minus the help, never less than 1.
 *   book  "which of our books is it from?" — three buttons; each hint −1 from 2.
 * The pictures are the site's own (portraits, paintings, scenes from the books).
 */
export const picPrize = (ch, v) => (ch.pk === 'book' ? Math.max(1, 2 - (v.h || 0)) : Math.max(1, 3 - (v.h || 0) - (v.op ? 1 : 0)))
export const picPool = (core, decks) => {
  const books = core.boards || playBooks(core, decks)
  // "Which book is it from?" is no question when only one book is in play.
  return books.flatMap((b) => (decks.byBook[b].pic || []).filter((item) => books.length > 1 || item.kind !== 'book'))
}
export const picRight = (ch, item, v, decks) => (ch.pk === 'book'
  ? v.b === decks.books.indexOf(item.book)
  : v.o != null ? v.o === 0 : matchesName(v.t, [item.name.ar, item.name.en, ...(item.aliases || [])]))

const isNum = (x) => typeof x === 'number' && Number.isFinite(x)
export const clampPos = (p, last) => Math.max(0, Math.min(last, p))

/* ------------------------------ text helpers ------------------------------ */

/* A name or an answer typed by a player is shown on everyone's phone: strip
   control and bidi-override characters, collapse spaces, cut to length (by
   code point, so an emoji is not cut in half). */
export function cleanText(raw, max) {
  const text = String(raw ?? '')
    .replace(/[\u0000-\u001f\u007f​-‏‪-‮⁦-⁩]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return Array.from(text).slice(0, max).join('')
}
export const cleanName = (raw) => cleanText(raw, NAME_MAX)

/* Two answers are "the same" if they match after this: no diacritics, one form
   of alef/ya/ta-marbuta, Western digits, no case, no punctuation or spaces. */
export function norm(raw) {
  return String(raw ?? '')
    .normalize('NFKD')
    .replace(/\p{M}|ـ/gu, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '')
}

/* A number as a phone's keyboard gives it: either digit set, either decimal
   mark, thousands separators or not. */
export function parseNumber(raw) {
  const text = String(raw ?? '')
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٫]/g, '.')
    .replace(/[\s,٬_]/g, '')
  if (!/^-?\d+(\.\d+)?$/.test(text)) return null
  const n = Number(text)
  return Number.isFinite(n) ? n : null
}

/* --------------------------------- sealing -------------------------------- */

function stable(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null'
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`
  return `{${Object.keys(value).filter((k) => value[k] !== undefined).sort().map((k) => `${JSON.stringify(k)}:${stable(value[k])}`).join(',')}}`
}

/* Stamp a core with the next version and the hash of its content. Returns null
   if the content is what `prev` already was — i.e. nothing happened. */
function seal(prev, body) {
  const { v: _v, h: _h, ...rest } = body
  const h = hash32(stable(rest)).toString(36)
  if (prev && h === prev.h) return null
  return { ...rest, v: prev ? prev.v + 1 : 1, h }
}

export function newRoom({ code, id, host, ds }) {
  return seal(null, { id, room: code, g: 1, host, ds, opts: {}, out: [], players: [], phase: 'lobby', cur: {} })
}

/* --------------------------------- reading -------------------------------- */

export const turnPlayer = (core) => core.players[core.turn]
/* What a player's input is FOR. A turn number alone is not enough: turns
   start again at 1 in a rematch, and a "roll for turn 5" — or an answer to
   turn 5's question — left in an entry from the first game must not count in
   the second. So every stamp carries the game too. */
export const turnKey = (core) => core.g * 100000 + core.n
export const slotOf = (core) => `${core.g}:${core.n}:${core.ch?.s ?? 0}`
export const playBooks = (core, decks) => {
  const chosen = (core.opts?.books || []).filter((b) => decks.books.includes(b))
  return chosen.length ? chosen : decks.books
}

/* Whoever may start, restart and move things along: the room's creator while
   they are here, otherwise the first player who is. */
export function actingHost(core, env) {
  const ids = core.players.filter((p) => !p.gone).map((p) => p.id)
  if (!ids.length) return core.host
  if (ids.includes(core.host) && env.present(core.host)) return core.host
  return ids.find((id) => env.present(id)) || core.host
}

/* The order the options are SHOWN in — the same on every phone, so "the second
   one!" means the same thing to everyone on the call. Decks keep the right
   answer at index 0; an answer is reported by that original index. */
export const optionOrder = (ch, count) => shuffled(range(count), seeded(ch.seed, 'order'))

/* «من هو؟»: the person, then three others from the same book. */
export function whoChoices(ch, decks) {
  const all = decks.byBook[ch.book].who
  const others = shuffled(all.filter((w) => w.id !== ch.id), seeded(ch.seed, 'who')).slice(0, 3)
  return [decks.byId[ch.id], ...others]
}

/* «من هذا؟»: the face, then three other people of the same sex — from the same
   book first, then from the others — so no name can be ruled out at a glance. */
export function faceChoices(ch, decks) {
  const me = decks.byId[ch.id]
  const like = (x) => x.id !== me.id && !!x.f === !!me.f
  const own = decks.byBook[ch.book].face.filter(like)
  const rest = decks.books.filter((b) => b !== ch.book).flatMap((b) => decks.byBook[b].face).filter(like)
  const pool = [...shuffled(own, seeded(ch.seed, 'face')), ...shuffled(rest, seeded(ch.seed, 'face', 2))]
  return [me, ...pool.slice(0, 3)]
}

/* Players in order of standing; equal standing shares a rank. */
export function standings(players) {
  const rows = players.map((p, i) => ({ ...p, i })).sort((a, b) => (b.pos - a.pos) || (b.st[0] - a.st[0]) || (a.i - b.i))
  let rank = 0
  return rows.map((row, k) => {
    if (k && (rows[k - 1].pos !== row.pos || rows[k - 1].st[0] !== row.st[0])) rank = k
    return { ...row, rank }
  })
}

/* Who is expected to answer the challenge's current stage. */
export function expected(core) {
  const alive = core.players.filter((p) => !p.gone).map((p) => p.id)
  if (core.ch?.k !== 'dare') return alive
  const active = turnPlayer(core).id
  return core.ch.s === 0 ? [active] : alive.filter((id) => id !== active)
}

/* One player's answer to the current stage, checked — a phone can send
   anything. Returns { v, at } or null. */
export function readAnswer(core, raw, pid, rv) {
  const ch = core.ch
  if (!ch || !raw || raw.s !== slotOf(core)) return null
  const int = (lo, hi) => (Number.isInteger(raw.v) && raw.v >= lo && raw.v <= hi ? raw.v : null)
  let v = null
  switch (ch.k) {
    case 'mcq': case 'graph': case 'who': case 'face': v = int(0, 3); break
    case 'tf': v = int(0, 1); break
    case 'num': v = isNum(raw.v) && Math.abs(raw.v) < 1e12 ? raw.v : null; break
    case 'bluff':
      if (ch.s === 0) v = cleanText(raw.v, LIE_MAX) || null
      else {
        v = int(0, ch.o.length - 1)
        if (v != null && ch.o[v].p?.includes(pid)) v = null // nobody votes for their own lie
      }
      break
    case 'dare': v = ch.s === 0 ? (raw.v === 1 ? 1 : null) : int(0, 1); break
    case 'pic': {
      const a = raw.v
      if (!a || typeof a !== 'object') break
      /* Help is recorded in the player's entry the moment it is asked for
         (`rv`), so a refresh cannot wipe it; the answer's own count can only
         add to that. */
      const seen = rv && rv.s === raw.s ? rv : {}
      const h = Math.max(0, Math.min(ch.nh || 0, Math.max(Number.isInteger(a.h) ? a.h : 0, Number.isInteger(seen.h) ? seen.h : 0)))
      if (ch.pk === 'book') {
        if (Number.isInteger(a.b) && a.b >= 0 && a.b <= 9) v = { b: a.b, h }
        break
      }
      const op = a.op || seen.op ? 1 : 0
      const t = typeof a.t === 'string' ? cleanText(a.t, LIE_MAX) : ''
      if (t) v = { t, h, op }
      else if (op && Number.isInteger(a.o) && a.o >= 0 && a.o <= 3) v = { o: a.o, h, op }
      break
    }
    case 'mini':
      if (ch.id === 'stag') v = int(0, 1)
      else if (ch.id === 'auction') v = int(0, AUCTION.max)
      else v = typeof raw.v === 'number' || typeof raw.v === 'string' ? raw.v : null
      break
    default:
  }
  if (v == null) return null
  // An untimed round (`t1` null) has no deadline to hold an answer's time to.
  const hi = ch.t1 == null ? ch.t0 + T.untimed : ch.t1 + T.grace
  const at = isNum(raw.at) ? Math.max(ch.t0, Math.min(raw.at, hi)) : ch.t1 ?? ch.t0
  // Hints bought: what the answer says, or what the entry recorded when they
  // were bought — whichever is more. (A picture round keeps its own, in `v`.)
  const most = maxHints(ch)
  if (most) {
    const seen = rv && rv.s === raw.s ? rv : {}
    const h = Math.max(0, Math.min(most, Math.max(Number.isInteger(raw.h) ? raw.h : 0, Number.isInteger(seen.h) ? seen.h : 0)))
    if (h) return { v, at, h }
  }
  return { v, at }
}

/* Everyone's answers to the current stage: { pid: { v, at } }. */
export function answersNow(core, entries) {
  const want = expected(core)
  const out = {}
  for (const pid of want) {
    const a = readAnswer(core, entries[pid]?.d?.a, pid, entries[pid]?.d?.rv)
    if (a) out[pid] = a
  }
  return out
}

/* --------------------------------- roster --------------------------------- */

function addJoiners(players, entries, out) {
  const here = new Set(players.map((p) => p.id))
  const joiners = Object.entries(entries)
    .filter(([pid, e]) => !here.has(pid) && !out.includes(pid) && e?.d && !e.d.left && cleanName(e.d.name))
    .sort((a, b) => ((a[1].d.j || 0) - (b[1].d.j || 0)) || (a[0] < b[0] ? -1 : 1))
  let next = players
  for (const [pid, e] of joiners) {
    if (next.length >= MAX_PLAYERS) break
    const used = new Set(next.map((p) => p.c))
    next = [...next, { id: pid, name: cleanName(e.d.name), c: range(MAX_PLAYERS).find((i) => !used.has(i)), pos: 0, st: [0, 0, 0, 0] }]
  }
  return next
}

/* Between games the list is free to change: joins, new names, the host's
   removals, and anyone who left is simply gone from it. */
function lobbyRoster(core, entries, env) {
  const host = actingHost(core, env)
  const kick = entries[host]?.d?.kick
  let out = core.out
  if (Array.isArray(kick)) {
    const add = kick.filter((pid) => typeof pid === 'string' && pid !== host && !out.includes(pid))
    if (add.length) out = [...out, ...add].slice(-32)
  }
  let players = core.players.filter((p) => !out.includes(p.id) && !entries[p.id]?.d?.left)
  players = players.map((p) => {
    const name = cleanName(entries[p.id]?.d?.name)
    return name && name !== p.name ? { ...p, name } : p
  })
  return { players: addJoiners(players, entries, out), out }
}

/* During a game the list only grows (so `turn`, an index, stays true): a
   latecomer is added at the start square, and someone who walks out is marked
   `gone` — skipped, not removed. */
function gameRoster(core, entries) {
  const players = core.players.map((p) => {
    const d = entries[p.id]?.d
    if (!d) return p
    if (d.left && !p.gone) return { ...p, gone: true }
    if (!d.left && p.gone) { const { gone: _gone, ...back } = p; return back }
    return p
  })
  return addJoiners(players, entries, core.out)
}

function nextAlive(players, from) {
  for (let step = 1; step <= players.length; step++) {
    const i = (from + step) % players.length
    if (!players[i].gone) return i
  }
  return from
}

/* A table waiting on someone who is here but not playing — their phone on, its
   owner elsewhere — is moved on by an OVERRIDE in a player's entry: roll for
   them (`rollFor`), close the round (`end`), leave the result (`go`). The host
   may do it at once; anyone else once the table has waited `T.anyone` since
   `since` — for when the one holding things up is the host. Returns the
   earliest valid time, or null. Every time in it comes from an entry. */
function override(core, entries, env, key, timeKey, value, since) {
  const host = actingHost(core, env)
  let at = null
  for (const p of core.players) {
    const d = entries[p.id]?.d
    if (p.gone || !d || d[key] !== value || !isNum(d[timeKey])) continue
    if (p.id !== host && d[timeKey] < since + T.anyone) continue
    const t = Math.max(since, Math.min(d[timeKey], since + T.untimed))
    at = at == null ? t : Math.min(at, t)
  }
  return at
}

/* --------------------------------- phases --------------------------------- */

function lobbyStep(core, entries, env) {
  const { players, out } = lobbyRoster(core, entries, env)
  let next = { ...core, players, out }
  const host = actingHost(next, env)
  const d = entries[host]?.d || {}
  if (Array.isArray(d.books)) {
    const books = env.decks.books.filter((b) => d.books.includes(b))
    if (books.length) next.opts = { ...next.opts, books }
  }
  if (typeof d.timed === 'boolean' && d.timed !== !!next.opts.timed) next.opts = { ...next.opts, timed: d.timed }
  if (d.start === core.g && isNum(d.st) && players.length >= 1) {
    const seed = hash32(`${core.id}|${core.g}|${d.st}`)
    // One board per book in play, in the registry's order: the road's length.
    const boards = playBooks(next, env.decks)
    next = {
      ...next,
      players: players.map((p) => ({ id: p.id, name: p.name, c: p.c, pos: 0, st: [0, 0, 0, 0] })),
      phase: 'roll', seed, n: 1, turn: seed % players.length, t: d.st,
      boards, last: lastOf(boards.length), timed: !!next.opts.timed,
      die: 0, from: 0, repay: 0, ch: null, res: null, skip: [], debt: {},
    }
  }
  return seal(core, next)
}

function rollStep(core, entries, env) {
  const players = gameRoster(core, entries)
  const base = { ...core, players }
  if (players.every((p) => p.gone)) return seal(core, base)
  // The player whose turn it is has walked out: pass the die on.
  if (players[core.turn].gone) return seal(core, { ...base, turn: nextAlive(players, core.turn) })
  const changed = seal(core, base)
  if (changed) return changed

  const active = players[core.turn]
  const d = entries[active.id]?.d
  let at = null
  if (d && d.roll === turnKey(core) && isNum(d.rt)) at = Math.max(core.t, Math.min(d.rt, core.t + (core.timed ? T.rollWait : T.untimed)))
  else {
    // Rolled for a friend who is here but not rolling: an untimed game would
    // otherwise wait for them for ever.
    at = override(base, entries, env, 'rollFor', 'rft', turnKey(core), core.t)
    const wait = !env.present(active.id) ? T.rollAway : core.timed ? T.rollWait : null
    if (at == null && wait != null && env.now >= core.t + wait) at = core.t + wait
  }
  return at == null ? null : seal(core, roll(base, at, env.decks))
}

function roll(core, at, decks) {
  const i = core.turn
  const me = core.players[i]
  const die = 1 + Math.floor(seeded(core.seed, core.n, 'die')() * 6)
  // A loan taken on a chance card is repaid — with its interest — before moving.
  const debt = { ...core.debt }
  const repay = debt[me.id] || 0
  delete debt[me.id]
  const from = clampPos(me.pos - repay, core.last)
  const to = Math.min(core.last, from + die)
  const players = core.players.map((p, k) => (k === i ? { ...p, pos: to } : p))
  const landed = at + T.dice + (repay ? T.repay : 0) + (to - from) * T.hop
  // `was` is where the token stood before the roll: the board walks it from
  // there, and back to `from` first if a debt was collected.
  const next = { ...core, players, die, from, was: me.pos, repay, debt, rolledAt: at, ch: null, res: null }
  // Landing on the last square by the die ends the game there and then.
  if (to >= core.last) return { ...next, phase: 'over', t: landed + 500 }
  return challenge(next, to, landed, decks)
}

/* What the square asks of everyone. */
function challenge(core, to, landed, decks) {
  const cur = { ...core.cur }
  /* Draw from a deck without repeats: each deck is dealt in a seeded order and
     a cursor remembers how far through it the ROOM is — across rematches too,
     so a second game the same evening does not replay the first one's cards. */
  const draw = (key, length) => {
    const k = cur[key] || 0
    cur[key] = k + 1
    return shuffled(range(length), seeded(core.ds, key, Math.floor(k / length)))[k % length]
  }
  const alive = core.players.filter((p) => !p.gone).length
  const books = core.boards
  // Every board is a book's own, and its squares ask that book.
  const zone = boardOf(to)
  const book = books[Math.min(zone, books.length - 1)]
  const D = decks.byBook[book]
  const luck = decks.luck.filter((c) => !c.book || books.includes(c.book))
  const dares = decks.dares.filter((c) => !c.book || books.includes(c.book))

  let type = typeAt(to, books.length)
  if (type === 'B' && (alive < 3 || !D.bluff.length)) type = 'K' // a lie needs someone to fool
  if (type === 'D' && (alive < 2 || !dares.length)) type = 'K' // a dare needs a jury
  if (type === 'C' && !luck.length) type = 'K'

  if (type === 'C') return chance({ ...core, cur }, luck[draw(`luck:${luck.length}`, luck.length)], landed)

  const t0 = landed + T.card
  // A deadline only where the game is timed, or the round is a race by nature.
  const until = (k, id, dur) => (core.timed || CLOCKED(k, id) ? t0 + dur : null)
  let ch
  if (type === 'L') {
    /* The Lab's games were made for the three zones of the first board, one
       per book; a book's own board plays its book's. */
    const lab = decks.books.indexOf(book)
    let pool = MINIS.filter((m) => m.zone === lab && alive >= m.min)
    if (!pool.length) pool = MINIS.filter((m) => alive >= m.min)
    const mini = pool[draw(`mini:${lab}:${pool.length}`, pool.length)]
    ch = { k: 'mini', id: mini.id, t1: until('mini', mini.id, mini.dur) }
  } else if (type === 'B') {
    ch = { k: 'bluff', id: D.bluff[draw(`bluff:${book}`, D.bluff.length)].id, book, t1: until('bluff', null, T.dur.bluff) }
  } else if (type === 'D') {
    ch = { k: 'dare', id: dares[draw(`dare:${dares.length}`, dares.length)].id, t1: until('dare', null, T.dur.dare) }
  } else {
    let k = KBAG[draw('k', KBAG.length)]
    const pics = k === 'pic' ? picPool(core, decks) : null
    if (k === 'pic' && pics.length) {
      /* A picture can come from ANY book in play, not just this board's — and
         the card does not name a book, which would answer "which book?". */
      const item = pics[draw(`pic:${pics.length}`, pics.length)]
      ch = { k, id: item.id, pk: item.kind, nh: (item.hints || []).length, t1: until('pic', null, item.kind === 'book' ? T.dur.picBook : T.dur.pic) }
    } else {
      if (k === 'pic' || !D[k]?.length || ((k === 'who' || k === 'face') && D[k].length < 4)) k = 'mcq'
      ch = { k, id: D[k][draw(`${k}:${book}`, D[k].length)].id, book, t1: until(k, null, T.dur[k]) }
    }
  }
  return { ...core, cur, phase: 'play', t: t0, ch: { ...ch, s: 0, t0, seed: hash32(`${core.seed}|${core.n}|ch`) } }
}

/* A chance card: no question, it simply happens. It can take the lead away but
   never carries anyone over the line — the game is not won on a card. */
function chance(core, card, landed) {
  const P = core.players
  const i = core.turn
  const pre = P.map((p) => p.pos)
  const pos = pre.slice()
  const cap = (p) => Math.max(0, Math.min(core.last - 1, p))
  const alive = range(P.length).filter((k) => !P[k].gone)
  const others = alive.filter((k) => k !== i)
  const e = card.effect
  let { skip, debt } = core
  let again = false
  switch (e.kind) {
    case 'move': pos[i] = cap(pos[i] + e.n); break
    case 'others': for (const k of others) pos[k] = cap(pos[k] + e.n); break
    case 'all': for (const k of alive) pos[k] = cap(pos[k] + e.n); break
    case 'again': again = true; break
    case 'skip': skip = [...skip.filter((id) => id !== P[i].id), P[i].id]; break
    case 'steal': {
      // From whoever is furthest ahead of the others.
      const lead = others.reduce((best, k) => (best == null || pos[k] > pos[best] ? k : best), null)
      const take = lead == null ? 0 : Math.min(e.n, pos[lead])
      if (lead != null) pos[lead] -= take
      pos[i] = cap(pos[i] + Math.max(1, take))
      break
    }
    case 'swap': {
      // Places with the nearest player ahead; with nobody ahead, a step forward.
      const ahead = others.filter((k) => pos[k] > pos[i]).reduce((best, k) => (best == null || pos[k] < pos[best] ? k : best), null)
      if (ahead == null) pos[i] = cap(pos[i] + 1)
      else [pos[i], pos[ahead]] = [pos[ahead], pos[i]]
      break
    }
    case 'loan': pos[i] = cap(pos[i] + e.now); debt = { ...debt, [P[i].id]: e.later }; break
    default:
  }
  const aw = {}
  P.forEach((p, k) => { if (pos[k] !== pre[k]) aw[p.id] = pos[k] - pre[k] })
  return {
    ...core,
    players: P.map((p, k) => (pos[k] === p.pos ? p : { ...p, pos: pos[k] })),
    skip, debt, phase: 'reveal', t: landed,
    ch: { k: 'luck', id: card.id, s: 0, t0: landed, t1: landed, seed: 0 },
    res: { k: 'luck', pre, aw, a: {}, x: again ? { again: true } : {} },
  }
}

function playStep(core, entries, env) {
  const ch = core.ch
  const want = expected(core)
  const answers = answersNow(core, entries)
  const waitingOn = want.filter((pid) => !answers[pid] && env.present(pid))
  const allIn = waitingOn.length === 0 && Object.keys(answers).length > 0
  // If nobody who could answer is even here, there is no point waiting on them.
  const someone = want.some((pid) => env.present(pid))
  const deadline = ch.t1 == null
    ? (someone ? null : ch.t0 + 4000)
    : someone ? ch.t1 + T.grace : Math.min(ch.t1 + T.grace, ch.t0 + 4000)
  // A round still waiting on someone can be closed (see `override`).
  const ended = override(core, entries, env, 'end', 'et', slotOf(core), ch.t0)
  let at = null
  if (allIn && env.now >= ch.t0) at = Math.max(ch.t0, ...Object.values(answers).map((a) => a.at))
  else if (ended != null && env.now >= ended) at = deadline == null ? ended : Math.min(ended, deadline)
  else if (deadline != null && env.now >= deadline) at = deadline
  if (at == null) return null

  if (ch.k === 'bluff' && ch.s === 0) return seal(core, bluffVote(core, answers, at, env.decks))
  if (ch.k === 'dare' && ch.s === 0) {
    const t0 = at + 300
    return seal(core, { ...core, t: t0, ch: { ...ch, s: 1, t0, t1: ch.t1 == null ? null : t0 + T.dur.judge } })
  }
  return seal(core, reveal(core, answers, at, env.decks))
}

/* Bluff, second half: the lies are collected and everyone votes. Identical lies
   are merged (both authors are credited); a "lie" that is the truth is dropped;
   and with few players the house adds decoys so there is something to doubt. */
function bluffVote(core, answers, at, decks) {
  const ch = core.ch
  const item = decks.byId[ch.id]
  const truths = [item.truth.ar, item.truth.en, ...(item.alt || [])].map(norm)
  const lies = []
  for (const p of core.players) {
    const a = answers[p.id]
    if (!a) continue
    const key = norm(a.v)
    if (!key || truths.includes(key)) continue
    const same = lies.find((l) => norm(l.x) === key)
    if (same) same.p.push(p.id)
    else lies.push({ x: a.v, p: [p.id] })
  }
  if (!lies.length) return reveal(core, {}, at, decks)
  const o = [{ t: 1 }, ...lies]
  for (const d of shuffled(range((item.decoys || []).length), seeded(ch.seed, 'decoys'))) {
    if (o.length >= 4) break
    o.push({ d })
  }
  const t0 = at + 1200
  return { ...core, t: t0, ch: { ...ch, s: 1, o: shuffled(o, seeded(ch.seed, 'bluff')), t0, t1: ch.t1 == null ? null : t0 + T.dur.vote } }
}

/* Mark the challenge, hand out the steps, and move to the result. */
function reveal(core, answers, at, decks) {
  const ch = core.ch
  const P = core.players
  const active = turnPlayer(core).id
  const alive = P.filter((p) => !p.gone)
  const item = decks.byId[ch.id]
  const aw = {}
  const st = {}
  const x = {}
  const give = (pid, n) => { if (n) aw[pid] = (aw[pid] || 0) + n }
  // The four tallies behind the end-of-game titles: right answers, fastest
  // answers, players fooled, lab wins.
  const tally = (pid, k, n = 1) => { (st[pid] ||= [0, 0, 0, 0])[k] += n }

  switch (ch.k) {
    case 'mcq': case 'graph': case 'tf': case 'face': {
      const right = ch.k === 'tf' ? (item.isMyth ? 0 : 1) : 0
      const ok = alive.filter((p) => answers[p.id]?.v === right)
      for (const p of ok) { give(p.id, prize(answers[p.id].h)); tally(p.id, 0) }
      // Speed counts where there is something to weigh — not on a coin toss.
      if (ch.k !== 'tf' && alive.length >= 3 && ok.length) {
        const first = ok.reduce((a, b) => (answers[b.id].at < answers[a.id].at ? b : a))
        give(first.id, 1)
        tally(first.id, 1)
        x.fast = first.id
      }
      if (aw[active]) give(active, 1) // it is their square
      break
    }
    case 'who': {
      for (const p of alive) {
        const a = answers[p.id]
        if (!a || a.v !== 0) continue
        // Worth more the fewer clues you needed — waited for, or bought early.
        give(p.id, 3 - Math.min(2, Math.max(Math.floor((a.at - ch.t0) / T.clue), a.h || 0)))
        tally(p.id, 0)
      }
      if (aw[active]) give(active, 1)
      break
    }
    case 'pic': {
      x.c = {}
      for (const p of alive) {
        const a = answers[p.id]
        if (!a) continue
        const right = picRight(ch, item, a.v, decks)
        x.c[p.id] = right ? 1 : 0
        if (right) { give(p.id, picPrize(ch, a.v)); tally(p.id, 0) }
      }
      if (aw[active]) give(active, 1)
      break
    }
    case 'num': {
      const rows = alive.filter((p) => answers[p.id]).map((p) => ({ id: p.id, off: Math.abs(answers[p.id].v - item.a), h: answers[p.id].h || 0 })).sort((a, b) => a.off - b.off)
      if (rows.length) {
        const best = rows[0].off
        const second = rows.find((r) => r.off > best)?.off
        for (const r of rows) {
          // The closest moves 2 (an exact hit 3), the runner-up 1 — a hint less.
          if (r.off === best) { give(r.id, Math.max(1, (best === 0 ? 3 : 2) - r.h)); tally(r.id, 0) } else if (alive.length >= 4 && r.off === second) give(r.id, 1 - r.h)
        }
        if (aw[active]) give(active, 1)
      }
      break
    }
    case 'bluff': {
      if (ch.s !== 1) { x.none = true; break } // nobody wrote anything
      for (const p of alive) {
        const a = answers[p.id]
        if (!a) continue
        const picked = ch.o[a.v]
        if (picked.t) { give(p.id, prize(a.h)); tally(p.id, 0) } else if (picked.p) for (const author of picked.p) { give(author, 1); tally(author, 2) }
      }
      break
    }
    case 'dare': {
      const votes = alive.filter((p) => p.id !== active && answers[p.id])
      x.yes = votes.filter((p) => answers[p.id].v === 1).length
      x.no = votes.length - x.yes
      x.pass = x.yes >= x.no // the benefit of the doubt
      if (x.pass) give(active, 2)
      break
    }
    case 'mini': {
      const took = alive.filter((p) => answers[p.id])
      if (ch.id === 'stag') {
        // The stag is caught only if EVERY hunter who answered went for it.
        x.together = took.length >= 2 && took.every((p) => answers[p.id].v === 1)
        for (const p of took) {
          if (x.together) give(p.id, STAG.together)
          else if (answers[p.id].v === 0) give(p.id, STAG.hare)
        }
      } else if (ch.id === 'auction') {
        // The highest bid that nobody else made wins, and pays what it bid.
        const bids = took.filter((p) => answers[p.id].v > 0)
        const alone = bids.filter((p) => bids.filter((q) => answers[q.id].v === answers[p.id].v).length === 1)
        const winner = alone.reduce((best, p) => (!best || answers[p.id].v > answers[best.id].v ? p : best), null)
        if (winner) { x.winner = winner.id; give(winner.id, AUCTION.prize - answers[winner.id].v); tally(winner.id, 3) }
      } else {
        const rows = took.map((p) => ({ id: p.id, m: miniScore(ch.id, answers[p.id].v, ch.seed) })).filter((r) => r.m).sort((a, b) => b.m.score - a.m.score)
        const prizes = rankAwards(alive.length)
        let place = 0
        rows.forEach((r, k) => {
          if (k && rows[k - 1].m.score !== r.m.score) place = k
          r.place = place
          give(r.id, prizes[place] || 0)
          if (place === 0) tally(r.id, 3)
        })
        x.rows = rows.map((r) => ({ id: r.id, show: r.m.show, place: r.place }))
      }
      break
    }
    default:
  }

  // Each answer as [value, ms after the round opened] — and the hints bought, if any.
  const a = {}
  for (const p of P) if (answers[p.id]) a[p.id] = [answers[p.id].v, Math.round(answers[p.id].at - ch.t0), ...(answers[p.id].h ? [answers[p.id].h] : [])]
  return {
    ...core,
    players: P.map((p) => {
      const steps = aw[p.id] || 0
      const add = st[p.id]
      if (!steps && !add) return p
      return { ...p, pos: clampPos(p.pos + steps, core.last), st: add ? p.st.map((n, k) => n + add[k]) : p.st }
    }),
    phase: 'reveal', t: at,
    res: { k: ch.k, pre: P.map((p) => p.pos), aw, a, x },
  }
}

/* Whose turn comes after this one. */
export function upNext(core) {
  const P = core.players
  let skip = core.skip || []
  if (core.res?.x?.again && !P[core.turn].gone) return { turn: core.turn, skip }
  let turn = core.turn
  for (let guard = 0; guard < P.length * 2; guard++) {
    turn = (turn + 1) % P.length
    const p = P[turn]
    if (p.gone) continue
    if (skip.includes(p.id)) { skip = skip.filter((id) => id !== p.id); continue } // a missed turn, served
    return { turn, skip }
  }
  return { turn: core.turn, skip }
}

/* Who may tap "next" on a result: the player about to roll, and the host. */
export function mayMoveOn(core, env) {
  return [core.players[upNext(core).turn].id, actingHost(core, env)]
}

/* The host overrules the checker: a typed answer it marked wrong ("Steinbek's
   novel", a nickname nobody listed) is accepted by hand from the result
   screen, and earns what it would have earned. Read from the acting host's
   entry (`acc: { n, p: [player ids] }`) — an input like any other, so every
   phone applies the same acceptance. */
function acceptStep(core, entries, env) {
  if (core.res?.k !== 'pic' || core.ch.pk === 'book') return null
  const acc = entries[actingHost(core, env)]?.d?.acc
  if (!acc || acc.n !== turnKey(core) || !Array.isArray(acc.p)) return null
  const done = core.res.x.ok || []
  const add = acc.p.filter((pid) => typeof pid === 'string' && !done.includes(pid) && core.res.x.c?.[pid] === 0 && core.res.a[pid]?.[0]?.t)
  if (!add.length) return null
  const aw = { ...core.res.aw }
  const c = { ...core.res.x.c }
  const active = turnPlayer(core).id
  const steps = {}
  for (const pid of add) {
    let n = picPrize(core.ch, core.res.a[pid][0])
    if (pid === active && !aw[active]) n += 1 // it is their square
    steps[pid] = n
    aw[pid] = (aw[pid] || 0) + n
    c[pid] = 2
  }
  const players = core.players.map((p) => (steps[p.id] ? { ...p, pos: clampPos(p.pos + steps[p.id], core.last), st: p.st.map((v, k) => (k === 0 ? v + 1 : v)) } : p))
  return seal(core, { ...core, players, res: { ...core.res, aw, x: { ...core.res.x, c, ok: [...done, ...add] } } })
}

/* Untimed, a result waits for everyone: who still in the game has read it and
   tapped on (`next` for this turn). */
export const readyNow = (core, entries) => core.players
  .filter((p) => !p.gone && entries[p.id]?.d?.next === turnKey(core) && isNum(entries[p.id].d.nt))
  .map((p) => p.id)

function revealStep(core, entries, env) {
  const accepted = acceptStep(core, entries, env)
  if (accepted) return accepted
  const up = upNext(core)
  const floor = core.t + T.minReveal
  // Someone moves the table on (see `override`)…
  let at = override(core, entries, env, 'go', 'gt', turnKey(core), core.t)
  if (at != null) at = Math.max(floor, at)
  else if (core.timed) {
    // Timed: the player about to roll, or the host, taps on — or it moves on by itself.
    const dwell = T.dwell[core.res.k] || T.dwell.default
    for (const pid of mayMoveOn(core, env)) {
      const d = entries[pid]?.d
      if (!d || d.next !== turnKey(core) || !isNum(d.nt)) continue
      const t = Math.max(floor, Math.min(d.nt, core.t + dwell))
      at = at == null ? t : Math.min(at, t)
    }
    if (at == null && env.now >= core.t + dwell) at = core.t + dwell
  } else {
    // Untimed: when everyone who is here has tapped on. (Whether someone is
    // here only gates it; the time comes from the taps themselves.)
    const ready = readyNow(core, entries)
    const waiting = core.players.filter((p) => !p.gone && !ready.includes(p.id) && env.present(p.id))
    if (ready.length && !waiting.length) at = Math.max(floor, ...ready.map((pid) => Math.min(entries[pid].d.nt, core.t + T.untimed)))
    // Nobody left at the table: it does not wait for an empty room.
    else if (!core.players.some((p) => !p.gone && env.present(p.id)) && env.now >= core.t + T.dwell.default) at = core.t + T.dwell.default
  }
  if (at == null) return null
  if (core.players.some((p) => p.pos >= core.last)) return seal(core, { ...core, phase: 'over', t: at })
  return seal(core, { ...core, phase: 'roll', turn: up.turn, skip: up.skip, n: core.n + 1, t: at, ch: null, res: null, die: 0, repay: 0 })
}

function overStep(core, entries, env) {
  const d = entries[actingHost(core, env)]?.d
  if (!d || d.again !== core.g) return null
  // Back to the lobby with the same people: the host can change the books, and
  // anyone who arrived late is let in. The decks' cursors carry over.
  return seal(core, {
    id: core.id, room: core.room, g: core.g + 1, host: core.host, ds: core.ds, opts: core.opts, out: core.out, cur: core.cur,
    phase: 'lobby',
    players: core.players.filter((p) => !p.gone).map((p) => ({ id: p.id, name: p.name, c: p.c, pos: 0, st: [0, 0, 0, 0] })),
  })
}

export function advance(core, entries, env) {
  switch (core.phase) {
    case 'lobby': return lobbyStep(core, entries, env)
    case 'roll': return rollStep(core, entries, env)
    case 'play': return playStep(core, entries, env)
    case 'reveal': return revealStep(core, entries, env)
    case 'over': return overStep(core, entries, env)
    default: return null
  }
}
