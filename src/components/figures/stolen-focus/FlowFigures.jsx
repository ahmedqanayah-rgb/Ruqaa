/*
 * Figures for the "flow state" deep-dive — drawn from Csikszentmihalyi's own
 * book *Flow* (1990) and the underlying papers, not from Stolen Focus.
 *
 * Hand-rolled SVG on purpose: the figure registry is lazy-loaded precisely to
 * keep recharts out of the entry chunk, and none of these needs a charting
 * library. Adding one would pull ~105 kB gzipped into a text section.
 *
 * No entrance animation anywhere (a settled user preference — POLISH-PLAN §6).
 * Transitions on state *changes* are fine and are what make these readable.
 */
import { useState } from 'react'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })

/* ============================================================
   Fig 13 — The paradox of work
   ============================================================
   Csikszentmihalyi & LeFevre, JPSP 1989 (78 workers, one week of pager
   signals). The abstract is unusually quotable and is the whole figure:
   every measure of experience quality is more affected by *flow* than by
   whether you are at work or at leisure — EXCEPT relaxation and motivation.
   And the great majority of flow moments happen at work.

   Deliberately NOT a bar chart. The paper's exact work-vs-leisure percentages
   could not be traced to a primary source, and inventing plausible bar heights
   is exactly the failure the 23-minute entry in reception.js documents. So this
   shows the *direction and the split*, which are sourced, and says so. */
