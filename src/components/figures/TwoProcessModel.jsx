import { useMemo, useState, useRef } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import FigureFrame from './FigureFrame.jsx'
import { ui } from '../../data/ui.js'
import { simulate, DEFAULTS } from './twoProcessSim.js'

const L = (ar, en) => ({ ar, en })
const W = 720, H = 320, PAD = { l: 46, r: 20, t: 22, b: 42 }
const IW = W - PAD.l - PAD.r, IH = H - PAD.t - PAD.b

function build(points, start, end) {
  const x = (t) => PAD.l + ((t - start) / (end - start)) * IW
  const y = (v) => PAD.t + (1 - v / 1.15) * IH
  const path = (key) => points.map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)},${y(p[key]).toFixed(1)}`).join(' ')
  return { x, y, path }
}

/* Shaded night bands (asleep intervals) */
function NightBands({ points, x }) {
  const bands = []
  let s = null
  points.forEach((p, i) => {
    if (p.asleep && s === null) s = p.t
    if ((!p.asleep || i === points.length - 1) && s !== null) {
      bands.push([s, p.t]); s = null
    }
  })
  return bands.map(([a, b], i) => (
    <rect key={i} x={x(a)} y={PAD.t} width={Math.max(0, x(b) - x(a))} height={IH}
      fill="var(--blue-soft)" opacity="0.6" />
  ))
}

function Slider({ label, value, min, max, step, onChange, fmt }) {
  const { t } = useApp()
  return (
    <label className="tp-control">
      <span className="tp-label">{t(label)}<b>{fmt ? fmt(value) : value}</b></span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
    </label>
  )
}

export function TwoProcessModel() {
  const { t } = useApp()
  const [cfg, setCfg] = useState({ ...DEFAULTS })
  const [hover, setHover] = useState(null)
  const svgRef = useRef(null)
  const set = (k) => (v) => setCfg((c) => ({ ...c, [k]: v }))

  const sim = useMemo(() => simulate(cfg), [cfg])
  const { x, y, path } = useMemo(() => build(sim.points, sim.start, sim.end), [sim])

  const onMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const tt = sim.start + ((px - PAD.l) / IW) * (sim.end - sim.start)
    const nearest = sim.points.reduce((a, b) => (Math.abs(b.t - tt) < Math.abs(a.t - tt) ? b : a))
    setHover(nearest)
  }

  const hourTicks = []
  for (let tt = Math.ceil(sim.start); tt <= sim.end; tt += 6) hourTicks.push(tt)

  return (
    <FigureFrame number="4–6"
      title={L('نموذج العمليتين: الإيقاع اليومي وضغط النوم', 'Two-process model: circadian rhythm & sleep pressure')}
      caption={L('الفجوة بين المنحنيين = مقدار النعاس. مرّر المؤشّر لقياسها عند أي لحظة، وعدّل المدخلات لترى أثرها.',
                 'The gap between the curves = your sleepiness. Hover to measure it at any moment, and adjust the inputs to see the effect.')}>
      <div dir="ltr" style={{ overflowX: 'auto' }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="tp-svg"
          onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <NightBands points={sim.points} x={x} />
          {/* axes */}
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + IH} stroke="var(--border-strong)" />
          <line x1={PAD.l} y1={PAD.t + IH} x2={PAD.l + IW} y2={PAD.t + IH} stroke="var(--border-strong)" />
          {hourTicks.map((tt, i) => (
            <g key={i}>
              <line x1={x(tt)} y1={PAD.t + IH} x2={x(tt)} y2={PAD.t + IH + 5} stroke="var(--border-strong)" />
              <text x={x(tt)} y={PAD.t + IH + 20} textAnchor="middle" fontSize="11" fill="var(--text-muted)">
                {String(Math.round(((tt % 24) + 24) % 24)).padStart(2, '0')}:00
              </text>
            </g>
          ))}
          {/* curves */}
          <path d={path('C')} fill="none" stroke="var(--chart-c)" strokeWidth="2.5" strokeDasharray="6 4" />
          <path d={path('Seff')} fill="none" stroke="var(--chart-s)" strokeWidth="2.75" />
          {/* hover crosshair + gap bracket */}
          {hover && (
            <g>
              <line x1={x(hover.t)} y1={PAD.t} x2={x(hover.t)} y2={PAD.t + IH} stroke="var(--text-muted)" strokeDasharray="3 3" />
              <line x1={x(hover.t)} y1={y(hover.Seff)} x2={x(hover.t)} y2={y(hover.C)} stroke="var(--danger)" strokeWidth="3" />
              <circle cx={x(hover.t)} cy={y(hover.Seff)} r="4" fill="var(--chart-s)" />
              <circle cx={x(hover.t)} cy={y(hover.C)} r="4" fill="var(--chart-c)" />
            </g>
          )}
          {/* legend */}
          <g fontSize="12">
            <rect x={PAD.l + 6} y={PAD.t + 2} width="14" height="3" fill="var(--chart-s)" />
            <text x={PAD.l + 24} y={PAD.t + 7} fill="var(--text-soft)">S — {t(L('ضغط النوم', 'sleep pressure'))}</text>
            <rect x={PAD.l + 170} y={PAD.t + 2} width="14" height="3" fill="var(--chart-c)" />
            <text x={PAD.l + 188} y={PAD.t + 7} fill="var(--text-soft)">C — {t(L('الإيقاع اليومي', 'circadian'))}</text>
          </g>
        </svg>
      </div>

      <div className="tp-readout">
        {hover ? (
          <span>
            {t(L('الساعة', 'Time'))} <b>{String(Math.round(hover.hour)).padStart(2, '0')}:00</b> —{' '}
            {t(L('الفجوة (النعاس)', 'Gap (sleepiness)'))}: <b style={{ color: 'var(--danger)' }}>{Math.max(0, hover.gap).toFixed(2)}</b>{' '}
            {hover.gap > 0.45 ? t(L('· دافع قوي للنوم', '· strong drive to sleep')) :
             hover.gap < 0.1 ? t(L('· دافع لليقظة', '· drive to wakefulness')) : ''}
          </span>
        ) : (
          <span className="hint">{t(ui.labels.hover)}</span>
        )}
      </div>

      <div className="tp-controls">
        <Slider label={L('موعد النوم', 'Bedtime')} value={cfg.bedtime} min={20} max={28} step={0.5} onChange={set('bedtime')}
          fmt={(v) => ` ${String(Math.round(((v % 24) + 24) % 24)).padStart(2, '0')}:${v % 1 ? '30' : '00'}`} />
        <Slider label={L('موعد الاستيقاظ', 'Wake-up')} value={cfg.wake} min={4} max={11} step={0.5} onChange={set('wake')}
          fmt={(v) => ` ${String(Math.floor(v)).padStart(2, '0')}:${v % 1 ? '30' : '00'}`} />
        <Slider label={L('كمية القهوة', 'Coffee')} value={cfg.caffeineMl} min={0} max={600} step={50} onChange={set('caffeineMl')}
          fmt={(v) => ` ${v} ml`} />
        <Slider label={L('وقت آخر قهوة', 'Last cup')} value={cfg.caffeineTime} min={6} max={22} step={1} onChange={set('caffeineTime')}
          fmt={(v) => ` ${String(v).padStart(2, '0')}:00`} />
        <Slider label={L('وقت القيلولة', 'Nap time')} value={cfg.napTime} min={0} max={18} step={1} onChange={set('napTime')}
          fmt={(v) => (v === 0 ? ` — ` : ` ${String(v).padStart(2, '0')}:00`)} />
        <Slider label={L('مدة القيلولة', 'Nap length')} value={cfg.napDuration} min={0} max={2} step={0.25} onChange={set('napDuration')}
          fmt={(v) => ` ${v}h`} />
        <Slider label={L('ضوء المساء', 'Evening light')} value={cfg.eveningLight} min={0} max={1} step={0.1} onChange={set('eveningLight')}
          fmt={(v) => ` ${Math.round(v * 100)}%`} />
        <Slider label={L('أيام حرمان متراكمة', 'Sleep-debt days')} value={cfg.deprivationDays} min={0} max={3} step={1} onChange={set('deprivationDays')} />
      </div>
      <button className="btn" style={{ marginTop: 'var(--space-3)' }} onClick={() => setCfg({ ...DEFAULTS })}>
        ↺ {t(ui.actions.resetNormal)}
      </button>
    </FigureFrame>
  )
}

/* ---------------- Fig 7 — Sleep-deprivation ebb & flow (no inputs) ---------------- */
export function SleepDeprivation() {
  const { t } = useApp()
  const sim = useMemo(() => simulate({ noSleep: true, caffeineMl: 0, eveningLight: 0.3 }), [])
  const { x, y, path } = useMemo(() => build(sim.points, sim.start, sim.end), [sim])
  const hourTicks = []
  for (let tt = Math.ceil(sim.start); tt <= sim.end; tt += 6) hourTicks.push(tt)
  const at = (tt) => sim.points.reduce((a, b) => (Math.abs(b.t - tt) < Math.abs(a.t - tt) ? b : a))
  // Three gap-arrows (S − C), as in the book: strong (first-night trough) ->
  // weak "second wind" (day-2 circadian hump) -> severe (second-night trough).
  const arrows = [
    { t: sim.start + 20, label: L('دافع قوي إلى النوم', 'Strong drive to sleep'), col: 'var(--warm)' },
    { t: sim.start + 32, label: L('دافع ضعيف (صحوة ثانية)', 'Weak drive (second wind)'), col: 'var(--success)' },
    { t: sim.start + 44, label: L('دافع شديد إلى النوم', 'Severe drive to sleep'), col: 'var(--danger)' },
  ]
  return (
    <FigureFrame number={7} interactive={false}
      title={L('مدّ وجزر الحرمان من النوم', 'Sleep-deprivation: the ebb and flow')}
      caption={L('حين لا تنام يتراكم ضغط النوم (S) فيصعد باستمرار بلا تفريغ، بينما يواصل الإيقاع اليومي (C) تموّجه أسفله. الأسهم الرأسية = الفجوة (النعاس): تكبر ثم تصغر عند «الصحوة الثانية» ثم تشتدّ.',
                 'With no sleep, sleep pressure (S) keeps climbing without release, while the circadian rhythm (C) keeps oscillating below it. The vertical arrows are the gap (sleepiness): it grows, shrinks at the deceptive “second wind,” then becomes severe.')}>
      <div dir="ltr" style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="tp-svg">
          <line x1={PAD.l} y1={PAD.t + IH} x2={PAD.l + IW} y2={PAD.t + IH} stroke="var(--border-strong)" />
          {hourTicks.map((tt, i) => (
            <text key={i} x={x(tt)} y={PAD.t + IH + 18} textAnchor="middle" fontSize="11" fill="var(--text-muted)">
              {String(Math.round(((tt % 24) + 24) % 24)).padStart(2, '0')}:00
            </text>
          ))}
          {/* gap-arrows drawn under the curves */}
          {arrows.map((a, i) => {
            const p = at(a.t)
            return (
              <g key={i} style={{ color: a.col }}>
                <line x1={x(a.t)} y1={y(p.C)} x2={x(a.t)} y2={y(p.S)} stroke={a.col}
                  strokeWidth={i === 2 ? 4 : 2.5} markerStart="url(#arU)" markerEnd="url(#arD)" />
                <text x={x(a.t)} y={y(p.S) - 8} textAnchor="middle" fontSize="10.5" fill={a.col} fontWeight="600">{t(a.label)}</text>
              </g>
            )
          })}
          <path d={path('C')} fill="none" stroke="var(--chart-c)" strokeWidth="2.5" strokeDasharray="2 6" strokeLinecap="round" />
          <path d={path('S')} fill="none" stroke="var(--chart-s)" strokeWidth="3" />
          {/* legend */}
          <g fontSize="12">
            <rect x={PAD.l + 6} y={PAD.t + 2} width="14" height="3" fill="var(--chart-s)" />
            <text x={PAD.l + 24} y={PAD.t + 7} fill="var(--text-soft)">S — {t(L('ضغط النوم', 'sleep pressure'))}</text>
            <rect x={PAD.l + 170} y={PAD.t + 2} width="14" height="3" fill="var(--chart-c)" />
            <text x={PAD.l + 188} y={PAD.t + 7} fill="var(--text-soft)">C — {t(L('الإيقاع اليومي', 'circadian'))}</text>
          </g>
          <defs>
            <marker id="arD" markerWidth="9" markerHeight="9" refX="4.5" refY="8" orient="auto">
              <path d="M0,0 L9,0 L4.5,8 Z" fill="currentColor" />
            </marker>
            <marker id="arU" markerWidth="9" markerHeight="9" refX="4.5" refY="1" orient="auto">
              <path d="M0,9 L9,9 L4.5,1 Z" fill="currentColor" />
            </marker>
          </defs>
        </svg>
      </div>
    </FigureFrame>
  )
}
