/*
 * THE ROOM MAILBOX — the only server-side code this site has.
 *
 * «رُقعة النرد» is played by a club on a video call, every member on their own
 * phone. Phones cannot talk to each other directly without a third party in the
 * middle, and this site makes no third-party requests — so the middle is this
 * one small function on our own origin.
 *
 * IT DOES NOT KNOW THE GAME. It keeps, per room code, the newest "core" (the
 * game's state, an opaque object to this file), one small "entry" per player
 * (that player's own inputs) and when each player was last heard from. A phone
 * posts what it has and gets back what it lacks. All the rules live in the
 * browser (src/lib/game/engine.js), which is why changing the game never means
 * changing — or redeploying — this file.
 *
 * NOTHING HERE IS DURABLE, AND THE GAME DOES NOT NEED IT TO BE. The rooms live
 * in this module's memory: a serverless instance may be recycled at any moment,
 * and two instances do not share a Map. So every exchange is a two-way sync:
 * the reply says what THIS instance is missing (`want`), and the phone sends it
 * on its next call. The players' own tabs are the durable copy — one live tab
 * is enough to rebuild a room on an instance that has never heard of it. Do not
 * "fix" this by bolting on a database: it would add the one moving part that
 * can be down while everyone is waiting on a call.
 *
 * Merge rules (the client applies the same ones — see `newer` in
 * src/lib/game/net.js; scripts/sim-game.mjs checks the two agree):
 *   core      the greater of (g, v, h) wins — game number, version, content hash
 *   entry     per player, the greater counter `c` wins
 *   seen      per player, the later time wins
 *
 * A room is addressed by its code alone. There are no accounts and no secrets:
 * whoever knows the code can join, exactly like the party games this imitates.
 */

const TTL = 3 * 60 * 60 * 1000 // a room nobody has touched for three hours is forgotten
const MAX_ROOMS = 300
const MAX_CORE = 24_000 // characters of JSON
const MAX_ENTRY = 1_600
const MAX_ENTRIES = 16
const ROOM_RE = /^[1-9]\d{5}$/ // six digits — see net.js
const PID_RE = /^[a-z0-9]{6,12}$/

/* One mailbox = one serverless instance's memory. `id` names the instance in
   every reply, so a phone can tell that it is talking to more than one of them
   and keep offering its state until EACH has confirmed it (net.js → `peers`).
   Without that, a new state reached a second instance only by luck. */
const newBox = () => ({ id: Math.random().toString(36).slice(2, 8), rooms: new Map() })
const local = newBox()

/* > 0 when core `a` is newer than core `b`. */
export function newer(a, b) {
  return (a.g - b.g) || (a.v - b.v) || (a.h > b.h ? 1 : a.h < b.h ? -1 : 0)
}

const isObj = (x) => !!x && typeof x === 'object' && !Array.isArray(x)
const size = (x) => { try { return JSON.stringify(x).length } catch { return Infinity } }

function cleanCore(core, code) {
  if (!isObj(core)) return null
  if (core.room !== code || typeof core.id !== 'string' || core.id.length > 16) return null
  if (!Number.isInteger(core.g) || !Number.isInteger(core.v) || core.g < 1 || core.v < 1) return null
  if (typeof core.h !== 'string' || core.h.length > 16) return null
  return size(core) <= MAX_CORE ? core : null
}

function cleanEntry(entry, now) {
  if (!isObj(entry) || !isObj(entry.d)) return null
  // A counter is a clock reading (see net.js); one from the far future would
  // win every merge for ever, so it is refused rather than clamped.
  if (!Number.isFinite(entry.c) || entry.c < 0 || entry.c > now + 300_000) return null
  return size(entry.d) <= MAX_ENTRY ? { c: entry.c, d: entry.d } : null
}

