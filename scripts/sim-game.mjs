#!/usr/bin/env node
/*
 * «رُقعة النرد» — play the game, a few hundred times, without a browser.
 *
 *   node scripts/sim-game.mjs                 200 games on the real decks
 *   node scripts/sim-game.mjs --games 1000    more
 *   node scripts/sim-game.mjs --seed 7        a different (repeatable) run
 *   node scripts/sim-game.mjs --synthetic     made-up decks (engine only)
 *   node scripts/sim-game.mjs --calm          a perfect network (for timings)
 *
 * The project has no test runner; this is the check for the one part of the
 * site that cannot be verified by looking at it: several phones, a mailbox that
 * forgets, and rules that every phone runs for itself. It wires the REAL pieces
 * together — the mailbox (api/_mailbox.js), the room client (lib/game/net.js)
 * and the rules (lib/game/engine.js) — over a pretend network, in pretend time:
 *
 *   • each game has 1–8 bots, each with its own WRONG clock — most within a
 *     minute, a fifth of them far out (5½–15½ minutes, either way: found live
 *     on 2026-11-17, a laptop 7 minutes fast whose every input the mailbox
 *     refused for two minutes — its counters were stamped before the clock
 *     was known, and the mailbox refuses counters from the far future);
 *   • requests are delayed 20–600 ms each way (with spikes), and some are lost;
 *   • there are 1–3 mailbox instances, a request lands on any of them, and
 *     every so often one forgets everything (a serverless instance recycled);
 *   • bots reload their tab mid-game, walk out, arrive late, or go quiet;
 *   • the player whose turn it is, or the host, now and then skips a question
 *     for a new one — with the others' answers to the old one in flight;
 *   • half the games are untimed (the default), where nothing moves until the
 *     players do — and the host bot does what a host would: closes a round a
 *     quiet friend is holding up, rolls for them, moves the table on.
 *
 * and then insists that every game ENDS, that every phone ends up holding the
 * SAME core, and that no rule ever threw or put a token off the board.
 *
 * It also lints the decks (lib/game/decks.js → lintDecks), so a question with
 * three options or a bluff with no blank fails here and not on a call.
 */
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { makeMailbox, newer as serverNewer, FUTURE as serverFuture } from '../api/_mailbox.js'
import { Room, newer as clientNewer, makeRoomCode, makeId, ROOM_RE, PID_RE, FUTURE as clientFuture } from '../src/lib/game/net.js'
import { advance, newRoom, expected, slotOf, turnPlayer, mayMoveOn, actingHost, turnKey, resultKey, maxHints, maySkip, asking, askKey, MAX_PLAYERS } from '../src/lib/game/engine.js'
import { assembleDecks, lintDecks } from '../src/lib/game/decks.js'
import { SQUARES, TYPES, lastOf, typeAt } from '../src/lib/game/board.js'
import { rng } from '../src/lib/game/rand.js'
import { sheepPlan, memoryDigits, AUCTION } from '../src/lib/game/minis.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const flag = (name) => args.includes(`--${name}`)
const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? Number(args[i + 1]) : fallback }
const GAMES = opt('games', 200)
const SEED = opt('seed', 1)
const CALM = flag('calm')
const VERBOSE = flag('verbose')

/* ------------------------------- the decks ------------------------------- */
const L = (ar, en) => ({ ar, en })

function syntheticDecks() {
  const order = ['book-a', 'book-b', 'book-c']
  const games = {}
  const myths = {}
  for (const id of order) {
    const n = (kind, count, make) => Array.from({ length: count }, (_, i) => ({ id: `${id}-${kind}-${i}`, ...make(i) }))
    const text = (s) => L(`${s} ع`, s)
    games[id] = {
      gameIcon: '📖',
      gameDeck: {
        mcq: n('mcq', 6, (i) => ({ q: text(`q${i}`), opts: [0, 1, 2, 3].map((o) => text(`o${o}`)), why: text('why') })),
        num: n('num', 3, (i) => ({ q: text(`n${i}`), a: 10 + i * 37, why: text('why') })),
        who: n('who', 5, (i) => ({ name: text(`person ${i}`), clues: [1, 2, 3].map((c) => text(`clue ${c}`)), why: text('why') })),
        graph: n('graph', 2, (i) => ({ q: text(`g${i}`), chart: { type: 'line' }, opts: [0, 1, 2, 3].map((o) => text(`o${o}`)), why: text('why') })),
        bluff: n('bluff', 3, (i) => ({ q: text(`b${i} ____`), truth: text('the truth'), decoys: [text('d1'), text('d2'), text('d3')], why: text('why') })),
        face: n('face', 8, (i) => ({ img: `./images/${id}-${i}.webp`, name: text(`face ${i}`), tag: text('tag'), about: text('about'), ...(i % 2 ? { f: 1 } : {}) })),
      },
    }
    myths[id] = { mythOrFact: Array.from({ length: 4 }, (_, i) => ({ statement: text(`s${i}`), isMyth: i % 2 === 0, explain: text('x') })) }
    games[id].gameDeck.tfHints = Object.fromEntries(myths[id].mythOrFact.map((m) => [m.statement.en, text('hint')]))
  }
  const luck = [
    { kind: 'move', n: 3 }, { kind: 'move', n: -3 }, { kind: 'others', n: -2 }, { kind: 'all', n: 1 }, { kind: 'again' },
    { kind: 'skip' }, { kind: 'steal', n: 2 }, { kind: 'swap' }, { kind: 'loan', now: 3, later: 4 },
  ].map((effect, i) => ({ id: `luck-${i}`, book: i % 4 === 0 ? null : order[i % 3], text: L('نص', 'text'), effect }))
  const dares = [0, 1, 2].map((i) => ({ id: `dare-${i}`, book: null, text: L('تحدّ', 'dare') }))
  return assembleDecks({ order, games, myths, luck, dares })
}

