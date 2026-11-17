/*
 * THE ROOM, FROM ONE PHONE'S SIDE.
 *
 * Every player's tab holds a full copy of the room: the game's `core`, one
 * small `entry` per player (that player's own inputs — a name, a roll, an
 * answer) and when each player was last heard from. About once a second it
 * swaps notes with the mailbox on our own origin (api/_mailbox.js): here is
 * what I have, send me what I lack, tell me what YOU lack.
 *
 * WHO RUNS THE GAME? EVERYONE, IDENTICALLY. The rules are one pure function —
 * `advance(core, entries, env)` in engine.js — that says what the next core is,
 * if the inputs or the clock now allow one. Any phone may compute it, and all
 * of them compute the same thing from the same inputs, so there is no "host
 * device" whose battery the evening depends on. When two phones do disagree (one
 * had seen an answer the other had not), both results are legal states and the
 * greater (g, v, h) wins everywhere — the same rule the mailbox applies.
 *
 * To keep six phones from all announcing the same step at once, only one acts
 * straight away: whoever's own tap made the step possible (`eager`), or else
 * the first player still connected. The rest wait a beat that grows with their
 * place in the list, and step in only if nobody has.
 *
 * A PLAYER WRITES ONLY THEIR OWN ENTRY. Its counter `c` is a clock reading, not
 * 1, 2, 3 — so that a phone which reloads mid-game, and has forgotten its last
 * counter, still writes a greater one than the copy the others are holding.
 *
 * THE MAILBOX MAY FORGET EVERYTHING AT ANY MOMENT (a serverless instance is
 * recycled; a second instance never knew). So nothing is ever "sent and done":
 * each reply carries `want`, and whatever is wanted goes out on the next call.
 * One live tab is enough to restore a room.
 *
 * NO PROMISES, NO fetch, NO setTimeout IN HERE — the transport, the clock and
 * the timers are handed in. That is what lets scripts/sim-game.mjs run hundreds
 * of whole games over a lossy, laggy, forgetful network in a few seconds of
 * virtual time. The browser's versions are at the bottom.
 */

/* > 0 when core `a` is newer than core `b` — the mailbox's own order. */
export const newer = (a, b) => (a.g - b.g) || (a.v - b.v) || (a.h > b.h ? 1 : a.h < b.h ? -1 : 0)

/* A room code is six digits: easy to say aloud on a call in any language, and
   typed on the number pad whatever keyboard the phone is set to. */
export const ROOM_RE = /^[1-9]\d{5}$/
export const makeRoomCode = (rand = Math.random) => String(100000 + Math.floor(rand() * 900000))
export const cleanRoomCode = (raw) => String(raw ?? '')
  .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
  .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
  .replace(/\D/g, '')
  .slice(0, 6)

const ID_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'
export const PID_RE = /^[a-z0-9]{6,12}$/
export const makeId = (length = 8, rand = Math.random) => (
  Array.from({ length }, () => ID_CHARS[Math.floor(rand() * ID_CHARS.length)]).join('')
)

/* How long since a player was heard from before they count as… */
export const AWAY = { offline: 8000, gone: 25000 }

/* How far into its future the mailbox accepts an entry's counter — the same
   limit as `cleanEntry` in api/_mailbox.js (the simulator checks they match). */
export const FUTURE = 300_000

export class Room {
  constructor({ code, me = null, send, advance = null, create = null, clock = () => Date.now(), timers = null, pace = () => 1000 }) {
    this.code = code
    this.me = me
    this.send = send
    this.advance = advance
    this.clock = clock
    this.timers = timers || { set: (fn, ms) => setTimeout(fn, ms), clear: (id) => clearTimeout(id) }
    this.pace = pace

    this.core = create
    this.entries = {}
    this.seen = {}
    this.status = 'connecting' // → 'ok' | 'offline' | 'clash'
    this.misses = 0 // replies in a row saying "no such room", while we have none either
    this.offset = 0
    this.samples = []
    this.born = clock()

    this.offerCore = !!create
    this.offer = new Set()
    this.peers = {} // mailbox instance → what it is known to hold (see `exchange`)
    this.busy = false
    this.again = false
    this.eager = false
    this.streak = 0
    this.fails = 0
    this.pending = null
    this.closed = false
    this.listeners = new Set()
    this.snap = null
    this.pollTimer = null
    this.stepTimer = null
    this.beat = null
  }

  /* ---- reading ---- */
  now() { return this.clock() + this.offset }

  /* Still in the game: heard from within `AWAY.gone` and has not walked out.
     Deliberately generous — this is the test for "are we still waiting on
     them?", and a phone on a bad connection must not lose a round to it. */
  present = (pid) => {
    if (this.entries[pid]?.d?.left) return false
    if (pid === this.me) return true
    return this.quiet(pid) < AWAY.gone
  }

  /* On the line right now — for the "offline" mark, and for who acts first. */
  live = (pid) => {
    if (this.entries[pid]?.d?.left) return false
    if (pid === this.me) return true
    return this.quiet(pid) < AWAY.offline
  }