function sweep(store, now) {
  for (const [code, rec] of store) if (now - rec.at > TTL) store.delete(code)
  // Oldest-touched first out, if a flood of rooms ever arrives.
  while (store.size > MAX_ROOMS) {
    let oldest = null
    for (const [code, rec] of store) if (!oldest || rec.at < store.get(oldest).at) oldest = code
    store.delete(oldest)
  }
}

/*
 * One exchange. `body` is what a phone sent:
 *   { r, me, have: [g, v, h] | null, core?, en: { pid: c }, e?: { pid: { c, d } }, seen?: { pid: t } }
 * and the reply is what it lacks:
 *   { now, have, core?, e?, want?: { core?, e? }, seen }      — or { now, none } / { now, clash }
 */
function exchange(box, body, now) {
  const store = box.rooms
  const reply = (json, status = 200) => ({ status, json: { ...json, i: box.id } })
  if (!isObj(body) || typeof body.r !== 'string' || !ROOM_RE.test(body.r)) return reply({ error: 'bad-request' }, 400)
  const code = body.r
  const me = typeof body.me === 'string' && PID_RE.test(body.me) ? body.me : null
  sweep(store, now)

  let rec = store.get(code)
  const offered = cleanCore(body.core, code)
  if (offered) {
    if (!rec) {
      rec = { core: offered, e: {}, seen: {}, at: now }
      store.set(code, rec)
    } else if (rec.core.id !== offered.id) {
      // Two different rooms picked the same code. The one already here stays.
      return reply({ now, clash: true })
    } else if (newer(offered, rec.core) > 0) {
      rec.core = offered
    }
  }

  const have = Array.isArray(body.have) ? { g: +body.have[0], v: +body.have[1], h: String(body.have[2]) } : null
  const theirs = isObj(body.en) ? body.en : {}

  if (!rec) {
    // Never heard of this room. If the phone has it, ask for all of it.
    return reply(have ? { now, none: true, want: { core: true, e: Object.keys(theirs).slice(0, MAX_ENTRIES) } } : { now, none: true })
  }

  rec.at = now
  if (isObj(body.e)) {
    for (const [pid, raw] of Object.entries(body.e)) {
      if (!PID_RE.test(pid)) continue
      const entry = cleanEntry(raw, now)
      if (!entry) continue
      const mine = rec.e[pid]
      if (!mine && Object.keys(rec.e).length >= MAX_ENTRIES) continue
      if (!mine || entry.c > mine.c) rec.e[pid] = entry
    }
  }
  if (isObj(body.seen)) {
    for (const [pid, t] of Object.entries(body.seen)) {
      if (rec.e[pid] && Number.isFinite(t) && t <= now && t > (rec.seen[pid] || 0)) rec.seen[pid] = t
    }
  }
  if (me) rec.seen[me] = now

  const out = { now, have: [rec.core.g, rec.core.v, rec.core.h], seen: rec.seen }
  const want = {}
  if (!have || newer(rec.core, have) > 0) out.core = rec.core
  else if (newer(have, rec.core) > 0) want.core = true

  const send = {}
  for (const [pid, entry] of Object.entries(rec.e)) {
    if (!(entry.c <= theirs[pid])) send[pid] = entry
  }
  const lacking = Object.keys(theirs).filter((pid) => PID_RE.test(pid) && Number.isFinite(theirs[pid]) && theirs[pid] > (rec.e[pid]?.c ?? -1))
  if (Object.keys(send).length) out.e = send
  if (lacking.length) want.e = lacking.slice(0, MAX_ENTRIES)
  if (want.core || want.e) out.want = want
  return reply(out)
}

export const handleRoom = (body, now = Date.now()) => exchange(local, body, now)

/* For the simulator only: a private mailbox with its own memory — a second
   "instance", which can also be made to forget everything, as a real one does
   when it is recycled. */
export function makeMailbox() {
  const box = newBox()
  return { handle: (body, now) => exchange(box, body, now), forget: () => box.rooms.clear(), peek: (code) => box.rooms.get(code) }
}
