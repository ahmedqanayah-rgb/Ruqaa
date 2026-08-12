import { useId } from 'react'
import { coverArt } from '../data/coverArt.js'

/*
 * Draws a book cover as vector parts, to be warped onto the photographed cloth
 * book in the hero. See src/data/coverArt.js for the recipes and for why the
 * cover image itself is deliberately not used here.
 *
 * Everything is one inline SVG in the source cover's pixel space, stretched to
 * fill the quad (preserveAspectRatio="none"). Being vector rather than a bitmap
 * is what keeps the title legible: the book renders about 390px wide on a
 * desktop and 110px on a phone, and text stays sharp at both.
 */

/* Deterministic star field — a seeded PRNG rather than Math.random, so the sky
 * doesn't reshuffle on every render. */
function stars(count, seed, w, h) {
  let s = seed * 9301 + 49297
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
  return Array.from({ length: count }, () => ({
    x: rnd() * w, y: rnd() * h, r: 0.4 + rnd() * 1.2, o: 0.25 + rnd() * 0.7,
  }))
}

export default function HeroCoverArt({ bookId, lang }) {
  const uid = useId().replace(/:/g, '')
  const book = coverArt[bookId]
  // Each language is its own layout — the editions are different covers, not
  // translations of one design. Fall back to English for a language with no
  // layout of its own rather than rendering nothing.
  const recipe = book && (book[lang] || book.en)
  if (!recipe) return null

  const [W, H] = recipe.view
  const lines = recipe.text
  // The display type on the Stolen Focus cover runs UNDER the orb. Drawing it
  // first would hide it completely behind an opaque disc, so those lines are
  // flagged `behind` and drawn before the art, dimmed the way overprinting
  // looks on the real cover.
  const behind = lines.filter((l) => l.behind)
  const front = lines.filter((l) => !l.behind)

  const renderText = (l, i) => (
    <text
      key={i}
      x={l.x} y={l.y}
      textAnchor="middle"
      fill={l.fill || '#ffffff'}
      fontFamily={l.font}
      fontSize={l.size}
      fontWeight={l.weight}
      letterSpacing={l.track || 0}
      opacity={l.behind ? 0.55 : 1}
      direction={/[؀-ۿ]/.test(l.s) ? 'rtl' : 'ltr'}
    >{l.s}</text>
  )

  return (
    <svg className="hero-cover-art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden focusable="false">
      <defs>
        {recipe.art.filter((a) => a.type === 'orb').map((a, i) => (
          <linearGradient key={i} id={`${uid}-orb${i}`} gradientTransform={`rotate(${a.angle || 0} 0.5 0.5)`}>
            {a.stops.map(([off, col], j) => <stop key={j} offset={off} stopColor={col} />)}
          </linearGradient>
        ))}
      </defs>

      {behind.map(renderText)}

      {recipe.art.map((a, i) => {
        if (a.type === 'orb') return <circle key={i} cx={a.cx} cy={a.cy} r={a.r} fill={`url(#${uid}-orb${i})`} />
        if (a.type === 'moon') return (
          // Crescent by subtraction: a filled disc with a second disc punched
          // out of it, offset. Cheaper and cleaner than hand-fitting a path.
          <g key={i}>
            <mask id={`${uid}-moon${i}`}>
              <rect x="0" y="0" width={W} height={H} fill="#fff" />
              <circle cx={a.cx + a.r * 0.55} cy={a.cy - a.r * 0.35} r={a.r * 0.92} fill="#000" />
            </mask>
            <circle cx={a.cx} cy={a.cy} r={a.r} fill={a.fill} mask={`url(#${uid}-moon${i})`} />
          </g>
        )
        if (a.type === 'stars') return (
          <g key={i}>
            {stars(a.count, a.seed, W, H).map((p, j) => (
              <circle key={j} cx={p.x} cy={p.y} r={p.r} fill={a.fill} opacity={p.o} />
            ))}
          </g>
        )
        if (a.type === 'cutout') return (
          <image key={i} href={a.src} x={a.x} y={a.y} width={a.w} height={a.h} preserveAspectRatio="none" />
        )
        return null
      })}

      {front.map(renderText)}
    </svg>
  )
}
