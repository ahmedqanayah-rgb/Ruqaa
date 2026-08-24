/* Fisher–Yates on a copy — never in place, since both callers shuffle a
   module-level array that must stay in its authored order for everyone else.
   Unseeded on purpose: this is for variety, not reproducibility, so there is no
   state to keep anywhere (and the project keeps none — no storage, ever). */
export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