  /* How long since `pid` was heard from. Someone this phone has NO word of yet
     is counted from when it arrived, not from the beginning of time: a tab that
     has just reloaded onto a mailbox that has just been recycled knows nothing
     about anyone, and must not conclude that everyone has left. */
  quiet(pid) {
    const t = this.seen[pid]
    return t ? this.now() - t : this.clock() - this.born
  }

  snapshot() {
    if (!this.snap) {
      this.snap = { core: this.core, entries: this.entries, seen: this.seen, status: this.status, misses: this.misses }
    }
    return this.snap
  }

  subscribe(fn) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  emit() {
    this.snap = null
    for (const fn of this.listeners) fn()
  }

  /* ---- writing: a player's own entry, and nothing else ---- */
  setMine(patch) {
    if (!this.me || this.closed) return
    const prev = this.entries[this.me]
    const d = { ...(prev?.d || {}) }
    for (const [key, value] of Object.entries(patch)) {
      if (value == null) delete d[key]
      else d[key] = value
    }
    const c = Math.max((prev?.c || 0) + 1, Math.round(this.now()))
    this.entries = { ...this.entries, [this.me]: { c, d } }
    this.offer.add(this.me)
    this.eager = true
    this.step()
    this.emit()
    this.flush()
  }

  /* ---- the rules, applied here ---- */
  env() {
    return { now: this.now(), present: this.present, live: this.live, me: this.me }
  }

  /* How long this phone lets others go first. */
  delay() {
    const order = (this.core?.players || []).map((p) => p.id).filter(this.live)
    const place = order.indexOf(this.me)
    return Math.min(3000, 120 + (place < 0 ? order.length : place) * 450)
  }

  step() {
    if (!this.core || !this.advance || this.closed) return
    this.timers.clear(this.stepTimer)
    let moved = false
    for (let guard = 0; guard < 8; guard++) {
      let next = null
      try { next = this.advance(this.core, this.entries, this.env()) } catch (err) {
        // A rule that throws must not take the room down with it.
        if (!this.complained) { this.complained = true; console.error('[game] advance failed', err) }
        break
      }
      if (!next) { this.pending = null; break }
      const key = `${this.core.g}:${this.core.v}:${this.core.h}`
      if (this.pending?.key !== key) this.pending = { key, at: this.clock() }
      const wait = this.eager ? 0 : this.pending.at + this.delay() - this.clock()
      if (wait > 0) {
        this.stepTimer = this.timers.set(() => this.step(), wait)
        break
      }
      this.core = next
      this.offerCore = true
      this.pending = null
      moved = true
    }
    this.eager = false
    if (moved) { this.emit(); this.flush() }
  }

  /* ---- talking to the mailbox ---- */
  start() {
    if (this.closed) return
    this.exchange()
    // The clock alone can make a step due (a deadline passing), so look often.
    const look = () => {
      if (this.closed) return
      this.step()
      this.beat = this.timers.set(look, 400)
    }
    this.beat = this.timers.set(look, 400)
  }

  close() {
    this.closed = true
    this.timers.clear(this.pollTimer)
    this.timers.clear(this.stepTimer)
    this.timers.clear(this.beat)
    this.listeners.clear()
  }

  seal() { return this.core ? `${this.core.g}:${this.core.v}:${this.core.h}` : null }

  /* The mailbox instances heard from in the last quarter-minute. One that has
     gone quiet has most likely been recycled, and is forgotten. */
  freshPeers() {
    const t = this.clock()
    for (const [id, p] of Object.entries(this.peers)) if (t - p.at > 15000) delete this.peers[id]
    return Object.values(this.peers)
  }

  flush() {
    if (this.closed) return
    if (this.busy) { this.again = true; return }
    this.timers.clear(this.pollTimer)
    this.exchange()
  }

  schedule(ms) {
    this.timers.clear(this.pollTimer)
    if (!this.closed) this.pollTimer = this.timers.set(() => this.exchange(), ms)
  }