async function realDecks() {
  const data = path.resolve(here, '../src/data')
  const load = async (file) => (fs.existsSync(file) ? import(pathToFileURL(file).href) : null)
  const { books } = await import(pathToFileURL(path.join(data, 'allBooks.js')).href)
  const games = {}
  const myths = {}
  for (const book of books) {
    games[book.id] = await load(path.join(data, 'books', book.id, 'game.js'))
    myths[book.id] = await load(path.join(data, 'books', book.id, 'mythOrFact.js'))
  }
  const cards = await import(pathToFileURL(path.join(data, 'game', 'cards.js')).href)
  const { members } = await import(pathToFileURL(path.join(data, 'game', 'members.js')).href)
  const { questionPhotos } = await import(pathToFileURL(path.join(data, 'game', 'questionPhotos.js')).href)
  return assembleDecks({ order: books.map((b) => b.id), games, myths, luck: cards.luckCards, dares: cards.dares, members, photos: questionPhotos })
}

const decks = flag('synthetic') ? syntheticDecks() : await realDecks()
const lint = lintDecks(decks)
if (lint.length) {
  console.error(`✗ the decks have ${lint.length} problem(s):`)
  for (const line of lint) console.error(`   ${line}`)
  process.exit(1)
}
// Everything a game can ask, by the numbers the engine keeps it under (`asking`).
const ASK = asking(decks)
const ASK_NAMES = []
for (const [key, i] of ASK.at) ASK_NAMES[i] = key
const count = (kind) => decks.books.reduce((n, b) => n + decks.byBook[b][kind].length, 0)
console.log(`decks: ${decks.books.length} books · ${count('mcq')} questions · ${count('tf')} myth/fact · ${count('num')} numbers · ${count('who')} people · ${count('graph')} graphs · ${count('bluff')} bluffs · ${count('pic')} pictures · ${decks.luck.length} chance · ${decks.dares.length} dares`)

/* ------------------------- small checks, up front ------------------------- */
const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1) }
{
  // The mailbox and the client must order cores identically.
  const r = rng(99)
  const mk = () => ({ g: 1 + Math.floor(r() * 3), v: 1 + Math.floor(r() * 5), h: Math.floor(r() * 4).toString(36) })
  for (let i = 0; i < 2000; i++) {
    const [a, b] = [mk(), mk()]
    if (Math.sign(serverNewer(a, b)) !== Math.sign(clientNewer(a, b))) fail('the mailbox and the client order two cores differently')
  }
  // What the client mints, the mailbox must accept.
  for (let i = 0; i < 200; i++) {
    if (!ROOM_RE.test(makeRoomCode(r))) fail('makeRoomCode produced a code ROOM_RE rejects')
    if (!PID_RE.test(makeId(8, r))) fail('makeId produced an id PID_RE rejects')
  }
  if (serverFuture !== clientFuture) fail('the mailbox and the client disagree on how far ahead a counter may be (FUTURE)')
  const box = makeMailbox()
  if (box.handle({ r: 'nope' }, 1).status !== 400) fail('the mailbox accepted a bad room code')
  if (box.handle(null, 1).status !== 400) fail('the mailbox accepted an empty body')
  const a = newRoom({ code: '123456', id: 'aaaa', host: 'hosthost', ds: 1 })
  const b = newRoom({ code: '123456', id: 'bbbb', host: 'hosthost', ds: 1 })
  box.handle({ r: '123456', me: 'hosthost', have: null, en: {}, core: a }, 1)
  if (!box.handle({ r: '123456', me: 'otherone', have: null, en: {}, core: b }, 2).json.clash) fail('two rooms on one code did not clash')
  if (box.handle({ r: '654321', me: 'otherone', have: null, en: {} }, 3).json.none !== true) fail('an unknown room was not reported as none')
  if (TYPES.length !== SQUARES || TYPES[0] !== 'S' || TYPES[SQUARES - 1] !== 'F') fail('the board string is malformed')
  // One road through several boards: a start only at the very beginning, a finish only at the very end.
  for (let boards = 1; boards <= 3; boards++) {
    const last = lastOf(boards)
    if (typeAt(0, boards) !== 'S' || typeAt(last, boards) !== 'F') fail('the road does not start and finish where it should')
    for (let pos = 1; pos < last; pos++) if ('SF'.includes(typeAt(pos, boards))) fail(`square ${pos} of ${boards} boards is a start or a finish`)
  }
}

