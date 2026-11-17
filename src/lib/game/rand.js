/*
 * Seeded randomness. Everything the game leaves to chance — the die, which card
 * is drawn, the order of the options, where the sheep jump — is computed from
 * the room's seed, never from Math.random. Six phones must roll the same die
 * and see the same sheep, and they can only do that if "random" is a function
 * of something they all hold.
 */
export function hash32(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/* mulberry32 — small, fast, and plenty for a board game. */
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* A generator named by its purpose: seeded(roomSeed, turn, 'die'). */
export const seeded = (...keys) => rng(hash32(keys.join('|')))

export function shuffled(list, rand) {
  const a = list.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const range = (n) => Array.from({ length: n }, (_, i) => i)