  exchange() {
    if (this.closed || this.busy) return
    this.busy = true
    const en = {}
    for (const [pid, entry] of Object.entries(this.entries)) en[pid] = entry.c
    const seen = {}
    for (const [pid, t] of Object.entries(this.seen)) if (pid !== this.me) seen[pid] = t
    const body = { r: this.code, me: this.me, have: this.core ? [this.core.g, this.core.v, this.core.h] : null, en, seen }

    /* THERE MAY BE MORE THAN ONE MAILBOX. A serverless function can run as
       several instances that share nothing, and each call lands on whichever
       one the platform picks. Every reply names its instance (`i`), so this
       phone remembers what each one holds — and keeps attaching its core, and
       its own entry, until EVERY instance heard from lately has them. (Sending
       only when asked meant the answer to "send me that" usually went to the
       other instance: the simulator found phones seconds apart.) */
    const peers = this.freshPeers()
    const seal = this.seal()
    const mine = this.me ? this.entries[this.me] : null
    const sentCore = this.core && (this.offerCore || peers.some((p) => p.seal !== seal)) ? this.core : null
    if (sentCore) body.core = sentCore
    if (mine && peers.some((p) => p.c < mine.c)) this.offer.add(this.me)
    const sent = {}
    for (const pid of this.offer) if (this.entries[pid]) sent[pid] = this.entries[pid]
    if (Object.keys(sent).length) body.e = sent

    const t0 = this.clock()
    this.send(body, (resp) => {
      this.busy = false
      if (this.closed) return
      const t1 = this.clock()
      if (!resp || typeof resp.now !== 'number') {
        this.fails += 1
        if (this.fails >= 3 && this.status !== 'offline') { this.status = 'offline'; this.emit() }
        this.again = false
        return this.schedule(Math.min(4000, 500 * this.fails))
      }
      this.fails = 0

      /* The server's clock, as seen from here: the reply left it half a round
         trip ago. The quickest of the recent exchanges is the least wrong. */
      this.samples.push({ rtt: t1 - t0, off: resp.now + (t1 - t0) / 2 - t1 })
      if (this.samples.length > 8) this.samples.shift()
      this.offset = this.samples.reduce((best, s) => (s.rtt < best.rtt ? s : best)).off

      /* A CLOCK FAR AHEAD. This phone's first entry is written before it knows
         the mailbox's clock (the name goes in as the room opens), so a phone
         minutes fast stamps a counter from the mailbox's future — and the
         mailbox refuses those (FUTURE), as it must: one from the far future
         would win every merge for ever. Every later input counts up from it,
         so it was refused too: on 2026-11-17 a laptop 7 minutes fast played two
         minutes of a live game that nobody else could see. Now that the clock
         is known, stamp the entry again. Going back is safe: the mailbox cannot
         be holding the refused one — and no instance is assumed to. */
      const stamped = this.me ? this.entries[this.me] : null
      if (stamped && stamped.c > resp.now + FUTURE) {
        this.entries = { ...this.entries, [this.me]: { c: Math.round(this.now()), d: stamped.d } }
        this.offer.add(this.me)
        for (const p of Object.values(this.peers)) p.c = -1
      }

      if (resp.clash || (resp.core && this.core && resp.core.id !== this.core.id)) {
        this.status = 'clash'
        return this.emit()
      }
      this.status = 'ok'

      // What we sent has landed — unless it changed while it was in the air.
      if (sentCore && this.core === sentCore) this.offerCore = false
      for (const [pid, entry] of Object.entries(sent)) if (this.entries[pid] === entry) this.offer.delete(pid)

      if (resp.core && (!this.core || newer(resp.core, this.core) > 0)) this.core = resp.core
      if (resp.e) {
        const merged = { ...this.entries }
        for (const [pid, entry] of Object.entries(resp.e)) {
          if (entry && Number.isFinite(entry.c) && (!merged[pid] || entry.c > merged[pid].c)) merged[pid] = entry
        }
        this.entries = merged
      }
      if (resp.seen) {
        const seenNow = { ...this.seen }
        for (const [pid, t] of Object.entries(resp.seen)) if (t > (seenNow[pid] || 0)) seenNow[pid] = t
        this.seen = seenNow
      }

      // What the mailbox lacks goes out next time.
      if (resp.want?.core) this.offerCore = true
      for (const pid of resp.want?.e || []) if (this.entries[pid]) this.offer.add(pid)
      if (resp.none) {
        if (this.core) { this.offerCore = true; for (const pid of Object.keys(this.entries)) this.offer.add(pid) } else this.misses += 1
      } else this.misses = 0

      // …and what THIS instance now holds is remembered against its name.
      const wantsMine = (resp.want?.e || []).includes(this.me)
      this.peers[typeof resp.i === 'string' ? resp.i : '-'] = {
        seal: Array.isArray(resp.have) ? resp.have.join(':') : null,
        c: resp.none || (wantsMine && !sent[this.me]) ? -1 : (sent[this.me]?.c ?? en[this.me] ?? -1),
        at: this.clock(),
      }

      this.step()
      this.emit()

      // Something is owed — to this instance or to another: go again at once,
      // but never in a tight loop (an instance that has been recycled stays
      // "owed" until it is forgotten, and must not be hammered meanwhile).
      const now = this.seal()
      const own = this.me ? this.entries[this.me] : null
      const behind = this.freshPeers().some((p) => p.seal !== now || (own && p.c < own.c))
      const owed = this.again || behind || this.offer.size > 0
      this.again = false
      this.streak = owed ? this.streak + 1 : 0
      this.schedule(owed && this.streak <= 3 ? 0 : this.pace(this))
    })
  }
}

/* ============================ the browser's side ============================ */

/* POST to our own origin. Resolved against the document, not the root, so a
   build hosted under a sub-path still finds its endpoint (vite.config: base). */
export function httpSend(body, done) {
  let finished = false
  const finish = (value) => { if (!finished) { finished = true; done(value) } }
  const ctrl = typeof AbortController === 'function' ? new AbortController() : null
  const timer = setTimeout(() => { ctrl?.abort(); finish(null) }, 6000)
  fetch(new URL('api/room', document.baseURI), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
    credentials: 'omit',
    signal: ctrl?.signal,
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((json) => { clearTimeout(timer); finish(json) })
    .catch(() => { clearTimeout(timer); finish(null) })
}
