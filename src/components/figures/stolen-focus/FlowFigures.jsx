/*
 * Figures for the "flow state" deep-dive — drawn from Csikszentmihalyi's own
 * book *Flow* (1990), not from Stolen Focus.
 *
 * Hand-rolled SVG on purpose: the figure registry is lazy-loaded precisely to
 * keep recharts out of the entry chunk, and none of these three needs a charting
 * library. Adding one here would pull ~105 kB gzipped back into the section.
 *
 * No entrance animation anywhere (a settled user preference — POLISH-PLAN §6).
 */
import { useState } from 'react'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })

/* ---------------- The nine components ----------------
   Csikszentmihalyi's nine, split the way he himself splits them: the first
   three are *conditions* you can arrange before you start, the other six are
   *symptoms* that arrive on their own once you are in. That split is the whole
   practical point — you cannot will yourself into flow, you can only set the
   table for it. */
const CONDITIONS = [
  { k: 'goals', icon: '🎯', name: L('هدفٌ واضح', 'Clear goals'),
    body: L('تعرف في كلّ لحظة ما الخطوة التالية بالضبط. الغموض يستهلك الانتباه في السؤال «ماذا الآن؟» بدل العمل نفسه.',
            'At every moment you know exactly what the next step is. Ambiguity burns attention on “what now?” instead of on the work.') },
  { k: 'feedback', icon: '📶', name: L('تغذيةٌ راجعة فورية', 'Immediate feedback'),
    body: L('تعرف فوراً إن كنت تُحسن أم لا — الوتر نشاز، الحجر لم يستقرّ، السطر لا يقرأ. لا تنتظر تقييماً بعد شهر.',
            'You know at once whether it is going well — the note is off, the stone did not seat, the sentence does not read. You are not waiting a month for an appraisal.') },
  { k: 'balance', icon: '⚖️', name: L('توازن التحدّي والمهارة', 'Challenge meets skill'),
    body: L('المهمّة أصعب قليلاً ممّا تُتقن. أسهل فتملّ، أصعب بكثيرٍ فتقلق. الحافّة ضيّقة — ولهذا يحتاج التدفّق إلى ضبطٍ لا إلى حظّ.',
            'The task sits a little above what you have mastered. Easier and you are bored; much harder and you are anxious. The edge is narrow — which is why flow needs tuning, not luck.') },
]
const SYMPTOMS = [
  { k: 'merge', icon: '🔗', name: L('اندماج الفعل بالوعي', 'Action and awareness merge'),
    body: L('تتوقّف عن مراقبة نفسك وأنت تفعل؛ يصير الفعل والوعي به شيئاً واحداً.',
            'You stop watching yourself act; the doing and the awareness of doing become one thing.') },
  { k: 'focus', icon: '🎧', name: L('تركيزٌ يبتلع كلّ شيء', 'All-consuming concentration'),
    body: L('يضيق حقل الانتباه على المهمّة وحدها، فتسقط منه الهموم التي كانت تلاحقك قبل دقائق.',
            'The field of attention narrows onto the task alone, and the worries that chased you minutes ago simply drop out of it.') },
  { k: 'control', icon: '🎛️', name: L('إحساسٌ بالسيطرة', 'A sense of control'),
    body: L('لا سيطرةٌ فعلية على النتيجة، بل غياب القلق من فقدانها — فرقٌ دقيق يميّز التدفّق عن التوتّر.',
            'Not actual control over the outcome, but the absence of worry about losing it — a fine distinction that separates flow from strain.') },
  { k: 'self', icon: '🫥', name: L('اختفاء الوعي بالذات', 'Self-consciousness disappears'),
    body: L('يصمت الصوت الذي يسألك كيف تبدو وماذا يظنّون. وهذا تحديداً ما رُصد في الدماغ — انظر الشكل التالي.',
            'The voice asking how you look and what they think goes quiet. This is precisely what shows up in the brain — see the next figure.') },
  { k: 'time', icon: '⏳', name: L('تشوّه الزمن', 'Time distorts'),
    body: L('تمرّ ساعاتٌ كدقائق، أو تتمدّد ثانيةٌ واحدة كما يصفها الرياضيّون. الساعة الداخلية تتوقّف عن العدّ.',
            'Hours pass like minutes — or a single second stretches, as athletes describe it. The internal clock stops counting.') },
  { k: 'autotelic', icon: '♾️', name: L('غايةٌ في ذاته', 'Autotelic — an end in itself'),
    body: L('تفعله لأجل فعله. وهذا معيار تشيكسنتميهايي الأهمّ: لو زالت المكافأة الخارجية كلّها، هل تستمرّ؟',
            'You do it for its own sake. This is Csikszentmihalyi’s most telling criterion: if every external reward vanished, would you keep going?') },
]