/* ------------------------------ pretend time ------------------------------ */
class Sched {
  constructor() { this.now = 1_800_000_000_000; this.heap = []; this.seq = 0; this.dead = new Set(); this.events = 0 }
  set = (fn, ms) => {
    const ev = { t: this.now + Math.max(0, ms || 0), id: ++this.seq, fn }
    const h = this.heap
    h.push(ev)
    let i = h.length - 1
    while (i > 0) {
      const up = (i - 1) >> 1
      if (h[up].t < ev.t || (h[up].t === ev.t && h[up].id < ev.id)) break
      h[i] = h[up]; i = up
    }
    h[i] = ev
    return ev.id
  }
  clear = (id) => { if (id) this.dead.add(id) }
  pop() {
    const h = this.heap
    const top = h[0]
    const last = h.pop()
    if (h.length) {
      let i = 0
      for (;;) {
        let kid = 2 * i + 1
        if (kid >= h.length) break
        if (kid + 1 < h.length && (h[kid + 1].t < h[kid].t || (h[kid + 1].t === h[kid].t && h[kid + 1].id < h[kid].id))) kid += 1
        if (last.t < h[kid].t || (last.t === h[kid].t && last.id < h[kid].id)) break
        h[i] = h[kid]; i = kid
      }
      h[i] = last
    }
    return top
  }
  /* Run until `done()` or until pretend time passes `limit`. */
  run(done, limit) {
    while (this.heap.length) {
      const ev = this.pop()
      if (this.dead.delete(ev.id)) continue
      this.now = ev.t
      this.events += 1
      ev.fn()
      if (done()) return true
      if (this.now > limit) return false
    }
    return false
  }
}

/* --------------------------------- a bot ---------------------------------- */
const LIES = ['a fish', 'two fish', 'A  Fish!', 'the moon', 'nothing', 'سمكة', 'سَمَكة']

function botAnswer(core, rand, me) {
  const ch = core.ch
  const item = decks.byId[ch.id]
  const pick = (n) => Math.floor(rand() * n)
  switch (ch.k) {
    case 'mcq': case 'graph': case 'who': case 'face': return rand() < 0.5 ? 0 : 1 + pick(3)
    case 'tf': return pick(2)
    case 'num': return rand() < 0.1 ? item.a : Math.round(item.a * (0.3 + rand() * 1.6))
    case 'bluff':
      if (ch.s === 0) return rand() < 0.1 ? item.truth.en : LIES[pick(LIES.length)]
      { const mine = ch.o.map((o, i) => i).filter((i) => !ch.o[i].p?.includes(me)); return mine[pick(mine.length)] }
    case 'dare': return ch.s === 0 ? 1 : pick(2)
    case 'pic': {
      const h = pick((ch.nh || 0) + 1)
      if (ch.pk === 'book') return { b: pick(decks.books.length), h }
      const r = rand()
      if (r < 0.3) return { t: rand() < 0.5 ? item.name.en : item.name.ar, h, op: 0 }
      if (r < 0.45) return { t: `${item.aliases?.[0] || item.name.en}e`, h, op: 0 } // a typo
      if (r < 0.8) return { o: pick(4), h, op: 1 }
      return { t: 'no idea at all', h, op: 0 }
    }
    case 'mini':
      switch (ch.id) {
        case 'stag': return rand() < 0.7 ? 1 : 0
        case 'auction': return pick(AUCTION.max + 1)
        case 'sheep': return sheepPlan(ch.seed).count + pick(7) - 3
        case 'reflex': return 220 + rand() * 500
        case 'memory': return memoryDigits(ch.seed).map((d) => (rand() < 0.75 ? d : (d + 1) % 10)).join('')
        default: return pick(40)
      }
    default: return 0
  }
}

class Bot {
  constructor(world, { me, name, create = null, host = false }) {
    Object.assign(this, { world, me, name, create, host })
    const { rand } = world
    // This phone's clock is wrong: usually by up to a minute, sometimes by a lot.
    const far = rand() < 0.2
    this.skew = CALM ? 0 : far ? Math.round((rand() < 0.5 ? -1 : 1) * (330_000 + rand() * 600_000)) : Math.round((rand() - 0.5) * 120_000)
    this.quiet = !CALM && rand() < 0.12 // never rolls, rarely answers
    this.plan = {}
    this.last = null
    this.sent = null
    this.open(create)
    this.loop()
  }

