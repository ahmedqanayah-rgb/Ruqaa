/*
 * Two dice and a trail of board squares — the game's mark, drawn rather than
 * shipped as an image so it costs nothing to download and follows the theme.
 *
 * Decorative (aria-hidden): wherever it appears, the words beside it say what
 * it is. `dir="ltr"`-proof by construction — it is a picture, and a picture of
 * a die must not mirror its pips when the page turns right-to-left.
 */
const PIPS = {
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
}

function Die({ x, y, size, turn, face, className }) {
  const r = size * 0.19
  const step = size * 0.26
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`} className={className}>
      <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={r} className="dice-art-body" />
      {PIPS[face].map(([px, py], i) => (
        <circle key={i} cx={px * step} cy={py * step} r={size * 0.075} className="dice-art-pip" />
      ))}
    </g>
  )
}

export default function DiceArt({ className = '' }) {
  return (
    <svg className={`dice-art ${className}`} viewBox="0 0 220 160" aria-hidden focusable="false">
      {/* the trail: board squares curving away behind the dice */}
      {[[20, 132, 0.5], [50, 140, 0.65], [82, 142, 0.8], [200, 30, 0.5], [176, 16, 0.4]].map(([x, y, o], i) => (
        <rect key={i} x={x - 11} y={y - 11} width="22" height="22" rx="6" className="dice-art-tile" opacity={o} />
      ))}
      <Die x={78} y={74} size={84} turn={-14} face={5} className="dice-art-a" />
      <Die x={154} y={96} size={62} turn={16} face={3} className="dice-art-b" />
    </svg>
  )
}