export function SfFlowNine() {
  const { t } = useApp()
  const [open, setOpen] = useState('balance')
  const all = [...CONDITIONS, ...SYMPTOMS]
  const cur = all.find((c) => c.k === open)
  const Card = (c) => (
    <button key={c.k} className={`flow9-card ${open === c.k ? 'active' : ''}`}
      onClick={() => setOpen(c.k)} aria-pressed={open === c.k}>
      <span className="flow9-ic" aria-hidden>{c.icon}</span>
      <span className="flow9-nm">{t(c.name)}</span>
    </button>
  )
  return (
    <FigureFrame number={13}
      title={L('تشريح الحالة: العناصر التسعة', 'Anatomy of the state: the nine components')}
      caption={L('الثلاثة الأولى **شروطٌ ترتّبها أنت قبل أن تبدأ**؛ والستّة الباقية **أعراضٌ تأتيك وحدها** إن صحّت الشروط. انقر أيّ عنصرٍ لتفصيله.',
                 'The first three are **conditions you arrange before you start**; the other six are **symptoms that arrive on their own** if the conditions hold. Click any component for the detail.')}>
      <div className="flow9">
        <div className="flow9-col">
          <span className="flow9-hd cond">{t(L('شروطٌ ترتّبها', 'Conditions you set'))}</span>
          <div className="flow9-cards">{CONDITIONS.map(Card)}</div>
        </div>
        <div className="flow9-arrow" aria-hidden>↓</div>
        <div className="flow9-col">
          <span className="flow9-hd symp">{t(L('أعراضٌ تأتيك', 'Symptoms that follow'))}</span>
          <div className="flow9-cards">{SYMPTOMS.map(Card)}</div>
        </div>
      </div>
      <p className="flow9-detail" role="status">
        <strong>{t(cur.name)}</strong> — {t(cur.body)}
      </p>
    </FigureFrame>
  )
}

/* ---------------- The ratchet ----------------
   Csikszentmihalyi's own worked example (a boy learning tennis, "Alex" in the
   book). The point most summaries miss: flow is not a place you arrive at, it
   is a moving target. Skill grows -> the old challenge bores you -> you must
   raise it to get back in. That ratchet is why he calls flow the engine of a
   growing self, and it is exactly the part Stolen Focus leaves out. */