  open(create) {
    const { sched, send, rand } = this.world
    /* Once this phone knows the mailbox's clock, the mailbox must never refuse
       its entry again (it refuses counters more than 5 minutes in its future). */
    const checked = (body, done) => {
      const mine = body.e?.[this.me]
      if (mine && this.room?.samples.length && mine.c > sched.now + serverFuture) this.world.stats.refused += 1
      send(body, done)
    }
    this.room = new Room({
      code: this.world.code, me: this.me, send: checked, create,
      advance: (core, entries, env) => advance(core, entries, { ...env, decks }),
      clock: () => sched.now + this.skew,
      timers: sched,
      pace: () => 850 + rand() * 300,
    })
    this.room.start()
    // When did this phone first hold each state? (→ how fast a state spreads)
    this.room.subscribe(() => {
      const core = this.room.core
      if (!core || core === this.heldCore) return
      this.heldCore = core
      const level = core.g * 1e6 + core.v
      const row = (this.world.reached[level] ||= {})
      if (!(this.me in row)) row[this.me] = this.world.sched.now
    })
  }

  reload() { this.room.close(); this.plan = {}; this.open(null); this.world.stats.reloads += 1 }
  stop() { this.gone = true; this.room.close() }

  loop() {
    if (this.gone) return
    this.think()
    this.world.sched.set(() => this.loop(), 300 + this.world.rand() * 200)
  }

  /* How long this bot lets a stuck table wait before moving it on: the host
     soon, anyone else only after the engine's minute (T.anyone). */
  patience(core) { return actingHost(core, this.room.env()) === this.me ? 20_000 : 65_000 }

  /* Do something once, a little after it first became possible. */
  after(key, ms) {
    const now = this.room.now()
    if (this.plan.key !== key) this.plan = { key, at: now + ms }
    return now >= this.plan.at
  }

