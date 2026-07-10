import { useMemo, useState, useRef } from 'react'
import { useApp } from '../../context/AppContext.jsx'
import FigureFrame from './FigureFrame.jsx'
import { ui } from '../../data/ui.js'

const L = (ar, en) => ({ ar, en })

// Canonical healthy adult night (stage, minutes), scaled to exactly 480 min (8h).
// Deep sleep dominates early, REM lengthens toward morning — Figure 8, 5 cycles.
const CANON_RAW = [
  ['Awake', 5], ['N1', 6], ['N2', 26], ['N3', 46], ['N2', 12], ['REM', 6],
  ['N2', 28], ['N3', 34], ['N2', 14], ['REM', 22],
  ['N2', 30], ['N3', 20], ['N2', 16], ['REM', 26],
  ['N2', 30], ['N3', 8], ['N2', 18], ['REM', 30],
  ['N2', 26], ['N1', 5], ['REM', 34], ['Awake', 6],
]
const RAW_TOTAL = CANON_RAW.reduce((s, [, m]) => s + m, 0)
const WINDOW = 480 // the 8h circadian window
const MAXM = 660   // axis spans usual bedtime .. usual+11h (window + up to 3h extra)
const CANON = (() => {
  const k = WINDOW / RAW_TOTAL
  let acc = 0
  return CANON_RAW.map(([stage, m]) => { const start = acc; acc += m * k; return { stage, start, end: acc } })
})()

const STAGE = {
  Awake: { row: 0, ar: 'مستيقظ', en: 'Awake', col: 'var(--warm)' },
  REM: { row: 1, ar: 'حركة العين السريعة (REM)', en: 'REM', col: 'var(--violet)' },
  N1: { row: 2, ar: 'انعدام حركة العين السريعة ١ (N1)', en: 'NREM 1', col: '#7fb3ff' },
  N2: { row: 3, ar: 'انعدام حركة العين السريعة ٢ (N2)', en: 'NREM 2', col: 'var(--blue)' },
  N3: { row: 4, ar: 'العميق ٣–٤ (الموجة البطيئة)', en: 'NREM 3–4 (slow-wave)', col: '#3a3f9e' },
}
const ROWS = ['Awake', 'REM', 'N1', 'N2', 'N3']

const W = 860, H = 320, PAD = { l: 150, r: 20, t: 16, b: 46 }
const IW = W - PAD.l - PAD.r, IH = H - PAD.t - PAD.b
const PX = IW / MAXM // fixed scale — the phases stay pinned to the clock