const STEPS = [
  { s: 18, c: 20, lbl: 'A1', zone: 'flow',
    note: L('يبدأ ألِكس بلا مهارة، وتحدٍّ صغير: أن يردّ الكرة فوق الشبكة. متوازنٌ تماماً — وهو في تدفّق.',
            'Alex starts with no skill and a small challenge: get the ball over the net. Perfectly matched — and he is in flow.') },
  { s: 78, c: 20, lbl: 'A2', zone: 'boredom',
    note: L('يتمرّن فتنمو مهارته. التحدّي نفسه لم يتغيّر — فصار مملّاً. الملل ليس فشلاً، إنه إشارة نموّ.',
            'He practises and his skill grows. The challenge has not moved — so it has gone stale. Boredom is not failure here; it is a growth signal.') },
  { s: 18, c: 82, lbl: 'A3', zone: 'anxiety',
    note: L('ولو واجه لاعباً أقوى منه بكثير قبل أن يتمرّن، لانقلبت الحالة إلى قلق — التحدّي فوق قدرته.',
            'And had he faced a far stronger player before practising, the state would flip to anxiety — challenge beyond his reach.') },
  { s: 80, c: 84, lbl: 'A4', zone: 'flow',
    note: L('الحلّ نفسه في الحالتين: ارفع التحدّي لتلحق بمهارتك، أو ارفع مهارتك لتلحق بالتحدّي. يعود التدفّق — لكن عند **مستوى أعقد**. ولهذا لا يمكن أن تتدفّق مرّتين في المكان نفسه.',
            'The fix is the same from either side: raise the challenge to meet your skill, or raise your skill to meet the challenge. Flow returns — but at a **more complex level**. Which is why you cannot flow twice in the same place.') },
]
export function SfFlowRatchet() {
  const { t } = useApp()
  const [i, setI] = useState(0)
  const step = STEPS[i]
  const px = (v) => 30 + (v / 100) * 240
  const py = (v) => 270 - (v / 100) * 240
  return (
    <FigureFrame number={15}
      title={L('لماذا لا تتدفّق مرّتين في المكان نفسه', 'Why you cannot flow twice in the same place')}
      caption={L('التدفّق هدفٌ متحرّك: كلّما نمت مهارتك، بهت التحدّي الذي كان يكفيك. تنقّل بين المراحل الأربع لترى المسار الذي يصفه تشيكسنتميهايي.',
                 'Flow is a moving target: as your skill grows, the challenge that used to fit goes flat. Step through the four stages to see the path Csikszentmihalyi describes.')}>
      <div className="flow-ratchet">
        <svg viewBox="0 0 300 300" className="ratchet-svg" role="img"
          aria-label={t({ ar: `المرحلة ${step.lbl}`, en: `Stage ${step.lbl}` })}>
          <rect x="30" y="30" width="120" height="120" fill="var(--violet-soft)" />
          <rect x="150" y="30" width="120" height="120" fill="var(--accent-soft)" />
          <rect x="30" y="150" width="120" height="120" fill="var(--bg-elev-2)" />
          <rect x="150" y="150" width="120" height="120" fill="var(--blue-soft)" />
          <line x1="30" y1="270" x2="270" y2="270" stroke="var(--border-strong)" strokeWidth="1.5" />
          <line x1="30" y1="30" x2="30" y2="270" stroke="var(--border-strong)" strokeWidth="1.5" />
          <line x1="30" y1="270" x2="270" y2="30" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" />
          {/* the path so far */}
          <polyline
            points={STEPS.slice(0, i + 1).map((p) => `${px(p.s)},${py(p.c)}`).join(' ')}
            fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" opacity="0.55" />
          {STEPS.map((p, j) => (
            <g key={p.lbl} opacity={j <= i ? 1 : 0.22}>
              <circle cx={px(p.s)} cy={py(p.c)} r={j === i ? 11 : 7}
                fill={j === i ? 'var(--accent)' : 'var(--bg-elev)'}
                stroke="var(--accent)" strokeWidth="2" />
              <text x={px(p.s)} y={py(p.c) - 16} textAnchor="middle"
                fontSize="13" fontWeight="700" fill="var(--text)">{p.lbl}</text>
            </g>
          ))}
        </svg>
        <div className="ratchet-axes" aria-hidden>
          <span>{t(L('← المهارة', 'skill →'))}</span>
          <span>{t(L('التحدّي ↑', '↑ challenge'))}</span>
        </div>
        <div className="ratchet-steps" role="group">
          {STEPS.map((p, j) => (
            <button key={p.lbl} className={`sf-preset ${i === j ? 'active' : ''}`} onClick={() => setI(j)}>
              {p.lbl}
            </button>
          ))}
        </div>
        <p className={`ratchet-note zone-${step.zone}`} role="status">{t(step.note)}</p>
      </div>
    </FigureFrame>
  )
}

/* ---------------- The brain during flow ----------------
   Two things are being shown and they must not be conflated:
   1. Dietrich's *transient hypofrontality* hypothesis (2003) — a proposal that
      absorbing states down-regulate the prefrontal cortex because the metabolic
      budget runs out.
   2. Limb & Braun's jazz fMRI (PLOS ONE, 2008) — an actual measurement, and the
      one clinical result that fits: improvising pianists showed dorsolateral
      prefrontal + lateral orbital DEACTIVATION alongside medial prefrontal
      ACTIVATION.
   The figure states the second as measurement and the first as hypothesis. It
   deliberately does NOT repeat the popular "flow neurochemical cocktail"
   (dopamine/endorphins/anandamide) claim, which is a popularisation with no
   comparable evidence behind it. */