  think() {
    const room = this.room
    const { world } = this
    const { rand, stats } = world
    const { core, entries } = room.snapshot()
    if (!core) return
    const mine = entries[this.me]?.d || {}
    const now = room.now()

    // Count the times two phones briefly disagreed and one core replaced another.
    if (this.last && this.last.g === core.g && this.last.v === core.v && this.last.h !== core.h) stats.forks += 1
    this.last = core
    world.check(core, this)

    if (this.leaving) return
    if (!mine.name) return void room.setMine({ name: this.name, j: now })
    const meIn = core.players.find((p) => p.id === this.me)

    switch (core.phase) {
      case 'lobby': {
        if (actingHost(core, room.env()) === this.me && meIn && mine.start !== core.g) {
          const everyone = core.players.length >= world.expect
          if (this.after(`start${core.g}`, everyone ? 600 : 9000)) {
            const books = rand() < 0.25 ? decks.books.filter(() => rand() < 0.6) : decks.books
            room.setMine({ start: core.g, st: now, books: books.length ? books : decks.books, timed: world.timed })
          }
        }
        break
      }
      case 'roll': {
        if (!meIn || meIn.gone) break
        // An untimed game waits for a quiet friend's roll for ever — unless the host rolls for them.
        if (!core.timed && turnPlayer(core).id !== this.me && mine.rollFor !== turnKey(core)) {
          if (this.after(`rollFor${turnKey(core)}`, this.patience(core) + rand() * 20_000)) room.setMine({ rollFor: turnKey(core), rft: now })
          break
        }
        if (turnPlayer(core).id !== this.me || mine.roll === turnKey(core)) break
        // A quiet player never rolls in a timed game (the die rolls itself); in
        // an untimed one they are slow, not gone — someone may roll for them first.
        const wait = !this.quiet ? 300 + rand() * 2600 : core.timed ? null : 90_000 + rand() * 60_000
        if (wait != null && this.after(`roll${turnKey(core)}`, wait)) room.setMine({ roll: turnKey(core), rt: now })
        break
      }
      case 'play': {
        const ch = core.ch
        const slot = slotOf(core)
        if (!meIn || now < ch.t0) break
        // Now and then the player whose turn it is — or the host — skips the
        // question for a new one (`maySkip`) before answering it.
        if (this.skipFor !== slot) {
          this.skipFor = slot
          this.skipAt = !this.quiet && maySkip(core, room.env(), this.me) && rand() < 0.12 ? ch.t0 + 200 + rand() * 3000 : null
        }
        if (this.skipAt != null && now >= this.skipAt && mine.a?.s !== slot && mine.swap !== slot && maySkip(core, room.env(), this.me)) {
          this.skipAt = null
          room.setMine({ swap: slot, swt: now })
          break
        }
        // The host closes an untimed round that a quiet friend is holding up.
        if (ch.t1 == null && mine.end !== slot && (mine.a?.s === slot || !expected(core).includes(this.me)) && this.after(`end${slot}`, this.patience(core) + 5_000 + rand() * 30_000)) {
          room.setMine({ end: slot, et: now })
          break
        }
        if (!expected(core).includes(this.me) || mine.a?.s === slot) break
        if (this.answer !== slot) {
          const span = (ch.t1 ?? ch.t0 + 30_000) - ch.t0
          const late = ch.k === 'mini' && !['stag', 'auction'].includes(ch.id)
          this.answer = slot
          // Untimed, a player who would have let the clock run out answers late instead.
          const skip = rand() < (this.quiet ? 0.7 : 0.06)
          const slow = skip && ch.t1 == null
          this.answerPlan = { at: ch.t0 + (slow ? 90_000 + rand() * 60_000 : late ? span - 1500 + rand() * 1200 : 600 + rand() * span * 0.8), skip: skip && !slow }
        }
        if (this.answerPlan.skip || now < this.answerPlan.at || (ch.t1 != null && now > ch.t1)) break
        // Now and then a hint is bought first: recorded in the entry (as the
        // phone does the moment it is tapped), and sometimes also in the answer.
        const most = maxHints(ch)
        const h = most && rand() < 0.3 ? 1 + Math.floor(rand() * most) : 0
        if (h && mine.rv?.s !== slot) { room.setMine({ rv: { s: slot, h } }); break }
        room.setMine({ a: { s: slot, v: botAnswer(core, rand, this.me), at: now, ...(h && rand() < 0.5 ? { h } : {}) } })
        this.sent = slot
        break
      }
      case 'reveal': {
        // Was an answer this bot sent in time left out of the result?
        if (this.sent === slotOf(core) && this.counted !== resultKey(core)) {
          this.counted = resultKey(core)
          stats.answers += 1
          if (!core.res.a[this.me]) stats.lost += 1
        }
        if (!meIn) break
        if (!core.timed) {
          // Untimed: everyone taps on when they have read it (a quiet one only
          // much later), and the table is moved on if somebody takes too long.
          if (mine.next === resultKey(core) && mine.go !== resultKey(core) && this.after(`go${resultKey(core)}`, this.patience(core) + 10_000 + rand() * 30_000)) {
            room.setMine({ go: resultKey(core), gt: now })
            break
          }
          if (mine.next === resultKey(core)) break
          if (this.reading !== resultKey(core)) {
            this.reading = resultKey(core)
            const slow = rand() < (this.quiet ? 0.6 : 0.03)
            this.readPlan = { at: core.t + (slow ? 90_000 + rand() * 60_000 : 2500 + rand() * 12_000) }
          }
          if (now >= this.readPlan.at) room.setMine({ next: resultKey(core), nt: now })
          break
        }
        if (mine.next === resultKey(core) || !mayMoveOn(core, room.env()).includes(this.me)) break
        if (this.plan.key !== `next${resultKey(core)}`) this.plan = { key: `next${resultKey(core)}`, at: core.t + 3000 + rand() * 9000, skip: rand() < 0.35 }
        if (!this.plan.skip && now >= this.plan.at) room.setMine({ next: resultKey(core), nt: now })
        break
      }
      case 'over': {
        if (core.g >= world.rounds) break
        if (actingHost(core, room.env()) === this.me && mine.again !== core.g && this.after(`again${core.g}`, 2500)) room.setMine({ again: core.g })
        break
      }
      default:
    }
  }
}

/* -------------------------------- one game -------------------------------- */
const totals = { settle: 0, spread: [], games: 0, turns: 0, ms: 0, forks: 0, lost: 0, answers: 0, reloads: 0, requests: 0, bytes: 0, events: 0, kinds: {}, byPlayers: {}, healed: 0, skips: 0, played: 0, dealt: 0, labAgain: 0, judged: 0, rolled: 0 }