function fmtHour(hAbs) {
  const h = ((Math.round(hAbs) % 24) + 24) % 24
  const m = Math.round((hAbs % 1) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function Hypnogram() {
  const { t } = useApp()
  const [usual, setUsual] = useState(23)          // usual (reference) bedtime, clock hour
  const [bedAbs, setBedAbs] = useState(23)        // chosen bedtime this day (abs hours)
  const [wakeAbs, setWakeAbs] = useState(31)      // chosen wake this day (abs hours, 31 = 07:00)
  const [hover, setHover] = useState(null)
  const svgRef = useRef(null)

  const uAbs = usual
  // Chosen sleep is measured relative to the fixed usual window [uAbs, uAbs+8h].
  const clampBed = (u, b) => Math.min(u + 4, Math.max(u, b))
  const clampWake = (u, w, b) => Math.min(u + 11, Math.max(b + 3, w))

  // Changing the usual bedtime shifts the whole day with it (relative sleep kept).
  const onUsual = (v) => {
    const d = v - usual
    const newBed = clampBed(v, bedAbs + d)
    const newWake = clampWake(v, wakeAbs + d, newBed)
    setUsual(v); setBedAbs(newBed); setWakeAbs(newWake)
  }
  const onBed = (v) => { const b = clampBed(uAbs, v); setBedAbs(b); setWakeAbs((w) => clampWake(uAbs, w, b)) }
  const onWake = (v) => setWakeAbs(clampWake(uAbs, v, bedAbs))

  const mB = Math.round((bedAbs - uAbs) * 60)
  const mW = Math.round((wakeAbs - uAbs) * 60)
  const sleptInWindowEnd = Math.min(mW, WINDOW)

  const model = useMemo(() => {
    const segs = []
    for (const s of CANON) {
      const a = Math.max(s.start, mB)
      const b = Math.min(s.end, sleptInWindowEnd)
      if (b > a) segs.push({ stage: s.stage, start: a, end: b })
    }
    // lost from the start (mostly deep NREM) and from the end (mostly REM)
    const inRange = (s, lo, hi) => Math.max(0, Math.min(s.end, hi) - Math.max(s.start, lo))
    let nremLost = 0, remLost = 0
    for (const s of CANON) {
      if (s.stage !== 'REM' && s.stage !== 'Awake') nremLost += inRange(s, 0, mB)
      if (s.stage === 'REM') remLost += inRange(s, sleptInWindowEnd, WINDOW)
    }
    const extraMin = Math.max(0, mW - WINDOW)
    return { segs, nremLost: Math.round(nremLost), remLost: Math.round(remLost), extraMin }
  }, [mB, mW, sleptInWindowEnd])

  const { segs, nremLost, remLost, extraMin } = model
  const x = (m) => PAD.l + m * PX
  const rowY = (row) => PAD.t + (row + 0.5) * (IH / ROWS.length)
  const clockAt = (m) => uAbs + m / 60

  const stepPath = useMemo(() => {
    let d = ''
    segs.forEach((s, i) => {
      const yy = rowY(STAGE[s.stage].row)
      d += `${i === 0 ? 'M' : 'L'}${x(s.start).toFixed(1)},${yy.toFixed(1)}L${x(s.end).toFixed(1)},${yy.toFixed(1)}`
    })
    return d
  }, [segs])

  const onMove = (e) => {
    const rect = svgRef.current.getBoundingClientRect()
    const m = (((e.clientX - rect.left) / rect.width) * W - PAD.l) / PX
    if (m < mB || m > mW) { setHover(null); return }
    if (m > WINDOW) { setHover({ extra: true, m }); return }
    const seg = segs.find((s) => m >= s.start && m < s.end)
    setHover(seg ? { ...seg, m } : null)
  }

  return (
    <FigureFrame number={8}
      title={L('بنية النوم (المخطّط النومي / Hypnogram)', 'Sleep architecture (Hypnogram)')}
      caption={L('المراحل مثبّتة على «موعد النوم المعتاد»: النوم العميق (NREM) أوّل النافذة، وREM آخرها. تأخّرك في النوم يقتطع من النوم العميق من البداية، واستيقاظك المبكّر يقتطع من REM في النهاية. مرّر المؤشّر لعرض المرحلة.',
                 'The stages are pinned to your “usual bedtime”: deep NREM at the start of the window, REM at its end. Going to bed late cuts deep sleep from the start; waking early cuts REM from the end. Hover to read the stage.')}>
      <div dir="ltr" style={{ overflowX: 'auto' }}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="tp-svg"
          onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <defs>
            <pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="7" height="7" fill="var(--warm-soft)" />
              <line x1="0" y1="0" x2="0" y2="7" stroke="var(--warm)" strokeWidth="2" opacity="0.5" />
            </pattern>
          </defs>

          {/* the fixed 8h circadian window */}
          <rect x={x(0)} y={PAD.t} width={x(WINDOW) - x(0)} height={IH} fill="var(--accent-soft)" opacity="0.35" />
          {/* lost-from-start (NREM) and lost-from-end (REM) bands */}
          {mB > 0 && <rect x={x(0)} y={PAD.t} width={x(mB) - x(0)} height={IH} fill="var(--danger)" opacity="0.08" />}
          {mW < WINDOW && <rect x={x(mW)} y={PAD.t} width={x(WINDOW) - x(mW)} height={IH} fill="var(--danger)" opacity="0.08" />}
          {/* extra hours beyond the window — sleep, but less effective */}
          {extraMin > 0 && (
            <g>
              <rect x={x(WINDOW)} y={PAD.t} width={x(mW) - x(WINDOW)} height={IH} fill="url(#hatch)" opacity="0.7" />
              <rect x={x(WINDOW)} y={rowY(3) - 6} width={x(mW) - x(WINDOW)} height={12} rx={3} fill="var(--warm)" opacity="0.4" />
            </g>
          )}

          {ROWS.map((r, i) => (
            <g key={r}>
              <line x1={PAD.l} y1={rowY(i)} x2={PAD.l + IW} y2={rowY(i)} stroke="var(--chart-grid)" strokeDasharray="2 4" />
              <text x={PAD.l - 10} y={rowY(i) + 4} textAnchor="end" fontSize="11.5" fill={STAGE[r].col} fontWeight="600">{t(STAGE[r])}</text>
            </g>
          ))}
          {segs.map((s, i) => (
            <rect key={i} x={x(s.start)} y={rowY(STAGE[s.stage].row) - 6}
              width={Math.max(0.5, x(s.end) - x(s.start))} height={12} rx={3}
              fill={STAGE[s.stage].col} opacity={hover && hover.start === s.start ? 1 : 0.4} />
          ))}
          <path d={stepPath} fill="none" stroke="var(--text-soft)" strokeWidth="2" />

          {/* markers: usual bedtime (0) and window end (480) */}
          <line x1={x(0)} y1={PAD.t - 4} x2={x(0)} y2={PAD.t + IH} stroke="var(--accent)" strokeWidth="2" />
          <line x1={x(WINDOW)} y1={PAD.t - 4} x2={x(WINDOW)} y2={PAD.t + IH} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={x(0)} y={PAD.t - 6} textAnchor="start" fontSize="10" fill="var(--accent)" fontWeight="700">{t(L('النوم المعتاد', 'usual bedtime'))}</text>
          <text x={x(WINDOW)} y={PAD.t - 6} textAnchor="middle" fontSize="10" fill="var(--accent)">+8h</text>
          {extraMin > 0 && (
            <text x={(x(WINDOW) + x(mW)) / 2} y={PAD.t + IH - 6} textAnchor="middle" fontSize="10" fill="var(--warm)" fontWeight="700">
              {t(L('إضافي (أقل فعالية)', 'extra (less effective)'))}
            </text>
          )}

          {/* full clock axis, always shown, pinned to usual bedtime */}
          {Array.from({ length: 12 }).map((_, i) => (
            <text key={i} x={x(i * 60)} y={PAD.t + IH + 24} textAnchor="middle" fontSize="10.5" fill="var(--text-muted)">
              {fmtHour(uAbs + i)}
            </text>
          ))}
          {hover && <line x1={x(hover.m)} y1={PAD.t} x2={x(hover.m)} y2={PAD.t + IH} stroke="var(--text-muted)" strokeDasharray="3 3" />}
        </svg>
      </div>

      <div className="tp-readout">
        {hover ? (
          hover.extra
            ? <span>{fmtHour(clockAt(hover.m))} — <b style={{ color: 'var(--warm)' }}>{t(L('نوم إضافي أقلّ فعالية', 'extra, less-effective sleep'))}</b></span>
            : <span>{fmtHour(clockAt(hover.m))} — <b style={{ color: STAGE[hover.stage].col }}>{t(STAGE[hover.stage])}</b></span>
        ) : (
          <span className="hint">{t(ui.labels.hover)}</span>
        )}
        <span className="hyp-losses">
          {nremLost > 0 && <span className="rem-loss">{t(L('نوم عميق مفقود (البداية):', 'Deep NREM lost (start):'))} <b>~{nremLost}{t(L('د', 'm'))}</b></span>}
          {remLost > 0 && <span className="rem-loss">{t(L('REM مفقود (النهاية):', 'REM lost (end):'))} <b>~{remLost}{t(L('د', 'm'))}</b></span>}
          {extraMin > 0 && <span style={{ color: 'var(--warm)' }}>{t(L('إضافي أقل فعالية:', 'extra (less effective):'))} <b>~{extraMin}{t(L('د', 'm'))}</b></span>}
        </span>
      </div>

      <div className="tp-controls">
        <label className="tp-control usual">
          <span className="tp-label">{t(L('موعد النوم المعتاد (المرجع)', 'Usual bedtime (reference)'))}<b> {fmtHour(uAbs)}</b></span>
          <input type="range" min={20} max={25} step={0.5} value={usual} onChange={(e) => onUsual(parseFloat(e.target.value))} />
        </label>
        <label className="tp-control">
          <span className="tp-label">{t(L('موعد نومك اليوم', 'Your bedtime today'))}<b> {fmtHour(bedAbs)}</b></span>
          <input type="range" min={uAbs} max={uAbs + 4} step={0.5} value={bedAbs} onChange={(e) => onBed(parseFloat(e.target.value))} />
        </label>
        <label className="tp-control">
          <span className="tp-label">{t(L('موعد استيقاظك اليوم', 'Your wake-up today'))}<b> {fmtHour(wakeAbs)}</b></span>
          <input type="range" min={bedAbs + 3} max={uAbs + 11} step={0.5} value={wakeAbs} onChange={(e) => onWake(parseFloat(e.target.value))} />
        </label>
        <div className="tp-control" style={{ justifyContent: 'center' }}>
          <span className="tp-label">{t(L('مدة النوم', 'Sleep duration'))}<b> {((mW - mB) / 60).toFixed(1)}h</b></span>
        </div>
      </div>

      <div className="callout note" style={{ marginTop: 'var(--space-3)' }}>
        <span className="callout-icon" aria-hidden>🕰️</span>
        <div>
          <strong>{t(L('لماذا الساعات الإضافية أقلّ فعالية؟', 'Why are the extra hours less effective?'))}</strong>
          <p>{t(L(
            'قدرة الدماغ على توليد كلّ مرحلةٍ من مراحل النوم محكومةٌ بالإيقاع اليومي (Circadian Rhythm)، لذلك ترتبط المراحل بأوقاتٍ محدّدة من ليلتك المعتادة ولا تنتقل حين تغيّر موعد نومك في يومٍ ما. النومُ في وقتٍ لم تُبرمَج له ساعتُك البيولوجية ليس كالنوم في وقته — فالساعات خارج نافذة الثماني ساعات (بدءاً من موعدك المعتاد) **أقلّ فعاليةً، لكنها تبقى أفضل من لا شيء**.',
            'The brain’s ability to generate each sleep stage is governed by the circadian rhythm, so the stages are tied to specific times of your usual night and do not move when you change your bedtime on a given day. Sleeping at a time your body clock isn’t programmed for is not the same as sleeping on time — hours outside the 8-hour window (starting at your usual bedtime) are **less effective, but still better than nothing**.'
          ))}</p>
        </div>
      </div>

      <button className="btn" style={{ marginTop: 'var(--space-3)' }} onClick={() => { setUsual(23); setBedAbs(23); setWakeAbs(31) }}>
        ↺ {t(ui.actions.resetNormal)}
      </button>
    </FigureFrame>
  )
}
