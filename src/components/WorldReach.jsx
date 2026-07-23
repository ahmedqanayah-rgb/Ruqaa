import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { club } from '../data/club.js'
import { WORLD_LAND } from '../data/worldLand.js'

/*
 * "From across the world" — an inline SVG world map (no mapping library, so the
 * site stays self-contained) showing where members join the weekly call from.
 *
 * Projection: plain equirectangular (plate carrée), windowed to the Eastern
 * hemisphere so the UK→Malaysia spread fills the frame. Points are placed by
 * real lat/lon; arcs bow from each to a single "call" hub. No flag emoji —
 * Windows renders those as letter pairs — so each location gets a palette
 * colour and its real name instead.
 */

const L = (ar, en) => ({ ar, en })

const VIEW = { lonMin: -20, lonMax: 125, latMin: -12, latMax: 62, W: 1000 }
const SCALE = VIEW.W / (VIEW.lonMax - VIEW.lonMin)
const H = Math.round((VIEW.latMax - VIEW.latMin) * SCALE)
const project = (lat, lon) => ({
  x: +((lon - VIEW.lonMin) * SCALE).toFixed(1),
  y: +((VIEW.latMax - lat) * SCALE).toFixed(1),
})
// The weekly call has no geography — a deliberate spot in clear "sky", away
// from every pin, so the arcs fan into it without landing on a country.
const HUB = { x: 440, y: 104 }

// Distinct, theme-aware colours from the club palette (one per location).
const COLORS = ['var(--accent)', 'var(--blue)', 'var(--violet)', 'var(--cool)', 'var(--warm)', 'var(--success)']

// Quadratic arc from a point to the hub, bowed consistently to one side.
function arcPath(p, hub, bow = 0.16) {
  const mx = (p.x + hub.x) / 2, my = (p.y + hub.y) / 2
  const dx = hub.x - p.x, dy = hub.y - p.y
  const len = Math.hypot(dx, dy) || 1
  const cx = mx + (-dy / len) * len * bow
  const cy = my + (dx / len) * len * bow
  return `M ${p.x} ${p.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${hub.x} ${hub.y}`
}

export default function WorldReach() {
  const { t } = useApp()
  const reach = club.reach
  const [active, setActive] = useState(null)   // hovered/focused location code

  const pts = useMemo(
    () => (reach?.locations || []).map((loc, i) => ({ ...loc, ...project(loc.lat, loc.lon), color: COLORS[i % COLORS.length] })),
    [reach]
  )

  // Graticule + dot lattice, purely decorative "map" texture.
  const grat = useMemo(() => {
    const v = [], h = [], dots = []
    for (let lon = VIEW.lonMin; lon <= VIEW.lonMax; lon += 20) v.push(+((lon - VIEW.lonMin) * SCALE).toFixed(1))
    for (let lat = VIEW.latMin; lat <= VIEW.latMax; lat += 15) h.push(+((VIEW.latMax - lat) * SCALE).toFixed(1))
    v.forEach((x) => h.forEach((y) => dots.push({ x, y })))
    return { v, h, dots }
  }, [])

  if (!reach || !pts.length) return null

  const activePt = pts.find((p) => p.code === active) || null
  const pick = (code) => setActive((c) => (c === code ? null : code))

  return (
    <section className="reach">
      <div className="reach-head">
        <h2>{t(L('نقرأ معاً… من كلّ العالم', 'We read together… from across the world'))}</h2>
        <p className="reach-sub">
          {t(reach.meeting)} · <b>{pts.length}</b> {t(L('دول', 'countries'))}
        </p>
      </div>

      <div className="reach-mapwrap">
        <svg
          className="reach-map"
          viewBox={`0 0 ${VIEW.W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={t(L(
            `خريطة تُظهر أعضاء النادي في ${pts.length} دول متّصلين بجلسةٍ أسبوعية واحدة`,
            `Map showing club members across ${pts.length} countries connected to one weekly session`
          ))}
        >
          <defs>
            <filter id="reachGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <g className="reach-grat">
            {grat.v.map((x, i) => <line key={`v${i}`} x1={x} y1="0" x2={x} y2={H} />)}
            {grat.h.map((y, i) => <line key={`h${i}`} x1="0" y1={y} x2={VIEW.W} y2={y} />)}
          </g>
          <g className="reach-dots">
            {grat.dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="2.1" />)}
          </g>

          {/* Real continent silhouette (baked from world-atlas by scripts/gen-world.mjs). */}
          <path className="reach-land" d={WORLD_LAND} />

          <g className="reach-arcs">
            {pts.map((p) => (
              <path
                key={p.code}
                d={arcPath(p, HUB)}
                className={`reach-arc ${active ? (active === p.code ? 'on' : 'dim') : ''}`}
                style={{ stroke: p.color }}
              />
            ))}
          </g>

          <g className="reach-hub" transform={`translate(${HUB.x} ${HUB.y})`}>
            <circle className="reach-hub-halo" r="24" />
            <circle className="reach-hub-ring" r="12" />
            <circle className="reach-hub-core" r="6" />
            <text className="reach-hub-label" y="-30" textAnchor="middle">
              {t(L('جلسة رُقعة الأسبوعية', 'Ruqʿa’s weekly session'))}
            </text>
          </g>

          {pts.map((p) => (
            <g
              key={p.code}
              className={`reach-pin ${active && active !== p.code ? 'dim' : ''} ${active === p.code ? 'on' : ''}`}
              transform={`translate(${p.x} ${p.y})`}
              style={{ '--c': p.color }}
              tabIndex={0}
              role="button"
              aria-label={t(p.country)}
              onMouseEnter={() => setActive(p.code)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p.code)}
              onBlur={() => setActive(null)}
              onClick={() => pick(p.code)}
            >
              <circle className="reach-pin-glow" r="12" filter="url(#reachGlow)" />
              <circle className="reach-pin-dot" r="5.5" />
            </g>
          ))}

          {/* Single label for the active pin — one at a time, so nothing overlaps. */}
          {activePt && (
            <text
              className="reach-tip"
              x={activePt.x}
              y={activePt.y + (activePt.y < 130 ? 26 : -16)}
              textAnchor="middle"
              style={{ fill: activePt.color }}
            >
              {t(activePt.country)}
            </text>
          )}
        </svg>
      </div>

      <ul className="reach-legend">
        {pts.map((p) => (
          <li
            key={p.code}
            className={`reach-leg ${active === p.code ? 'on' : ''}`}
            style={{ '--c': p.color }}
            tabIndex={0}
            role="button"
            aria-pressed={active === p.code}
            aria-label={t(p.country)}
            onMouseEnter={() => setActive(p.code)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.code)}
            onBlur={() => setActive(null)}
            onClick={() => pick(p.code)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(p.code) }
            }}
          >
            <span className="reach-leg-dot" aria-hidden />
            <span className="reach-leg-txt">
              <b>{t(p.country)}</b>
            </span>
          </li>
        ))}
      </ul>

      <p className="reach-note muted">
        {t(L(
          'حين تبدأ الجلسة، يكون الوقت مختلفاً عند كلٍّ منّا — لكنّنا نفتح الكتاب نفسه في اللحظة نفسها.',
          'When the session starts the clock reads differently for each of us — yet we open the same book at the same moment.'
        ))}
      </p>
    </section>
  )
}