function playGame(index) {
  const rand = rng(SEED * 100_003 + index)
  const sched = new Sched()
  const players = 1 + Math.floor(rand() * rand() * MAX_PLAYERS * 1.3) % MAX_PLAYERS // 1–8, mostly few
  const cfg = CALM
    ? { instances: 1, drop: 0, min: 40, max: 120, forget: 0 }
    : { instances: 1 + Math.floor(rand() * 3), drop: rand() * 0.06, min: 20, max: 200 + rand() * 400, forget: rand() < 0.6 ? 1 : 0 }
  const boxes = Array.from({ length: cfg.instances }, makeMailbox)
  const stats = { forks: 0, lost: 0, answers: 0, reloads: 0, requests: 0, bytes: 0, healed: 0, refused: 0 }
  const lag = () => (cfg.min + rand() * (cfg.max - cfg.min)) * (!CALM && rand() < 0.04 ? 6 : 1)

  const send = (body, done) => {
    const up = JSON.stringify(body)
    stats.requests += 1
    stats.bytes += up.length
    if (rand() < cfg.drop) return void sched.set(() => done(null), 2500)
    sched.set(() => {
      const out = boxes[Math.floor(rand() * boxes.length)].handle(JSON.parse(up), sched.now)
      if (out.status !== 200) throw new Error(`the mailbox refused a request: ${JSON.stringify(out.json)}`)
      if (out.json.none && body.have) stats.healed += 1
      const down = JSON.stringify(out.json)
      stats.bytes += down.length
      if (rand() < cfg.drop) return void sched.set(() => done(null), 2500)
      sched.set(() => done(JSON.parse(down)), lag())
    }, lag())
  }

  const world = {
    rand, sched, send, stats,
    code: makeRoomCode(rand),
    expect: players,
    rounds: rand() < 0.2 ? 2 : 1, // sometimes they play again
    timed: rand() < 0.5, // the host's choice in the lobby
    seenKinds: new Set(),
    seenSkips: new Set(),
    over: new Set(),
    judged: new Set(),
    /* Nothing twice in one game (the engine's `asking`): in every core, the
       list of what the game has asked holds no question or dare twice and no
       person or picture twice, and ends with the round on the table. A Lab game
       may come round again, but only once every one has been played. */
    checkAsked(core) {
      if (core.phase === 'lobby') return
      const { asked } = core
      if (!Array.isArray(asked)) throw new Error('a game has no list of what it has asked')
      if (core.ch && core.ch.k !== 'luck' && asked[asked.length - 1] !== ASK.at.get(askKey(core.ch))) {
        throw new Error(`the round on the table is not the last thing the game asked: ${JSON.stringify(core.ch)}`)
      }
      const once = new Set()
      const shown = new Set()
      for (const i of asked) {
        const name = ASK_NAMES[i]
        if (name == null) throw new Error(`game ${core.g} asked something that is not in the decks: ${i}`)
        if (name.startsWith('m:')) continue
        if (once.has(i)) throw new Error(`game ${core.g} asked ${name} twice: ${asked.map((n) => ASK_NAMES[n]).join(' ')}`)
        once.add(i)
        for (const m of ASK.marks[i]) {
          if (shown.has(m)) throw new Error(`game ${core.g} showed ${m} twice (the second time with ${name})`)
          shown.add(m)
        }
      }
      if (core.phase === 'over' && !this.over.has(core.g)) {
        this.over.add(core.g)
        totals.played += 1
        totals.dealt += asked.length
        const labs = asked.filter((i) => ASK_NAMES[i].startsWith('m:'))
        totals.labAgain += labs.length - new Set(labs).size
      }
    },
    reached: {},
    began: {},
    check(core, bot) {
      if (core.phase === 'roll' && core.n === 1 && !this.began[core.g]) this.began[core.g] = core.t
      if (JSON.stringify(core).length > 20_000) throw new Error('a core grew past 20 kB')
      if (core.phase !== 'lobby') for (const p of core.players) if (!(p.pos >= 0 && p.pos <= core.last)) throw new Error(`a token is off the board: ${p.pos}`)
      if (core.phase !== 'lobby' && !(core.turn >= 0 && core.turn < core.players.length)) throw new Error('the turn points at nobody')
      if (core.phase === 'reveal' || core.phase === 'play') {
        const key = `${core.g}:${core.n}${core.ch.card ? 'c' : 'q'}`
        if (!this.seenKinds.has(key)) { this.seenKinds.add(key); const k = core.ch.k === 'mini' ? `mini:${core.ch.id}` : core.ch.k; totals.kinds[k] = (totals.kinds[k] || 0) + 1 }
        // A question skipped for a new one: a round with a slot of its own, on the same square.
        if (core.ch.r && !this.seenSkips.has(`${key}:${core.ch.r}`)) {
          this.seenSkips.add(`${key}:${core.ch.r}`)
          totals.skips += 1
          if (!core.ch.by || !slotOf(core).endsWith(`:${core.ch.r}`)) throw new Error(`a skipped question was dealt badly: ${JSON.stringify(core.ch)}`)
        }
      }
      this.checkAsked(core)
      this.checkTurn(core)
      void bot
    },
    /* THE TURN (engine.js, 2026-11-20): a question card first, everyone
       answering; the die only for a card its player won (`x.roll`) or a chance
       card's "roll again"; after the roll, a round only on a special square —
       of that square's kind — and on a plain one, a beat (`moved`). */
    checkTurn(core) {
      if (core.phase === 'lobby' || core.phase === 'over') return
      const roller = core.players[core.turn]
      const square = (pos) => typeAt(pos, core.boards.length)
      if (core.phase === 'roll' && core.via !== 'card' && core.via !== 'luck') throw new Error(`a roll nobody earned: ${JSON.stringify({ via: core.via, n: core.n })}`)
      if (core.phase === 'moved') {
        if (!core.die) throw new Error('a move without a roll')
        if (square(roller.pos) === 'L') throw new Error('landed on the Lab and played no game')
      }
      if (core.phase !== 'play' && core.phase !== 'reveal') return
      const ch = core.ch
      if (ch.card) {
        if (core.die) throw new Error(`a question card after the turn's roll: ${JSON.stringify(ch)}`)
        if (!['mcq', 'tf', 'num', 'who', 'graph', 'pic', 'face'].includes(ch.k)) throw new Error(`a question card of a kind no card is: ${ch.k}`)
      } else {
        // A square's round: after the roll, and the square's own kind.
        const at = core.phase === 'reveal' && core.res.pre ? core.res.pre[core.turn] : roller.pos
        const want = { mini: 'L', bluff: 'B', dare: 'D', luck: 'C' }[ch.k]
        if (!core.die || want !== square(at)) throw new Error(`a ${ch.k} round on a ${square(at)} square (die ${core.die})`)
      }
      if (core.phase === 'reveal' && ch.card) {
        const won = (core.res.aw[roller.id] || 0) > 0
        if (!!core.res.x.roll !== won) throw new Error(`a card's roll does not follow its answer: ${JSON.stringify({ won, roll: core.res.x.roll, aw: core.res.aw })}`)
        const key = `${core.g}:${core.n}`
        if (!this.judged.has(key)) {
          this.judged.add(key)
          totals.judged += 1
          if (core.res.x.roll) totals.rolled += 1
        }
      }
    },
  }

  const hostId = makeId(8, rand)
  const bots = [new Bot(world, { me: hostId, name: 'Host', host: true, create: newRoom({ code: world.code, id: makeId(8, rand), host: hostId, ds: Math.floor(rand() * 1e9) }) })]
  // In half the games two of the players carry the names of members who wrote
  // questions (data/game/members.js), so the deal passes their own over.
  const named = rand() < 0.5 ? ['Maria', 'مجد'] : []
  for (let i = 1; i < players; i++) sched.set(() => bots.push(new Bot(world, { me: makeId(8, rand), name: named[i - 1] || `P${i + 1}` })), 400 + rand() * 5000)

  if (!CALM) {
    // The mailbox instances forget.
    if (cfg.forget) {
      const forget = () => { boxes[Math.floor(rand() * boxes.length)].forget(); sched.set(forget, 20_000 + rand() * 160_000) }
      sched.set(forget, 15_000 + rand() * 60_000)
    }
    // Tabs reload — but never the only tab left. The players' tabs ARE the
    // room's memory (the mailbox forgets); a room whose last tab reloads onto a
    // mailbox that has just forgotten is gone, and that is the accepted limit.
    const reload = () => {
      const open = bots.filter((b) => !b.gone && !b.leaving && b.room.core)
      const b = bots[Math.floor(rand() * bots.length)]
      if (b && !b.gone && open.some((other) => other !== b)) b.reload()
      sched.set(reload, 30_000 + rand() * 240_000)
    }
    sched.set(reload, 20_000 + rand() * 120_000)
    // Somebody arrives late…
    if (players < MAX_PLAYERS && rand() < 0.3) {
      sched.set(() => { world.expect += 1; bots.push(new Bot(world, { me: makeId(8, rand), name: 'Late' })) }, 40_000 + rand() * 300_000)
    }
    // …and somebody walks out — now and then the host.
    if (players >= 3 && rand() < 0.3) {
      sched.set(() => {
        const pool = bots.filter((b) => !b.gone && (rand() < 0.25 || !b.host))
        const b = pool[Math.floor(rand() * pool.length)]
        if (!b) return
        b.leaving = true
        b.room.setMine({ left: true })
        sched.set(() => b.stop(), 4000)
      }, 60_000 + rand() * 300_000)
    }
  }

  const live = () => bots.filter((b) => !b.gone)
  const finished = () => {
    const cores = live().map((b) => b.room.core).filter(Boolean)
    return cores.length > 0 && cores.every((c) => c.phase === 'over' && c.g >= world.rounds)
  }
  const start = sched.now
  if (!sched.run(finished, start + 16 * 3600_000)) {
    const where = live().map((b) => `${b.name}: ${b.room.core ? `${b.room.core.phase} g${b.room.core.g} n${b.room.core.n} v${b.room.core.v}` : 'no core'} (${b.room.status})`).join(' | ')
    throw new Error(`game ${index} never finished — ${where} — boxes=${boxes.map((x) => { const c = x.peek(world.code)?.core; return c ? `${c.phase} g${c.g} n${c.n} v${c.v}` : "none" }).join(",")} — timed=${world.timed}`)
  }
  if (stats.refused) throw new Error(`game ${index}: the mailbox refused ${stats.refused} entr${stats.refused > 1 ? 'ies' : 'y'} from phones that already knew its clock`)
  // Let the last exchanges land, then every phone must hold the same core.
  const sealOf = (b) => b.room.seal() || 'nothing yet'
  const agreed = () => new Set(live().map(sealOf)).size === 1
  const overAt = sched.now
  sched.run(() => sched.now >= overAt + 3000 && agreed(), overAt + 30_000)
  totals.settle = Math.max(totals.settle, sched.now - overAt)
  const seals = new Set(live().map(sealOf))
  if (seals.size !== 1) {
    const detail = live().map((b) => `${b.name}${b.leaving ? '(leaving)' : ''}: ${b.room.core?.phase} ${sealOf(b)} status=${b.room.status} fails=${b.room.fails} offer=${b.room.offerCore} busy=${b.room.busy} streak=${b.room.streak}`).join(' | ')
    throw new Error(`game ${index}: the phones ended on ${seals.size} different cores: ${[...seals].join(' vs ')} — ${detail} — boxes=${boxes.map((x) => x.peek(world.code)?.core?.h || 'none').join(',')} — cfg=${JSON.stringify(cfg)}`)
  }

  // A state's spread: from the first phone that held it to the last (phones that
  // were reloading or had left at the time are the >20 s outliers, left out).
  for (const row of Object.values(world.reached)) {
    const times = Object.values(row)
    if (times.length < 2) continue
    const first = Math.min(...times)
    const last = Math.max(...times.filter((t) => t - first < 20_000))
    totals.spread.push(last - first)
  }

  const core = live()[0].room.core
  if (!core) throw new Error(`game ${index}: the room was lost — no phone holds it any more`)
  totals.games += 1
  totals.turns += core.n
  const took = core.t - (world.began[core.g] || start)
  totals.ms += took
  totals.events += sched.events
  for (const key of ['forks', 'lost', 'answers', 'reloads', 'requests', 'bytes', 'healed']) totals[key] += stats[key]
  const row = (totals.byPlayers[players] ||= { games: 0, turns: 0, ms: 0 })
  row.games += 1; row.turns += core.n; row.ms += took
  for (const b of bots) if (!b.gone) b.stop()
  if (VERBOSE) console.log(`  game ${index}: ${players} players, ${core.n} turns, ${cfg.instances} instance(s), drop ${(cfg.drop * 100).toFixed(1)}%, forks ${stats.forks}`)
}

