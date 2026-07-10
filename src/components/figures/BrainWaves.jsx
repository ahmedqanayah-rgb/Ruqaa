import { useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import FigureFrame from './FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })
const WW = 680, ROWH = 92, PADX = 16

// Each trace is a sum of sines; "deep" also gets a drifting sleep-spindle burst.
const TRACES = [
  {
    key: 'wake', label: L('اليقظة — موجات سريعة صغيرة مشوّشة', 'Wake — fast, small, desynchronized'),
    col: 'var(--warm)', fn: (x, ph) => 0.35 * Math.sin(x * 0.9 + ph * 3) + 0.22 * Math.sin(x * 1.7 + ph * 4.5) + 0.15 * Math.sin(x * 2.6 + ph * 6),
  },
  {
    key: 'nrem', label: L('النوم العميق — موجات بطيئة كبيرة متزامنة (+ مغازل)', 'Deep NREM — big, slow, synchronized (+ spindles)'),
    col: 'var(--blue)',
    fn: (x, ph) => {
      let v = 0.85 * Math.sin(x * 0.22 + ph * 0.8)
      const c = ((ph * 40) % 120)
      const env = Math.exp(-Math.pow((x - c) / 6, 2))
      v += 0.4 * env * Math.sin(x * 2.4)
      return v
    },
  },
  {
    key: 'rem', label: L('نوم REM — سريعة مشوّشة كاليقظة (رغم شلل الجسد)', 'REM — fast & desynchronized like wake (yet body paralyzed)'),
    col: 'var(--violet)', fn: (x, ph) => 0.32 * Math.sin(x * 0.95 + ph * 3.2) + 0.24 * Math.sin(x * 1.9 + ph * 5) + 0.12 * Math.sin(x * 3.1 + ph * 7),
  },
]

function buildPath(fn, ph, w, midY, amp) {
  let d = ''
  for (let px = 0; px <= w; px += 3) {
    const x = (px / w) * 120
    const y = midY - fn(x, ph) * amp
    d += `${px === 0 ? 'M' : 'L'}${(PADX + px).toFixed(1)},${y.toFixed(1)}`
  }
  return d
}

export default function BrainWaves() {
  const { t } = useApp()
  const pathRefs = useRef([])
  const svgRef = useRef(null)
  const w = WW - PADX * 2

  // Animate by writing directly to each <path>'s `d` via rAF — no React
  // re-renders. Pauses when the figure is scrolled off-screen (perf + lets the
  // rest of the page settle).
  useEffect(() => {
    let raf = 0
    let ph = 0
    let visible = true
    const tick = () => {
      ph += 0.03
      TRACES.forEach((tr, i) => {
        const el = pathRefs.current[i]
        if (el) el.setAttribute('d', buildPath(tr.fn, ph, w, i * ROWH + ROWH / 2 + 6, 26))
      })
      raf = visible ? requestAnimationFrame(tick) : 0
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) { visible = true; raf = requestAnimationFrame(tick) }
      else if (!e.isIntersecting) { visible = false; cancelAnimationFrame(raf); raf = 0 }
    }, { threshold: 0.05 })
    if (svgRef.current) io.observe(svgRef.current)
    raf = requestAnimationFrame(tick)
    return () => { visible = false; cancelAnimationFrame(raf); io.disconnect() }
  }, [w])

  return (
    <FigureFrame number={9}
      title={L('الموجات الدماغية: اليقظة / النوم العميق / REM', 'Brain waves: Wake / deep NREM / REM')}
      caption={L('الموجات متحرّكة حيّة: لاحظ كيف تتباطأ وتتضخّم في النوم العميق (مع مغزل نومي عابر)، وتعود سريعة مشوّشة في REM.',
                 'The traces are live-animated: watch them slow and swell in deep sleep (with a passing spindle), then return fast and desynchronized in REM.')}>
      <div dir="ltr" style={{ overflowX: 'auto' }}>
        <svg ref={svgRef} viewBox={`0 0 ${WW} ${ROWH * TRACES.length}`} className="tp-svg" style={{ background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)' }}>
          {TRACES.map((tr, i) => {
            const midY = i * ROWH + ROWH / 2 + 6
            return (
              <g key={tr.key}>
                <text x={PADX} y={i * ROWH + 18} fontSize="12" fill={tr.col} fontWeight="600">{t(tr.label)}</text>
                <path ref={(el) => (pathRefs.current[i] = el)} d={buildPath(tr.fn, 0, w, midY, 26)}
                  fill="none" stroke={tr.col} strokeWidth="2.2" strokeLinejoin="round" />
                {i < TRACES.length - 1 && (
                  <line x1={0} y1={(i + 1) * ROWH} x2={WW} y2={(i + 1) * ROWH} stroke="var(--border)" />
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </FigureFrame>
  )
}
