/*
 * Helpers for writing the «اقرأ الرسم» charts in a deck (data/books/<slug>/game.js).
 * A chart there is plain data — see components/game/MiniChart.jsx for the
 * shape — and every coordinate is a fraction of the plot, 0 to 1, x rightwards
 * and y UPWARDS (as on paper; the component flips it for the screen).
 */

/* A curve as points: curve((x) => Math.exp(-3 * x)) → [[0, 1], …, [1, 0.05]].
   `from`/`to` limit it to part of the width (a line that stops at an event). */
export function curve(fn, { from = 0, to = 1, steps = 32 } = {}) {
  const out = []
  for (let i = 0; i <= steps; i++) {
    const x = from + ((to - from) * i) / steps
    out.push([x, Math.max(0, Math.min(1, fn(x)))])
  }
  return out
}

/* Straight segments through the given corners: steps, kinks, plateaus. */
export const poly = (...points) => points
