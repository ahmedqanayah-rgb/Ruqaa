import { useApp } from '../../context/AppContext.jsx'

/*
 * A small chart for the game's «اقرأ الرسم» rounds — hand-rolled SVG.
 *
 * NOT recharts, on purpose: that library is a ~105 kB chunk the game would then
 * drag in for a dozen pictures of two lines each (the same reasoning as the
 * flow figures — see CLAUDE.md, "Bundle splitting").
 *
 * A chart is DATA, written in a book's game.js:
 *   {
 *     x: { label, ticks: [..], hide },     y: { label, hide },
 *     lines:  [{ pts: [[x, y], …], tone: 'a' | 'b' | 'c', dash }],
 *     bars:   [{ v, label, show, tone }],
 *     stack:  { labels: [..], series: [{ tone, vals: [..] }] },
 *     band:   [[x, y], …],                 a shaded region
 *     marks:  [{ x, label }],              a dashed upright line at x
 *     notes:  [{ x, y, text }],            words inside the plot
 *     ask:    [x, y],                      a "?" where the line stops
 *   }
 * Every coordinate is a fraction of the plot, y UPWARDS. `hide: true` on an
 * axis prints «؟» where its name would be — that is the question.
 *
 * `small` is the chart as an ANSWER (one of four tiles): no words at all, just
 * the shape, drawn heavier.
 *
 * A chart is not a sentence: time runs left to right in both languages, so the
 * drawing is laid out left to right — `direction: ltr` on the <svg> itself.
 * (The HTML `dir` attribute does nothing on an SVG element: the page's RTL
 * direction was inherited, and every `text-anchor` flipped — the y-axis name
 * ran off the left edge of the chart in Arabic.) Arabic words inside still
 * render right to left; only where a label STARTS stays put.
 */
const TONES = { a: 'var(--gm-ch-a)', b: 'var(--gm-ch-b)', c: 'var(--gm-ch-c)' }

export default function MiniChart({ spec, small = false }) {
  const { t } = useApp()
  const W = 320
  const H = small ? 180 : 210
  const box = small ? { l: 14, r: 306, top: 12, b: 166 } : { l: 26, r: 308, top: 30, b: 166 }
  const px = (x) => box.l + x * (box.r - box.l)
  const py = (y) => box.b - y * (box.b - box.top)
  const label = (v) => (v == null ? '' : typeof v === 'string' ? v : t(v))
  const words = {}

  const bars = spec.bars || []
  const slot = bars.length ? (box.r - box.l) / bars.length : 0
  const stack = spec.stack
  const col = stack ? (box.r - box.l) / stack.labels.length : 0

  return (
    <svg className={`gm-chart ${small ? 'is-small' : ''}`} viewBox={`0 0 ${W} ${H}`} style={{ direction: 'ltr' }} role="img" aria-hidden>
      {spec.band && <polygon points={spec.band.map(([x, y]) => `${px(x)},${py(y)}`).join(' ')} fill={TONES.b} opacity="0.22" />}

      {bars.map((bar, i) => {
        const x = box.l + slot * i + slot * 0.2
        const h = (box.b - box.top) * bar.v
        return (
          <g key={i}>
            <rect x={x} y={box.b - h} width={slot * 0.6} height={h} rx="5" fill={TONES[bar.tone || 'a']} />
            {!small && bar.show && <text x={x + slot * 0.3} y={box.b - h - 6} textAnchor="middle" className="gm-chart-num">{label(bar.show)}</text>}
            {!small && bar.label && <text x={x + slot * 0.3} y={box.b + 16} textAnchor="middle" className="gm-chart-tick" {...words}>{label(bar.label)}</text>}
          </g>
        )
      })}

      {stack && stack.labels.map((name, i) => {
        let base = 0
        const x = box.l + col * i + col * 0.16
        return (
          <g key={i}>
            {stack.series.map((series, k) => {
              const h = (box.b - box.top) * series.vals[i]
              const y = box.b - (box.b - box.top) * base - h
              base += series.vals[i]
              return <rect key={k} x={x} y={y} width={col * 0.68} height={Math.max(0, h - 1.5)} rx="3" fill={TONES[series.tone]} />
            })}
            {!small && <text x={x + col * 0.34} y={box.b + 16} textAnchor="middle" className="gm-chart-tick" {...words}>{label(name)}</text>}
          </g>
        )
      })}

      {(spec.marks || []).map((mark, i) => (
        <g key={i}>
          <line x1={px(mark.x)} x2={px(mark.x)} y1={box.top - 4} y2={box.b} className="gm-chart-mark" />
          {!small && mark.label && <text x={px(mark.x)} y={box.top - 9} textAnchor="middle" className="gm-chart-tick is-strong" {...words}>{label(mark.label)}</text>}
        </g>
      ))}

      {(spec.lines || []).map((line, i) => (
        <polyline key={i} points={line.pts.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(' ')}
          fill="none" stroke={TONES[line.tone || 'a']} strokeWidth={small ? 5 : 3.5}
          strokeLinecap="round" strokeLinejoin="round" strokeDasharray={line.dash ? '2 9' : undefined} />
      ))}

      {spec.ask && (
        <g>
          <circle cx={px(spec.ask[0])} cy={py(spec.ask[1])} r="13" className="gm-chart-ask" />
          <text x={px(spec.ask[0])} y={py(spec.ask[1]) + 5} textAnchor="middle" className="gm-chart-askmark">?</text>
        </g>
      )}

      {!small && (spec.notes || []).map((note, i) => (
        <text key={i} x={px(note.x)} y={py(note.y)} textAnchor="middle" className="gm-chart-note" {...words}>{label(note.text)}</text>
      ))}

      {/* the axes */}
      <path d={`M${box.l} ${box.top - 4}V${box.b}H${box.r}`} className="gm-chart-axis" />
      {!small && (spec.x?.ticks || []).map((tick, i, all) => (
        <text key={i} x={px(all.length === 1 ? 0.5 : i / (all.length - 1))} y={box.b + 16} textAnchor="middle" className="gm-chart-tick" {...words}>{label(tick)}</text>
      ))}
      {!small && spec.y && (
        <text x={box.l - 2} y={14} textAnchor="start" className={`gm-chart-label ${spec.y.hide ? 'is-q' : ''}`} {...words}>
          {spec.y.hide ? '↑ ؟' : `↑ ${label(spec.y.label)}`}
        </text>
      )}
      {!small && spec.x && (spec.x.label || spec.x.hide) && (
        <text x={box.r} y={H - 8} textAnchor="end" className={`gm-chart-label ${spec.x.hide ? 'is-q' : ''}`} {...words}>
          {spec.x.hide ? '؟ →' : `${label(spec.x.label)} →`}
        </text>
      )}
    </svg>
  )
}
