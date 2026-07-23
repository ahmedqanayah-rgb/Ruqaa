import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })
const slug = (s) => `/book/stolen-focus/${s}`

/* ---------------- Fig 1 — Map of the twelve causes ----------------
   Twelve clickable causes grouped into four families; each links to its
   section. Not a data chart — an interactive index. */
const CAUSE_GROUPS = [
  { key: 'mind', name: L('العقل', 'Mind'), cls: 'sf-fam-mind', causes: [
    { n: 1, to: 'speed-flow', label: L('السرعة والتبديل', 'Speed & switching') },
    { n: 2, to: 'speed-flow', label: L('تعطيل التدفّق', 'Crippled flow') },
    { n: 4, to: 'reading-mindwandering', label: L('انهيار القراءة', 'Collapse of reading') },
    { n: 5, to: 'reading-mindwandering', label: L('كبت شرود الذهن', 'Suppressed wandering') },
  ] },
  { key: 'tech', name: L('التقنية', 'Technology'), cls: 'sf-fam-tech', causes: [
    { n: 6, to: 'big-tech', label: L('تقنية تتلاعب بك', 'Manipulative tech') },
  ] },
  { key: 'body', name: L('الجسد', 'Body'), cls: 'sf-fam-body', causes: [
    { n: 3, to: 'exhaustion', label: L('الإنهاك وقلّة النوم', 'Exhaustion & sleep') },
    { n: 9, to: 'diet-pollution', label: L('تدهور الغذاء', 'Poor diet') },
    { n: 10, to: 'diet-pollution', label: L('التلوّث', 'Pollution') },
  ] },
  { key: 'society', name: L('المجتمع', 'Society'), cls: 'sf-fam-society', causes: [
    { n: 7, to: 'cruel-optimism', label: L('التفاؤل القاسي', 'Cruel optimism') },
    { n: 8, to: 'stress-vigilance', label: L('التوتّر واليقظة', 'Stress & vigilance') },
    { n: 11, to: 'adhd', label: L('تشخيص فرط الحركة', 'ADHD diagnosis') },
    { n: 12, to: 'childhood', label: L('حبس الأطفال', 'Confined children') },
  ] },
]
export function SfCausesMap() {
  const { t } = useApp()
  return (
    <FigureFrame number={1}
      title={L('خريطة الأسباب الاثني عشر', 'Map of the twelve causes')}
      caption={L('الأسباب الاثنا عشر في أربع عائلات. انقر أيّ سببٍ للانتقال إلى قسمه.',
                 'The twelve causes in four families. Click any cause to jump to its section.')}>
      <div className="sf-causes-map">
        {CAUSE_GROUPS.map((g) => (
          <div key={g.key} className={`sf-fam ${g.cls}`}>
            <span className="sf-fam-name">{t(g.name)}</span>
            <div className="sf-fam-causes">
              {g.causes.map((c) => (
                <Link key={c.n} to={slug(c.to)} className="sf-cause">
                  <span className="sf-cause-n">{t({ ar: String(c.n), en: String(c.n) })}</span>
                  <span className="sf-cause-lbl">{t(c.label)}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 2 — The cost of interruption & switching ----------------
   Model grounded in Posner's finding that it takes ~23 min to regain deep focus
   after an interruption. If interrupted N evenly-spaced times per hour, deep
   minutes ≈ max(0, 60 − 23N). Beyond ~2–3 interruptions/hour, deep focus
   collapses to zero. */
const REFOCUS = 23
const SW_PRESETS = [
  { n: 0, label: L('ساعة محميّة', 'A protected hour') },
  { n: 1, label: L('يوم هادئ', 'A quiet day') },
  { n: 3, label: L('يوم اعتيادي', 'A typical day') },
  { n: 6, label: L('مكتب مفتوح + هاتف', 'Open office + phone') },
]
export function SfSwitchCost() {
  const { t } = useApp()
  const [n, setN] = useState(2)
  const deep = n === 0 ? 60 : Math.max(0, 60 - REFOCUS * n)
  const lost = 60 - deep
  const deepPct = Math.round((deep / 60) * 100)
  return (
    <FigureFrame number={2}
      title={L('كلفة المقاطعة والتبديل', 'The cost of interruption & switching')}
      caption={L('تحتاج في المتوسّط ٢٣ دقيقة لاستعادة تركيزك العميق بعد كلّ مقاطعة. حرّك عدد المقاطعات — أو اختر سيناريو — وشاهد كم يتبقّى من عملٍ عميقٍ حقيقي.',
                 'It takes ~23 minutes on average to regain deep focus after each interruption. Drag the interruptions-per-hour — or pick a scenario — and watch how little genuine deep work is left.')}>
      <div className="sf-switch">
        <div className="sf-bar-wrap">
          {n > 0 && (
            <div className="sf-zap-row" aria-hidden>
              {Array.from({ length: n }).map((_, i) => (
                <span key={i} className="sf-zap" style={{ insetInlineStart: `${((i + 1) / (n + 1)) * 100}%` }}>⚡</span>
              ))}
            </div>
          )}
          <div className="sf-bar" role="img"
            aria-label={t({ ar: `عملٌ عميق ${deep} دقيقة من ٦٠`, en: `${deep} minutes of deep work out of 60` })}>
            <div className="sf-bar-deep" style={{ width: `${deepPct}%` }}>
              {deep > 6 && <span>{t({ ar: `${deep} د عميق`, en: `${deep}m deep` })}</span>}
            </div>
            <div className="sf-bar-lost" style={{ width: `${100 - deepPct}%` }}>
              {lost > 6 && <span>{t({ ar: `${lost} د مبدّدة`, en: `${lost}m lost` })}</span>}
            </div>
          </div>
        </div>
        <label className="sf-slider">
          <span className="sf-slider-lbl">
            {t(L('مقاطعات في الساعة', 'Interruptions per hour'))}: <b>{t({ ar: String(n), en: String(n) })}</b>
          </span>
          <input type="range" min="0" max="6" step="1" value={n}
            onChange={(e) => setN(+e.target.value)} />
        </label>
        <div className="sf-presets" role="group" aria-label={t(L('سيناريوهات جاهزة', 'Preset scenarios'))}>
          {SW_PRESETS.map((p) => (
            <button key={p.n} className={`sf-preset ${n === p.n ? 'active' : ''}`} onClick={() => setN(p.n)}>
              {t(p.label)} ({t({ ar: String(p.n), en: String(p.n) })})
            </button>
          ))}
        </div>
        <p className="sf-readout">
          {deep === 0
            ? t(L('عند هذا المعدّل لا يبقى أيّ وقتٍ للعمل العميق — يُلتهم كلّه في إعادة التركيز.',
                  'At this rate no time is left for deep work — it is all consumed by re-focusing.'))
            : t({ ar: `يتبقّى ${deep} دقيقة فقط من عملٍ عميقٍ حقيقيّ في الساعة.`,
                  en: `Only ${deep} minutes of genuine deep work remain in the hour.` })}
        </p>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 4 — The flow channel ----------------
   Csikszentmihalyi's challenge-vs-skill plane. Drag the dot directly on the
   plane (pointer events, touch-friendly) or use the sliders — both stay in
   sync. Flow lives on the diagonal where high challenge meets high skill. */
function flowZone(skill, challenge) {
  // Must match the four coloured quadrants exactly — they split at 50 on each
  // axis (x/y = 150 in the plane). The old 45/55 thresholds left a dead band
  // that all resolved to "flow", so the marker reported Flow while sitting
  // visibly inside the Anxiety or Boredom rectangle.
  const hiSkill = skill >= 50
  const hiChallenge = challenge >= 50
  if (hiSkill && hiChallenge) return { key: 'flow', ar: 'تدفّق', en: 'Flow' }
  if (!hiSkill && hiChallenge) return { key: 'anxiety', ar: 'قلق', en: 'Anxiety' }
  if (hiSkill && !hiChallenge) return { key: 'boredom', ar: 'ملل', en: 'Boredom' }
  return { key: 'apathy', ar: 'لا مبالاة', en: 'Apathy' }
}
const clamp01 = (x) => Math.max(0, Math.min(100, x))
export function SfFlowChannel() {
  const { t, isAr } = useApp()
  const [skill, setSkill] = useState(70)
  const [challenge, setChallenge] = useState(72)
  const dragging = useRef(false)
  const zone = flowZone(skill, challenge)
  // SVG plane 0..100 → 0..300 (x = skill, y = challenge inverted for screen)
  const cx = 30 + (skill / 100) * 240
  const cy = 270 - (challenge / 100) * 240

  const setFromPointer = (e) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 300
    const py = ((e.clientY - rect.top) / rect.height) * 300
    setSkill(Math.round(clamp01(((px - 30) / 240) * 100)))
    setChallenge(Math.round(clamp01(((270 - py) / 240) * 100)))
  }
  const onDown = (e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); setFromPointer(e) }
  const onMove = (e) => { if (dragging.current) setFromPointer(e) }
  const onUp = () => { dragging.current = false }

  return (
    <FigureFrame number={4}
      title={L('قناة التدفّق', 'The flow channel')}
      caption={L('التدفّق يسكن القطر حيث يلتقي تحدٍّ عالٍ بمهارةٍ عالية. تحدٍّ أكبر من مهارتك = قلق؛ مهارةٌ أكبر من التحدّي = ملل. **اسحب النقطة على المستوى مباشرةً** أو استخدم المنزلقين.',
                 'Flow lives on the diagonal where high challenge meets high skill. Challenge above skill = anxiety; skill above challenge = boredom. **Drag the dot directly on the plane** or use the sliders.')}>
      <div className="sf-flow">
        <svg viewBox="0 0 300 300" className="sf-flow-svg" role="img"
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
          aria-label={t({ ar: `المنطقة: ${zone.ar}`, en: `Zone: ${zone.en}` })}>
          {/* zones */}
          <rect x="30" y="30" width="120" height="120" fill="var(--violet-soft)" />
          <rect x="150" y="30" width="120" height="120" fill="var(--accent-soft)" />
          <rect x="30" y="150" width="120" height="120" fill="var(--bg-elev-2)" />
          <rect x="150" y="150" width="120" height="120" fill="var(--blue-soft)" />
          {/* axes */}
          <line x1="30" y1="270" x2="270" y2="270" stroke="var(--border-strong)" strokeWidth="1.5" />
          <line x1="30" y1="30" x2="30" y2="270" stroke="var(--border-strong)" strokeWidth="1.5" />
          {/* diagonal flow guide */}
          <line x1="30" y1="270" x2="270" y2="30" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" />
          {/* labels (kept LTR-neutral, positioned) */}
          <text x="90" y="95" textAnchor="middle" fontSize="12" fill="var(--violet)">{t(L('قلق', 'Anxiety'))}</text>
          <text x="210" y="95" textAnchor="middle" fontSize="12" fill="var(--accent)">{t(L('تدفّق', 'Flow'))}</text>
          <text x="90" y="215" textAnchor="middle" fontSize="12" fill="var(--text-muted)">{t(L('لا مبالاة', 'Apathy'))}</text>
          <text x="210" y="215" textAnchor="middle" fontSize="12" fill="var(--blue)">{t(L('ملل', 'Boredom'))}</text>
          {/* crosshair guides to the marker */}
          <line x1={cx} y1="270" x2={cx} y2={cy} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          <line x1="30" y1={cy} x2={cx} y2={cy} stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
          {/* marker (bigger halo = friendlier touch target) */}
          <circle cx={cx} cy={cy} r="16" fill="var(--accent)" opacity="0.18" />
          <circle cx={cx} cy={cy} r="9" fill="var(--accent)" stroke="var(--bg-elev)" strokeWidth="3" />
        </svg>
        <div className="sf-axislabels">
          <span>{t(L('← المهارة →', '← Skill →'))}</span>
          <span className="sf-zone" data-zone={zone.key}>{isAr ? zone.ar : zone.en}</span>
        </div>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('المهارة', 'Skill'))}: <b>{skill}</b></span>
          <input type="range" min="0" max="100" value={skill} onChange={(e) => setSkill(+e.target.value)} />
        </label>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('التحدّي', 'Challenge'))}: <b>{challenge}</b></span>
          <input type="range" min="0" max="100" value={challenge} onChange={(e) => setChallenge(+e.target.value)} />
        </label>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 12 — Where you draw the line (ADHD) ----------------
   Rather than a fabricated time-series, this visualises the book's central ADHD
   argument (Nigg vs Timimi): a population's restlessness is a smooth spectrum,
   and how many count as "ADHD" depends on where the diagnostic line is drawn.
   Move the line — or jump to a real-world reference point. */
function normalRightTail(z) {
  // 1 − Φ(z) via Abramowitz-Stegun erf approximation.
  const t = 1 / (1 + 0.2316419 * Math.abs(z))
  const d = 0.3989423 * Math.exp(-z * z / 2)
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))))
  if (z > 0) p = 1 - p
  return 1 - p
}
const ADHD_PRESETS = [
  { z: 1.645, label: L('تقديرات عالمية شائعة ~٥٪', 'Common global estimates ~5%') },
  { z: 0.524, label: L('فتيان الجنوب الأمريكي ٣٠٪', 'US-South boys 30%') },
]
export function SfAdhdThreshold() {
  const { t } = useApp()
  const [z, setZ] = useState(1.2) // threshold in SD above the mean
  const [hovering, setHovering] = useState(false)
  const pct = Math.round(normalRightTail(z) * 100)

  // Sweeping the curve moves the line, same as SfFlowChannel's draggable plane.
  // Pointer x → z, clamped to the slider's own range so the two agree.
  const setFromPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 300
    const zz = ((px - 20) / 260) * 6 - 3
    setZ(Math.max(-0.5, Math.min(2.5, Math.round(zz * 20) / 20)))
  }
  // bell curve points 0..300 (z from -3..3)
  const pts = []
  for (let i = 0; i <= 60; i++) {
    const zz = -3 + (i / 60) * 6
    const x = 20 + (i / 60) * 260
    const y = 150 - Math.exp(-zz * zz / 2) * 110
    pts.push(`${x},${y}`)
  }
  const thX = 20 + ((z + 3) / 6) * 260
  return (
    <FigureFrame number={12}
      title={L('أين نرسم الخطّ؟ (نقاش فرط الحركة)', 'Where do we draw the line? (the ADHD debate)')}
      caption={L('التململ والحركة طيفٌ متّصل في أيّ مجموعة بشرية. كم منهم «مصاب بفرط الحركة»؟ يعتمد على مكان خطّ التشخيص. **مرّر المؤشّر عبر المنحنى** — أو استخدم المنزلق أو انقر نقطة مرجعية حقيقية — لترى كيف تتغيّر النسبة: هذا جوهر نقاش نيغ والتميمي.',
                 'Restlessness is a smooth spectrum in any population. How many “have ADHD”? It depends where the diagnostic line sits. **Sweep the pointer across the curve** — or use the slider, or tap a real-world reference — and watch the share change: the heart of the Nigg–Timimi debate.')}>
      <div className="sf-adhd">
        <svg viewBox="0 0 300 170" className="sf-adhd-svg" role="img"
          onPointerMove={(e) => { setHovering(true); setFromPointer(e) }}
          onPointerDown={setFromPointer}
          onPointerLeave={() => setHovering(false)}
          aria-label={t({ ar: `${pct}٪ يقعون فوق خطّ التشخيص`, en: `${pct}% fall above the diagnostic line` })}>
          <defs>
            <clipPath id="sfBell">
              <polygon points={`20,150 ${pts.join(' ')} 280,150`} />
            </clipPath>
          </defs>
          {/* population under the curve */}
          <rect x="20" y="0" width="260" height="150" fill="var(--bg-elev-2)" clipPath="url(#sfBell)" />
          {/* diagnosed area (right of threshold), clipped to the curve */}
          <rect x={thX} y="0" width={280 - thX} height="150" fill="var(--danger)" opacity="0.32" clipPath="url(#sfBell)" />
          {/* curve */}
          <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
          <line x1="20" y1="150" x2="280" y2="150" stroke="var(--border-strong)" strokeWidth="1.5" />
          {/* threshold line */}
          <line x1={thX} y1="20" x2={thX} y2="150" stroke="var(--danger)" strokeWidth="2.5" />
          <text x={thX} y="15" textAnchor="middle" fontSize="12" fill="var(--danger)">{t(L('خطّ التشخيص', 'diagnostic line'))}</text>
        </svg>
        <div className="sf-adhd-readout" aria-live="polite">
          {t({ ar: 'المُشخَّصون:', en: 'Diagnosed:' })} <b>{t({ ar: `${pct}٪`, en: `${pct}%` })}</b>
          {hovering && <span className="sf-slider-hint"> · {t(L('تتبع المؤشّر', 'following the pointer'))}</span>}
        </div>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('حرّك خطّ التشخيص', 'Move the diagnostic line'))}</span>
          <input type="range" min="-0.5" max="2.5" step="0.05" value={z}
            onChange={(e) => { setHovering(false); setZ(+e.target.value) }} />
        </label>
        <div className="sf-presets" role="group" aria-label={t(L('نقاط مرجعية', 'Reference points'))}>
          {ADHD_PRESETS.map((p) => (
            <button key={p.z} className={`sf-preset ${Math.abs(z - p.z) < 0.03 ? 'active' : ''}`} onClick={() => setZ(p.z)}>
              {t(p.label)}
            </button>
          ))}
        </div>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 9 — How your attention is sold ----------------
   Surveillance-capitalism loop: your behaviour → data → prediction → ad auction
   → targeted manipulation → back to your behaviour. Tap any stage for detail. */
const SURV_STEPS = [
  { icon: '🧑', label: L('سلوكك', 'Your behaviour'),
    detail: L('كلّ نقرة وتمريرة وتوقّفٍ قصير أمام منشورٍ — إشارةٌ تُلتقط وتُسجَّل.', 'Every click, scroll, and brief pause on a post — a signal captured and logged.') },
  { icon: '📊', label: L('تُجمع بياناتك', 'Data harvested'),
    detail: L('تتراكم الإشارات ملفّاً دقيقاً عن ميولك ومخاوفك ونقاط ضعفك.', 'The signals pile into a fine-grained profile of your leanings, fears, and weak spots.') },
  { icon: '🔮', label: L('تنبّؤ بسلوكك', 'Behaviour predicted'),
    detail: L('نماذج تتوقّع ما سيُبقيك محدّقاً، وما قد تشتريه، ومتى تضعف مقاومتك.', 'Models forecast what will keep you staring, what you might buy, and when your resistance dips.') },
  { icon: '💰', label: L('يُباع في مزاد الإعلانات', 'Sold in the ad auction'),
    detail: L('في أجزاء من الثانية، يشتري المعلنون لحظة انتباهك القادمة في مزادٍ فوريّ.', 'In fractions of a second, advertisers buy your next moment of attention in a live auction.') },
  { icon: '🎯', label: L('محتوى يوجّهك', 'Content that steers you'),
    detail: L('تُرتَّب خلاصتك لتحقيق التنبّؤ — لا لمصلحتك — فيتولّد سلوكٌ جديد… وتدور الحلقة.', 'Your feed is arranged to fulfil the prediction — not to serve you — producing new behaviour… and the loop turns.') },
]
export function SfSurveillanceFlow() {
  const { t } = useApp()
  const [sel, setSel] = useState(0)
  return (
    <FigureFrame number={9}
      title={L('كيف يُباع انتباهك', 'How your attention is sold')}
      caption={L('حلقة «رأسمالية المراقبة»: انتباهك يُجمع ويُتنبّأ به ويُباع، ثم يُعاد توجيهك — فتبدأ الحلقة من جديد. **انقر كلّ مرحلة** لتقرأ ما يجري فيها. المنتج هو أنت.',
                 'The “surveillance capitalism” loop: your attention is harvested, predicted and sold, then you are steered — and the loop begins again. **Tap each stage** to read what happens inside it. The product is you.')}>
      <div className="sf-flow-diagram">
        <div className="sf-flow-row">
          {SURV_STEPS.map((s, i) => (
            <div key={i} className="sf-flow-node-wrap">
              <button className={`sf-flow-node ${sel === i ? 'active' : ''}`} onClick={() => setSel(i)}
                aria-pressed={sel === i}>
                <span className="sf-flow-icon" aria-hidden>{s.icon}</span>
                <span className="sf-flow-lbl">{t(s.label)}</span>
              </button>
              {i < SURV_STEPS.length - 1 && <span className="sf-flow-arrow" aria-hidden>→</span>}
            </div>
          ))}
        </div>
        <p className="sf-flow-detail" aria-live="polite">
          <b>{t({ ar: `${sel + 1}.`, en: `${sel + 1}.` })}</b> {t(SURV_STEPS[sel].detail)}
        </p>
        {/* return channel: makes the sequence read as a loop, not a line */}
        <div className="sf-flow-loop">
          <span className="sf-flow-loop-arrow" aria-hidden>⟲</span>
          <span>{t(L('ثم تبدأ الحلقة من جديد', 'then the loop begins again'))}</span>
        </div>
      </div>
    </FigureFrame>
  )
}
