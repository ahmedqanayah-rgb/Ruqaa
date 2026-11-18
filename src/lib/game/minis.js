import { seeded } from './rand.js'

/*
 * THE LAB — the mini-games, as rules. (How each one looks and is played is
 * components/game/Minis.jsx; this file is the part every phone must agree on.)
 *
 * A mini-game is played by everyone at once, each on their own phone, on the
 * same clock. So nothing in it may be random per phone: the sheep that jump,
 * the digits to remember and the colours of the words all come out of the
 * challenge's seed, through the plans below — and the engine reads the same
 * plan to mark the answers.
 *
 * Each belongs to a book (`zone` is the book's place in the registry — the
 * name is from when one board held all three books), because each is its
 * book's idea made playable; a Lab square plays any of tonight's books' games:
 *   the valley (Why We Sleep)   count the sheep · the vigilance test sleep labs
 *                               use · the digits a rested memory keeps
 *   the city (Stolen Focus)     the Stroop conflict · finding one thing among
 *                               many — both from the book's own Focus Lab
 *   the market (Varoufakis)     Rousseau's stag hunt · an auction for the
 *                               armour of Achilles
 * The last two are not tests of anything but each other, which is the point of
 * that book: what you should do depends on what you expect everyone else to do.
 *
 * `dur` is the whole challenge in milliseconds (its `brief` included); `min`
 * the fewest players it makes sense with.
 */
/* Each real-time game opens with a few seconds of "how to play" before its
   clock starts: nobody should lose a round to reading the rules. */
export const BRIEF = 3500

export const MINIS = [
  { id: 'sheep', zone: 0, brief: BRIEF, dur: BRIEF + 14000 + 9000, min: 1 },
  { id: 'reflex', zone: 0, brief: BRIEF, dur: BRIEF + 20000, min: 1 },
  { id: 'memory', zone: 0, brief: BRIEF, dur: BRIEF + 7000 + 11000, min: 1 },
  { id: 'stroop', zone: 1, brief: BRIEF, dur: BRIEF + 18000, min: 1 },
  { id: 'search', zone: 1, brief: BRIEF, dur: BRIEF + 20000, min: 1 },
  { id: 'stag', zone: 2, brief: 0, dur: 16000, min: 2 },
  { id: 'auction', zone: 2, brief: 0, dur: 18000, min: 2 },
]
export const miniById = (id) => MINIS.find((m) => m.id === id)

/* ---- count the sheep ----
   For SHEEP_SHOW ms animals cross the field, singly and in bursts. Some are
   wolves. Then: how many SHEEP? */
export const SHEEP_SHOW = 14000
export function sheepPlan(seed) {
  const rand = seeded(seed, 'sheep')
  const animals = []
  let t = 500
  while (t < SHEEP_SHOW - 2300) {
    const burst = rand() < 0.3 ? (rand() < 0.35 ? 3 : 2) : 1
    for (let k = 0; k < burst; k++) {
      animals.push({
        at: Math.round(t + k * (140 + rand() * 220)),
        lane: Math.floor(rand() * 3),
        ms: Math.round(1500 + rand() * 900),
        wolf: rand() < 0.22,
      })
    }
    t += 550 + rand() * 1100
  }
  return { animals, count: animals.filter((a) => !a.wolf).length }
}

/* ---- the vigilance test ----
   Four waits of unequal length; tap the moment the signal comes. A tap before
   it costs REFLEX.early; no tap within REFLEX.limit counts as the limit. */
export const REFLEX = { trials: 4, limit: 1200, pause: 700, early: 1000 }
export function reflexPlan(seed) {
  const rand = seeded(seed, 'reflex')
  return Array.from({ length: REFLEX.trials }, () => Math.round(1000 + rand() * 2000))
}

/* ---- the digits ---- shown one at a time, then typed back in order. */
export const MEMORY = { digits: 8, each: 750, lead: 900 }
export function memoryDigits(seed) {
  const rand = seeded(seed, 'memory')
  const out = []
  while (out.length < MEMORY.digits) {
    const d = Math.floor(rand() * 10)
    if (d !== out[out.length - 1]) out.push(d)
  }
  return out
}

/* ---- Stroop ---- a colour's NAME printed in another colour's INK; tap the
   ink. Three in four disagree, and no trial repeats the one before it. */
export const STROOP_COLORS = ['red', 'blue', 'green', 'yellow']
export function stroopTrials(seed, count = 48) {
  const rand = seeded(seed, 'stroop')
  const out = []
  while (out.length < count) {
    const word = Math.floor(rand() * 4)
    const ink = rand() < 0.75 ? (word + 1 + Math.floor(rand() * 3)) % 4 : word
    const prev = out[out.length - 1]
    if (!prev || prev.word !== word || prev.ink !== ink) out.push({ word, ink })
  }
  return out
}

/* ---- find the one ---- a grid of arrows; exactly one points UP (0). */
export const SEARCH = { rounds: 8, cols: 5, rows: 4 }
export function searchRounds(seed) {
  const rand = seeded(seed, 'search')
  const cells = SEARCH.cols * SEARCH.rows
  return Array.from({ length: SEARCH.rounds }, () => {
    const target = Math.floor(rand() * cells)
    return { target, dirs: Array.from({ length: cells }, (_, i) => (i === target ? 0 : 1 + Math.floor(rand() * 3))) }
  })
}

/* ---- the auction ---- */
export const AUCTION = { prize: 5, max: 4 }
/* ---- the stag hunt ---- */
export const STAG = { together: 3, hare: 1 }

/*
 * Mark one player's result. `raw` is what their phone reported; a phone can
 * report anything, so each kind is checked and clamped. Returns
 * { score, show } — `score` orders the players (greater is better), `show` is
 * the number put next to their name — or null for "took no part".
 */
export function miniScore(id, raw, seed) {
  switch (id) {
    case 'sheep': {
      const guess = Math.round(Number(raw))
      if (!Number.isFinite(guess) || guess < 0 || guess > 99) return null
      return { score: -Math.abs(guess - sheepPlan(seed).count), show: guess }
    }
    case 'reflex': {
      const ms = Number(raw)
      if (!Number.isFinite(ms) || ms < 60 || ms > 5000) return null
      return { score: -Math.round(ms), show: Math.round(ms) }
    }
    case 'memory': {
      const typed = String(raw ?? '').replace(/\D/g, '').slice(0, MEMORY.digits)
      const digits = memoryDigits(seed)
      let hits = 0
      for (let i = 0; i < typed.length; i++) if (Number(typed[i]) === digits[i]) hits += 1
      return hits > 0 ? { score: hits, show: hits } : null
    }
    case 'stroop':
    case 'search': {
      const n = Math.round(Number(raw))
      if (!Number.isFinite(n) || n <= 0 || n > 999) return null
      return { score: n, show: n }
    }
    default:
      return null
  }
}

/* What a place is worth, by how many are playing. Equal scores share a place. */
export function rankAwards(players) {
  return players >= 4 ? [3, 2, 1] : players === 3 ? [2, 1] : [2]
}
