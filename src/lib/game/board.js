/*
 * THE BOARDS: one painted board per book, thirty-six squares on a winding road
 * each, and a game's boards joined into one long road — the books in play, in
 * the registry's order. With all three the road is 108 squares: the valley of
 * sleep, then the city of distraction, then the island market, and the first to
 * the end of the last board wins. The screen shows one board at a time and
 * slides on to the next as the play moves up (components/game/Board.jsx).
 *
 * ONE FILE DECIDES WHERE THE ROAD RUNS, and three things read it:
 *   • the engine — what kind of square a token has landed on (`typeAt`), and
 *     whose board it is on (`boardOf`);
 *   • the board on screen (components/game/Board.jsx) — where each square and
 *     token is drawn (`pathPoints`);
 *   • scripts/generate-game-board.mjs — the layout sketch each painting is
 *     painted over, so the painted road runs under the squares by construction.
 * Move a control point here and the art must be painted again, or the squares
 * will float off the road.
 *
 * Pure: no React, no DOM.
 */

/* What each square of a board is. S start · K a question from the board's book
   · L the lab (a mini-game) · B bluff · C chance · D dare · F finish. Only the
   very first square of the road is a start and only the very last a finish; on
   the boards in between, those two squares are questions like any other
   (`typeAt`). The run before the finish ends on a chance card on purpose: the
   last square should be able to take the lead away. */
export const TYPES = 'S' + 'KKCKLKBKDLK' + 'KCKLKBKDKCLK' + 'KLKCKBKDLKC' + 'F'
export const SQUARES = TYPES.length

export const boardOf = (pos) => Math.floor(Math.max(0, pos) / SQUARES)
export const squareOf = (pos) => Math.max(0, pos) % SQUARES
/* The last square of a road of `boards` boards — the finish. */
export const lastOf = (boards) => Math.max(1, boards) * SQUARES - 1

export function typeAt(pos, boards) {
  if (pos <= 0) return 'S'
  if (pos >= lastOf(boards)) return 'F'
  const t = TYPES[squareOf(pos)]
  return t === 'S' || t === 'F' ? 'K' : t
}

/* Each picture is 3 wide by 4 tall — whole on a phone held upright, with room
   left above and below for the players and the die. */
export const ASPECT = 3 / 4

/* The road, as points it passes through. x and y are fractions of the picture
   (y downwards). Five runs, right-left-right, climbing; each run wavers a
   little so the road reads as a road and not a ruled line. It starts at the
   bottom left and ends at the top right. */
const CONTROL = [
  [0.12, 0.915], [0.36, 0.895], [0.62, 0.925], [0.84, 0.895],
  [0.915, 0.805],
  [0.84, 0.715], [0.60, 0.735], [0.38, 0.70], [0.17, 0.725],
  [0.085, 0.625],
  [0.17, 0.525], [0.40, 0.545], [0.63, 0.51], [0.84, 0.535],
  [0.915, 0.435],
  [0.84, 0.335], [0.61, 0.355], [0.39, 0.32], [0.17, 0.345],
  [0.085, 0.245],
  [0.17, 0.15], [0.40, 0.168], [0.64, 0.132], [0.86, 0.112],
]

/* Every other book's board is painted over the same road MIRRORED, so it starts
   at the bottom right and ends at the top left: one board's exit then sits
   right under the next one's entry when the view slides up between them (in
   the club's order, sleep → focus → economy). `art` is the book's place in the
   registry, which is what its painting was painted for. */
export const mirrored = (art) => art % 2 === 1

/* A Catmull-Rom curve through the control points, sampled densely. */
function dense(pts, perSegment = 28) {
  const at = (i) => pts[Math.max(0, Math.min(pts.length - 1, i))]
  const out = []
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    for (let s = 0; s < perSegment; s++) {
      const t = s / perSegment
      const t2 = t * t
      const t3 = t2 * t
      const axis = (k) => 0.5 * (
        2 * p1[k] + (-p0[k] + p2[k]) * t +
        (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
        (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3
      )
      out.push([axis(0), axis(1)])
    }
  }
  out.push(pts[pts.length - 1])
  return out
}

const cache = {}
function measured(flip) {
  const key = flip ? 1 : 0
  if (cache[key]) return cache[key]
  const line = dense(flip ? CONTROL.map(([x, y]) => [1 - x, y]) : CONTROL)
  // Lengths in units of the picture's WIDTH: a step in y is 1/ASPECT as long.
  const along = [0]
  for (let i = 1; i < line.length; i++) {
    const dx = line[i][0] - line[i - 1][0]
    const dy = (line[i][1] - line[i - 1][1]) / ASPECT
    along.push(along[i - 1] + Math.hypot(dx, dy))
  }
  cache[key] = { line, along, total: along[along.length - 1] }
  return cache[key]
}

/* The road itself, for drawing: [[x, y], …]. */
export const pathLine = (flip = false) => measured(flip).line

/* Where a board's squares sit: SQUARES points evenly spaced ALONG its road. */
export function pathPoints(flip = false, count = SQUARES) {
  const { line, along, total } = measured(flip)
  const out = []
  let j = 0
  for (let i = 0; i < count; i++) {
    const want = (total * i) / (count - 1)
    while (j < along.length - 2 && along[j + 1] < want) j++
    const span = along[j + 1] - along[j] || 1
    const f = Math.max(0, Math.min(1, (want - along[j]) / span))
    out.push({ x: line[j][0] + (line[j + 1][0] - line[j][0]) * f, y: line[j][1] + (line[j + 1][1] - line[j][1]) * f })
  }
  return out
}

/* The distance between two neighbouring squares, as a fraction of the width —
   what the size of a square and a token is derived from. (A mirror image has
   the same length.) */
export const stepSize = () => measured(false).total / (SQUARES - 1)