const began = Date.now()
for (let i = 0; i < GAMES; i++) {
  try { playGame(i) } catch (err) {
    console.error(`✗ ${err.message}\n  (repeat with: node scripts/sim-game.mjs --seed ${SEED} --games ${i + 1} --verbose)`)
    if (VERBOSE) console.error(err.stack)
    process.exit(1)
  }
}

const mins = (ms) => (ms / 60000).toFixed(1)
console.log(`\n✓ ${totals.games} games finished, and every phone agreed at the end  (${((Date.now() - began) / 1000).toFixed(1)}s, ${(totals.events / 1e6).toFixed(1)}M events)`)
console.log(`  network: ${CALM ? 'calm' : 'lossy, laggy, forgetful'} · ${totals.requests} requests · ${(totals.bytes / totals.requests).toFixed(0)} bytes per exchange · rooms rebuilt from a phone ${totals.healed}× · tabs reloaded ${totals.reloads}×`)
{
  const sp = totals.spread.sort((a, b) => a - b)
  const at = (q) => (sp.length ? Math.round(sp[Math.min(sp.length - 1, Math.floor(sp.length * q))]) : 0)
  console.log(`  a new state reaches every phone in: median ${at(0.5)} ms · 90% within ${at(0.9)} ms · 99% within ${at(0.99)} ms   (slowest agreement at the end: ${(totals.settle / 1000).toFixed(1)} s)`)
}
console.log(`  brief disagreements settled: ${totals.forks} · answers sent in time but left out: ${totals.lost} of ${totals.answers} · questions skipped for a new one: ${totals.skips}`)
console.log('  players   games   turns   minutes')
for (const [n, row] of Object.entries(totals.byPlayers)) {
  console.log(`  ${String(n).padStart(7)}  ${String(row.games).padStart(6)}  ${(row.turns / row.games).toFixed(1).padStart(6)}  ${mins(row.ms / row.games).padStart(8)}`)
}
const all = Object.values(totals.kinds).reduce((a, b) => a + b, 0)
console.log(`  question cards won by the player whose turn it was (so they rolled): ${totals.rolled} of ${totals.judged} (${totals.judged ? Math.round((totals.rolled / totals.judged) * 100) : 0}%)`)
console.log(`  nothing asked twice in a game: ${totals.dealt} rounds dealt in ${totals.played} games, no question, dare, person or picture twice · a Lab game again (after all had been played): ${totals.labAgain}×`)
console.log(`  challenges: ${Object.entries(totals.kinds).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${((n / all) * 100).toFixed(0)}%`).join(' · ')}`)