const BRAIN_MODES = {
  rehearsed: {
    label: L('يعزف مقطوعةً محفوظة', 'Playing a memorised piece'),
    dlpfc: 1, mpfc: 0.35,
    note: L('العزف المحفوظ: قشرة الجبهة الجانبية (DLPFC) نشطة — الرقيب الداخلي يعمل، يراقب ويصحّح ويقارن بالمعيار.',
            'Rehearsed playing: the dorsolateral prefrontal cortex is active — the internal monitor is on, checking, correcting, comparing against the standard.') },
  improv: {
    label: L('يرتجل بحرّية', 'Improvising freely'),
    dlpfc: 0.18, mpfc: 1,
    note: L('الارتجال: تهبط (DLPFC) والقشرة الحجاجية الجانبية بوضوح، وترتفع القشرة الجبهية الإنسية (mPFC) — أي يخفت الرقيب ويعلو التعبير عن الذات. هذا هو «اختفاء الوعي بالذات» مقيساً لا موصوفاً.',
            'Improvising: the DLPFC and lateral orbital regions drop markedly while the medial prefrontal cortex rises — the monitor dims and self-expression takes over. This is “self-consciousness disappears,” measured rather than described.') },
}
export function SfFlowBrain() {
  const { t } = useApp()
  const [mode, setMode] = useState('improv')
  const m = BRAIN_MODES[mode]
  const shade = (v) => `color-mix(in srgb, var(--accent) ${Math.round(v * 78)}%, var(--bg-elev-2))`
  return (
    <FigureFrame number={14}
      title={L('ماذا يُطفَأ في الدماغ حين تتدفّق؟', 'What switches off in the brain during flow?')}
      caption={L('قاس **تشارلز ليمب وألن براون** ستّة عازفي جاز محترفين داخل ماسح الرنين المغناطيسي (٢٠٠٨) وهم يعزفون مقطوعةً محفوظة ثم يرتجلون. بدّل بين الحالتين. **تنبيه:** هذه نتيجةٌ على الارتجال لا على «التدفّق» بعنوانه العريض، وعيّنتها ستّة أشخاص.',
                 '**Charles Limb and Allen Braun** scanned six professional jazz pianists (2008) playing a memorised piece and then improvising. Switch between the two. **Caveat:** this is a result about improvisation, not about “flow” at large, and the sample was six people.')}>
      <div className="flow-brain">
        <div className="brain-modes" role="group">
          {Object.entries(BRAIN_MODES).map(([k, v]) => (
            <button key={k} className={`sf-preset ${mode === k ? 'active' : ''}`} onClick={() => setMode(k)}>
              {t(v.label)}
            </button>
          ))}
        </div>
        <svg viewBox="0 0 320 220" className="brain-svg" role="img"
          aria-label={t(m.label)}>
          {/* stylised lateral brain outline, front to the left */}
          <path d="M40,120 C36,74 74,40 126,38 C186,36 236,54 258,84 C280,114 274,152 246,168
                   C222,182 176,188 130,184 C86,180 46,162 40,120 Z"
            fill="var(--bg-elev-2)" stroke="var(--border-strong)" strokeWidth="2" />
          {/* cerebellum + stem, so it reads as a brain not a blob */}
          <path d="M232,168 C252,178 258,196 240,202 C218,208 196,198 192,186"
            fill="var(--bg-elev-2)" stroke="var(--border-strong)" strokeWidth="2" />
          {/* DLPFC — front upper-lateral */}
          <ellipse cx="86" cy="92" rx="34" ry="30" fill={shade(m.dlpfc)}
            stroke="var(--accent)" strokeWidth="2" />
          {/* medial prefrontal / frontal pole — front lower */}
          <ellipse cx="70" cy="146" rx="26" ry="22" fill={shade(m.mpfc)}
            stroke="var(--accent)" strokeWidth="2" />
        </svg>
        <ul className="brain-key">
          <li>
            <span className="brain-dot" style={{ background: shade(m.dlpfc) }} aria-hidden />
            <b>DLPFC</b> — {t(L('الرقيب: المراقبة والتصحيح والحكم على النفس', 'the monitor: self-watching, correcting, judging'))}
            <span className="brain-lvl">{m.dlpfc > 0.6 ? t(L('نشطة', 'active')) : t(L('منخفضة', 'down'))}</span>
          </li>
          <li>
            <span className="brain-dot" style={{ background: shade(m.mpfc) }} aria-hidden />
            <b>mPFC</b> — {t(L('التعبير عن الذات وتوليد ما هو داخليّ المنشأ', 'self-expression, generating what comes from within'))}
            <span className="brain-lvl">{m.mpfc > 0.6 ? t(L('نشطة', 'active')) : t(L('منخفضة', 'down'))}</span>
          </li>
        </ul>
        <p className="brain-note" role="status">{t(m.note)}</p>
      </div>
    </FigureFrame>
  )
}