const PARADOX = {
  work: {
    key: 'work', label: L('في العمل', 'At work'), icon: '🛠️',
    flow: 'high', want: 'low',
    line: L('هنا تحدث الغالبية العظمى من لحظات التدفّق — ومع ذلك تقول: أتمنّى لو كنت في مكانٍ آخر.',
            'This is where the great majority of flow moments happen — and yet you say: I would rather be somewhere else.'),
  },
  leisure: {
    key: 'leisure', label: L('في الفراغ', 'At leisure'), icon: '🛋️',
    flow: 'low', want: 'high',
    line: L('هنا تقلّ لحظات التدفّق كثيراً — ومع ذلك تقول: لا أريد أن أكون في مكانٍ آخر.',
            'This is where flow moments are far rarer — and yet you say: I do not want to be anywhere else.'),
  },
}
const TRACKS_FLOW = [
  L('التركيز', 'Concentration'), L('الإبداع', 'Creativity'), L('الرضا', 'Satisfaction'),
  L('النشاط', 'Activity'), L('اليقظة', 'Alertness'), L('تقدير الذات', 'Self-esteem'),
]
export function SfFlowParadox() {
  const { t } = useApp()
  const [side, setSide] = useState('work')
  const cur = PARADOX[side]
  const Meter = ({ label, level, tone }) => (
    <div className="pdx-meter">
      <span className="pdx-meter-lbl">{t(label)}</span>
      <div className={`pdx-bar ${tone} ${level}`} aria-hidden>
        <i style={{ inlineSize: level === 'high' ? '86%' : '22%' }} />
      </div>
      <span className="pdx-meter-val">{level === 'high' ? t(L('مرتفع', 'high')) : t(L('منخفض', 'low'))}</span>
    </div>
  )
  return (
    <FigureFrame number={13}
      title={L('مفارقة العمل', 'The paradox of work')}
      caption={L('٧٨ عاملاً، أسبوعٌ كامل، أجهزة نداءٍ ترنّ عشوائياً (سيزنتميهالي ولوفيفر، ١٩٨٩). بدّل بين الحالتين، ثم انظر أسفل الشكل إلى الاكتشاف الأدقّ: **ما الذي يتبع تدفّقك، وما الذي يتبع مكانك فقط.** *الشكل يعرض الاتجاه لا المقادير — الأرقام الدقيقة للورقة لم نتمكّن من ردّها إلى مصدرها الأصلي، فلم نخترعها.*',
                 '78 workers, one full week, pagers going off at random (Csikszentmihalyi & LeFevre, 1989). Switch between the two states, then look below the figure for the sharper finding: **what follows your flow, and what follows only your location.** *This shows direction, not magnitudes — the paper’s exact percentages could not be traced to a primary source, so we did not invent them.*')}>
      <div className="paradox">
        <div className="pdx-switch" role="group">
          {Object.values(PARADOX).map((p) => (
            <button key={p.key} className={`sf-preset ${side === p.key ? 'active' : ''}`}
              onClick={() => setSide(p.key)}>
              <span aria-hidden>{p.icon}</span> {t(p.label)}
            </button>
          ))}
        </div>
        <div className="pdx-panel">
          <Meter label={L('لحظات التدفّق المرصودة', 'Flow moments recorded')} level={cur.flow} tone="flow" />
          <Meter label={L('رغبتك في أن تكون هنا', 'Wanting to be here')} level={cur.want} tone="want" />
          <p className="pdx-line" role="status">{t(cur.line)}</p>
        </div>
        <div className="pdx-split">
          <div className="pdx-col follows-flow">
            <span className="pdx-col-hd">{t(L('يتبع تدفّقك', 'Follows your flow'))}</span>
            <div className="pdx-chips">
              {TRACKS_FLOW.map((x, i) => <span key={i} className="pdx-chip">{t(x)}</span>)}
              <span className="pdx-chip more">{t(L('وبقيّة مقاييس جودة الخبرة', 'and every other quality measure'))}</span>
            </div>
          </div>
          <div className="pdx-col follows-place">
            <span className="pdx-col-hd">{t(L('يتبع مكانك أنت', 'Follows only where you are'))}</span>
            <div className="pdx-chips">
              <span className="pdx-chip warn">{t(L('الاسترخاء', 'Relaxation'))}</span>
              <span className="pdx-chip warn">{t(L('الدافع', 'Motivation'))}</span>
            </div>
            <p className="pdx-col-note">{t(L('استثناءان اثنان فقط — وأحدهما هو الدافع. أي أن البوصلة التي تقودك هي الشيء الوحيد تقريباً الذي لا يشير إلى أفضل لحظاتك.',
                                             'Exactly two exceptions — and one of them is motivation. The compass steering you is almost the only thing that does not point at your best moments.'))}</p>
          </div>
        </div>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 14 — The nine components, as a gate you either open or don't
   ============================================================
   The static-card version of this taught the list but not the mechanism. The
   point of Csikszentmihalyi's split is causal: the first three are conditions
   you arrange, the other six are consequences you cannot summon directly. So
   the figure is a gate — switch a condition off and watch the six consequences
   go dark, with a readout naming what you get *instead*. You can feel that you
   cannot decide your way into flow. */
const CONDITIONS = [
  { k: 'goal', icon: '🎯', name: L('هدفٌ واضح', 'A clear goal'),
    on: L('تعرف في كلّ لحظة ما الخطوة التالية.', 'At every moment you know the next step.'),
    off: L('بلا هدفٍ واضح يتبدّد الانتباه في السؤال «ماذا الآن؟». الحالة الناتجة: **تشتّت**، لا تدفّق.',
           'With no clear goal, attention leaks into “what now?”. What you get instead: **scatter**, not flow.') },
  { k: 'feedback', icon: '📶', name: L('تغذيةٌ راجعة فورية', 'Immediate feedback'),
    on: L('تعرف فوراً إن كنت تُحسن أم لا.', 'You know at once whether it is going well.'),
    off: L('بلا تغذيةٍ راجعة تضطرّ إلى الحكم على نفسك من الخارج باستمرار. الحالة الناتجة: **قلقٌ من الأداء**.',
           'With no feedback you must keep judging yourself from outside. What you get instead: **performance anxiety**.') },
  { k: 'balance', icon: '⚖️', name: L('تحدٍّ عند حافّة مهارتك', 'Challenge at your skill’s edge'),
    on: L('أصعب قليلاً ممّا تُتقن — لا أكثر.', 'A little above what you have mastered — no more.'),
    off: L('أسهل من مهارتك فتملّ، أصعب بكثيرٍ فتقلق. الحالة الناتجة: **مللٌ أو قلق** بحسب أيّ الطرفين اختلّ.',
           'Below your skill you are bored; far above it you are anxious. What you get instead: **boredom or anxiety**, depending which way it tipped.') },
]
const SYMPTOMS = [
  { icon: '🔗', name: L('يندمج الفعل بالوعي', 'Action merges with awareness') },
  { icon: '🎧', name: L('يبتلعك التركيز', 'Concentration consumes you') },
  { icon: '🎛️', name: L('يهدأ الخوف من الفشل', 'The fear of failing quiets') },
  { icon: '🫥', name: L('يختفي الوعي بالذات', 'Self-consciousness disappears') },
  { icon: '⏳', name: L('يتشوّه الزمن', 'Time distorts') },
  { icon: '♾️', name: L('يصير غايةً في ذاته', 'It becomes an end in itself') },
]
export function SfFlowNine() {
  const { t } = useApp()
  const [on, setOn] = useState({ goal: true, feedback: true, balance: true })
  const missing = CONDITIONS.filter((c) => !on[c.k])
  const open = missing.length === 0
  return (
    <FigureFrame number={14}
      title={L('البوّابة: ثلاثةٌ تصنعها، وستّةٌ تأتيك', 'The gate: three you build, six that arrive')}
      caption={L('العناصر التسعة لا تقف في صفٍّ واحد. الثلاثة الأولى **شروطٌ ترتّبها قبل أن تبدأ**، والستّة الباقية **نتائج لا تُستدعى بالإرادة**. أطفئ أيّ شرطٍ وانظر ماذا يحدث للنتائج — وماذا تحصل عليه بدلاً منها.',
                 'The nine components do not sit in one row. The first three are **conditions you arrange before you start**; the other six are **consequences you cannot summon by willing them**. Switch off any condition and watch the consequences go — and see what you get instead.')}>
      <div className={`gate ${open ? 'open' : 'shut'}`}>
        <div className="gate-conds">
          {CONDITIONS.map((c) => (
            <button key={c.k} className={`gate-cond ${on[c.k] ? 'on' : 'off'}`}
              onClick={() => setOn((s) => ({ ...s, [c.k]: !s[c.k] }))}
              aria-pressed={on[c.k]}>
              <span className="gate-ic" aria-hidden>{c.icon}</span>
              <span className="gate-nm">{t(c.name)}</span>
              <span className="gate-sw" aria-hidden><i /></span>
            </button>
          ))}
        </div>

        <div className="gate-flow" aria-hidden>
          <span className={`gate-pipe ${open ? 'lit' : ''}`} />
          <span className="gate-verdict">{open ? '▼' : '✕'}</span>
          <span className={`gate-pipe ${open ? 'lit' : ''}`} />
        </div>

        <div className="gate-symptoms">
          {SYMPTOMS.map((s, i) => (
            <span key={i} className={`gate-symp ${open ? 'lit' : ''}`}>
              <span aria-hidden>{s.icon}</span> {t(s.name)}
            </span>
          ))}
        </div>

        <p className={`gate-readout ${open ? 'good' : 'bad'}`} role="status">
          {open
            ? t(L('**الشروط الثلاثة قائمة.** لاحظ أنك لم «تختر» أياً من الستّة أدناه — أنت رتّبت الطاولة فحسب، والباقي جاء وحده. هذا كلّ ما يمكنك فعله، وهو يكفي.',
                  '**All three conditions hold.** Notice you did not “choose” any of the six below — you set the table, and the rest arrived on its own. That is all you can do, and it is enough.'))
            : t(missing[0].off)}
        </p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 15 — The brain during improvisation
   ============================================================
   Two things shown, and they must not be conflated:
   1. Dietrich's *transient hypofrontality* hypothesis (2003) — a proposal.
   2. Limb & Braun's jazz fMRI (PLOS ONE 2008) — an actual measurement, and the
      one clinical result that fits: improvising pianists showed dorsolateral
      prefrontal + lateral orbital DEACTIVATION with medial prefrontal
      ACTIVATION.
   The figure states the second as measurement and the first as hypothesis, and
   deliberately omits the popular "neurochemical cocktail" claim, which has
   nothing like comparable evidence.

   IMAGE: if public/images/flow/brain-lateral.webp exists it is used as the
   base, with the two regions overlaid at percentage coordinates tuned for a
   LEFT-FACING lateral view. If the file is missing the <img> hides itself on
   error and the schematic SVG underneath carries the figure alone — same
   pattern as ClubBanner, so a missing photo degrades instead of breaking. */
const BRAIN_MODES = {
  rehearsed: {
    label: L('يعزف مقطوعةً محفوظة', 'Playing a memorised piece'), icon: '🎼',
    dlpfc: 1, mpfc: 0.3,
    note: L('العزف المحفوظ: **قشرة الجبهة الجانبية الظهرية (DLPFC) نشطة** — الرقيب الداخلي يعمل بكامل طاقته: يراقب، ويصحّح، ويقارن بالمعيار المحفوظ.',
            'Rehearsed playing: **the dorsolateral prefrontal cortex is active** — the internal monitor running at full power: watching, correcting, comparing against the memorised standard.') },
  improv: {
    label: L('يرتجل بحرّية', 'Improvising freely'), icon: '🎹',
    dlpfc: 0.16, mpfc: 1,
    note: L('الارتجال: **تهبط DLPFC بوضوح وترتفع القشرة الجبهية الإنسية (mPFC)** — يخفت الرقيب ويعلو التعبير النابع من الداخل. هذا هو «اختفاء الوعي بالذات» مقيساً لا موصوفاً.',
            'Improvising: **the DLPFC drops markedly while the medial prefrontal cortex rises** — the monitor dims and expression from within takes over. This is “self-consciousness disappears,” measured rather than described.') },
}
export function SfFlowBrain() {
  const { t } = useApp()
  const [mode, setMode] = useState('improv')
  const [hasPhoto, setPhoto] = useState(true)
  const m = BRAIN_MODES[mode]
  const Region = ({ cls, level, label, abbr }) => (
    <span className={`brain-hot ${cls}`} style={{ opacity: 0.18 + level * 0.72 }}
      title={`${abbr} — ${t(label)}`} aria-hidden />
  )
  return (
    <FigureFrame number={15}
      title={L('ماذا يُطفَأ في الدماغ حين تذوب في عملك؟', 'What switches off when you dissolve into your work?')}
      caption={L('أدخل **تشارلز ليمب وألن براون** ستّة عازفي جاز محترفين إلى ماسح رنينٍ مغناطيسيّ بلوحة مفاتيحَ بلاستيكية (٢٠٠٨)، وطلبا منهم أن يعزفوا مقطوعةً محفوظة ثم أن يرتجلوا. بدّل بين الحالتين وراقب المنطقتين.',
                 '**Charles Limb and Allen Braun** put six professional jazz pianists into an fMRI scanner with a plastic keyboard (2008) and asked them to play a memorised piece, then to improvise. Switch between the two and watch the two regions.')}>
      <div className="flow-brain">
        <div className="brain-modes" role="group">
          {Object.entries(BRAIN_MODES).map(([k, v]) => (
            <button key={k} className={`sf-preset ${mode === k ? 'active' : ''}`} onClick={() => setMode(k)}>
              <span aria-hidden>{v.icon}</span> {t(v.label)}
            </button>
          ))}
        </div>

        <div className="brain-stage" role="img" aria-label={t(m.label)}>
          {/* Schematic base — also the fallback if no photo has been supplied. */}
          <svg viewBox="0 0 320 210" className="brain-svg" aria-hidden>
            <path d="M42,116 C38,72 76,40 128,38 C188,36 236,54 258,84 C280,114 272,150 244,166
                     C220,178 174,184 128,180 C84,176 48,158 42,116 Z"
              fill="var(--bg-elev-2)" stroke="var(--border-strong)" strokeWidth="2" />
            <path d="M230,166 C250,176 256,194 238,200 C216,206 194,196 190,184"
              fill="var(--bg-elev-2)" stroke="var(--border-strong)" strokeWidth="2" />
            {/* a few sulci so it reads as a brain, not a bean */}
            <g stroke="var(--border-strong)" strokeWidth="1.4" fill="none" opacity="0.55">
              <path d="M92,60 C110,78 104,96 120,104" />
              <path d="M150,46 C162,70 150,88 166,102" />
              <path d="M200,52 C210,76 196,92 210,108" />
            </g>
          </svg>
          {hasPhoto && (
            <img className="brain-photo" src="./images/flow/brain-lateral.webp" alt=""
              onError={() => setPhoto(false)} />
          )}
          <Region cls="dlpfc" level={m.dlpfc} abbr="DLPFC"
            label={L('قشرة الجبهة الجانبية الظهرية', 'dorsolateral prefrontal cortex')} />
          <Region cls="mpfc" level={m.mpfc} abbr="mPFC"
            label={L('القشرة الجبهية الإنسية', 'medial prefrontal cortex')} />
          <span className="brain-tag dlpfc">DLPFC</span>
          <span className="brain-tag mpfc">mPFC</span>
        </div>

        <ul className="brain-key">
          <li>
            <b>DLPFC</b>
            <span className="brain-role">{t(L('الرقيب — المراقبة والتصحيح والحكم على النفس', 'the monitor — watching, correcting, self-judging'))}</span>
            <span className="brain-track" aria-hidden><i className="down" style={{ inlineSize: `${m.dlpfc * 100}%` }} /></span>
            <span className={`brain-lvl ${m.dlpfc > 0.6 ? 'up' : 'dn'}`}>
              {m.dlpfc > 0.6 ? t(L('نشطة', 'active')) : t(L('منخفضة', 'down'))}
            </span>
          </li>
          <li>
            <b>mPFC</b>
            <span className="brain-role">{t(L('التعبير عن الذات وتوليد ما هو داخليّ المنشأ', 'self-expression, generating from within'))}</span>
            <span className="brain-track" aria-hidden><i className="up" style={{ inlineSize: `${m.mpfc * 100}%` }} /></span>
            <span className={`brain-lvl ${m.mpfc > 0.6 ? 'up' : 'dn'}`}>
              {m.mpfc > 0.6 ? t(L('نشطة', 'active')) : t(L('منخفضة', 'down'))}
            </span>
          </li>
        </ul>
        <p className="brain-note" role="status">{t(m.note)}</p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 16 — The ratchet
   ============================================================
   Csikszentmihalyi's own worked example (a boy learning tennis, "Alex").
   Two panels, because the idea only lands with both: the LEFT panel is the
   familiar challenge/skill plane, and the RIGHT is the same four moments
   plotted as complexity over time. The left shows you keep returning to flow;
   the right shows each return is higher than the last. That second panel is
   the part Stolen Focus never gets to. */
const STEPS = [
  { s: 18, c: 20, lbl: 'A1', zone: 'flow',
    head: L('يبدأ', 'He begins'),
    note: L('ألِكس بلا مهارةٍ تقريباً، وتحدٍّ صغير: أن يردّ الكرة فوق الشبكة. الطرفان متساويان — وهو في تدفّق. لاحظ أن التدفّق هنا **لا يتطلّب براعة**، بل تطابقاً.',
            'Alex has almost no skill and a small challenge: get the ball over the net. The two match — and he is in flow. Note that flow here **requires no excellence**, only a match.') },
  { s: 78, c: 20, lbl: 'A2', zone: 'boredom',
    head: L('يتحسّن — فيملّ', 'He improves — and goes flat'),
    note: L('يتمرّن فتنمو مهارته، والتحدّي واقفٌ مكانه. النتيجة ملل. والمهمّ: **الملل هنا ليس فشلاً بل إشارة نجاح** — لقد أتقنتَ ما كان يكفيك.',
            'He practises, his skill grows, the challenge stays put. The result is boredom. And crucially: **boredom here is not failure but a success signal** — you have mastered what used to fit.') },
  { s: 18, c: 82, lbl: 'A3', zone: 'anxiety',
    head: L('الطريق الآخر للخروج', 'The other way out'),
    note: L('ولو واجه لاعباً أقوى منه بكثير قبل أن يتمرّن، لخرج من التدفّق من الجهة المقابلة: قلق. الإشارتان مختلفتان والعلاج واحد — أعد ضبط المسافة بين الطرفين.',
            'Had he faced a far stronger player before practising, he would have left flow from the opposite side: anxiety. Different signals, one remedy — reset the distance between the two.') },
  { s: 80, c: 84, lbl: 'A4', zone: 'flow',
    head: L('يعود — أعلى', 'He returns — higher'),
    note: L('يرفع التحدّي ليلحق بمهارته، فيعود التدفّق. لكنّه **ليس التدفّق نفسه**: المهارة أكبر، والتحدّي أكبر، والحالة أعقد. ولهذا لا يمكن أن تتدفّق مرّتين في المكان نفسه — النجاح فيه ينقلك منه.',
            'He raises the challenge to meet his skill, and flow returns. But it is **not the same flow**: greater skill, greater challenge, a more complex state. Which is why you cannot flow twice in the same place — succeeding at it moves you out of it.') },
]
export function SfFlowRatchet() {
  const { t } = useApp()
  const [i, setI] = useState(0)
  const step = STEPS[i]
  const px = (v) => 34 + (v / 100) * 232
  const py = (v) => 266 - (v / 100) * 232
  // complexity = how far from the origin the pair sits; the staircase panel.
  const complexity = (p) => Math.round(Math.sqrt(p.s * p.c))
  return (
    <FigureFrame number={16}
      title={L('لماذا لا تتدفّق مرّتين في المكان نفسه', 'Why you cannot flow twice in the same place')}
      caption={L('اليسار: المستوى المألوف — تحدٍّ في مقابل مهارة. اليمين: **اللوحة التي تُنسى عادةً** — المواضع الأربعة نفسها مرتّبةً على الزمن. الأولى تقول إنك تعود إلى التدفّق؛ والثانية تقول إن كلّ عودةٍ أعلى من سابقتها.',
                 'Left: the familiar plane — challenge against skill. Right: **the panel usually left out** — those same four moments laid out over time. The first says you keep returning to flow; the second says each return is higher than the last.')}>
      <div className="ratchet">
        <div className="ratchet-panels">
          {/* ---- plane ---- */}
          <figure className="ratchet-pane">
            <svg viewBox="0 0 300 300" className="ratchet-svg" role="img"
              aria-label={t({ ar: `المرحلة ${step.lbl}`, en: `Stage ${step.lbl}` })}>
              <rect x="34" y="34" width="116" height="116" fill="var(--violet-soft)" />
              <rect x="150" y="34" width="116" height="116" fill="var(--accent-soft)" />
              <rect x="34" y="150" width="116" height="116" fill="var(--bg-elev-2)" />
              <rect x="150" y="150" width="116" height="116" fill="var(--blue-soft)" />
              <text x="92" y="96" className="rt-zone" textAnchor="middle">{t(L('قلق', 'Anxiety'))}</text>
              <text x="208" y="96" className="rt-zone" textAnchor="middle">{t(L('تدفّق', 'Flow'))}</text>
              <text x="92" y="212" className="rt-zone" textAnchor="middle">{t(L('لا مبالاة', 'Apathy'))}</text>
              <text x="208" y="212" className="rt-zone" textAnchor="middle">{t(L('ملل', 'Boredom'))}</text>
              <line x1="34" y1="266" x2="266" y2="266" stroke="var(--border-strong)" strokeWidth="1.5" />
              <line x1="34" y1="34" x2="34" y2="266" stroke="var(--border-strong)" strokeWidth="1.5" />
              <line x1="34" y1="266" x2="266" y2="34" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.8" />
              <polyline points={STEPS.slice(0, i + 1).map((p) => `${px(p.s)},${py(p.c)}`).join(' ')}
                fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round"
                strokeLinecap="round" opacity="0.5" />
              {STEPS.map((p, j) => (
                <g key={p.lbl} className={`rt-pt ${j === i ? 'cur' : ''} ${j <= i ? 'seen' : ''}`}>
                  <circle cx={px(p.s)} cy={py(p.c)} r={j === i ? 12 : 7}
                    fill={j === i ? 'var(--accent)' : 'var(--bg-elev)'}
                    stroke="var(--accent)" strokeWidth="2.5" />
                  <text x={px(p.s)} y={py(p.c) + (j === i ? 4 : 4)} textAnchor="middle"
                    className="rt-lbl" fill={j === i ? 'var(--accent-contrast)' : 'var(--text-soft)'}>
                    {j === i ? p.lbl.slice(1) : ''}
                  </text>
                </g>
              ))}
            </svg>
            <figcaption className="ratchet-axis">
              <span>{t(L('المهارة ←', '← skill'))}</span><span>{t(L('↑ التحدّي', 'challenge ↑'))}</span>
            </figcaption>
          </figure>

          {/* ---- staircase ---- */}
          <figure className="ratchet-pane">
            <svg viewBox="0 0 300 300" className="ratchet-svg" role="img"
              aria-label={t({ ar: 'تعقيدٌ يتصاعد مع الزمن', en: 'complexity rising over time' })}>
              <line x1="34" y1="266" x2="278" y2="266" stroke="var(--border-strong)" strokeWidth="1.5" />
              <line x1="34" y1="24" x2="34" y2="266" stroke="var(--border-strong)" strokeWidth="1.5" />
              {STEPS.map((p, j) => {
                const x = 60 + j * 62
                const h = (complexity(p) / 92) * 220
                const isFlow = p.zone === 'flow'
                return (
                  <g key={p.lbl} opacity={j <= i ? 1 : 0.2}>
                    <rect x={x - 21} y={266 - h} width="42" height={h} rx="6"
                      fill={isFlow ? 'var(--accent)' : 'var(--bg-elev-2)'}
                      stroke={isFlow ? 'var(--accent)' : 'var(--border-strong)'} strokeWidth="2"
                      opacity={j === i ? 1 : 0.75} />
                    <text x={x} y={266 - h - 9} textAnchor="middle" className="rt-lbl2">{p.lbl}</text>
                    <text x={x} y={284} textAnchor="middle" className="rt-zone">
                      {isFlow ? t(L('تدفّق', 'flow')) : (p.zone === 'boredom' ? t(L('ملل', 'bored')) : t(L('قلق', 'anxious')))}
                    </text>
                  </g>
                )
              })}
              {/* the two flow moments, joined to show the lift */}
              {i >= 3 && (
                <line x1="60" y1={266 - (complexity(STEPS[0]) / 92) * 220}
                  x2={60 + 3 * 62} y2={266 - (complexity(STEPS[3]) / 92) * 220}
                  stroke="var(--success)" strokeWidth="2.5" strokeDasharray="6 5" />
              )}
            </svg>
            <figcaption className="ratchet-axis">
              <span>{t(L('الزمن ←', '← time'))}</span><span>{t(L('↑ التعقيد', 'complexity ↑'))}</span>
            </figcaption>
          </figure>
        </div>

        <div className="ratchet-steps" role="group">
          {STEPS.map((p, j) => (
            <button key={p.lbl} className={`sf-preset ${i === j ? 'active' : ''}`} onClick={() => setI(j)}>
              {p.lbl}
            </button>
          ))}
        </div>
        <div className={`ratchet-note zone-${step.zone}`} role="status">
          <strong>{step.lbl} · {t(step.head)}</strong>
          <p>{t(step.note)}</p>
        </div>
      </div>
    </FigureFrame>
  )
}
