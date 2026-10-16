/*
 * Figures for «الدَّين والربا والأنظمة الثلاثة» — the club's companion to the
 * Varoufakis book, figures 10–20. Every figure here was a figure in the club's
 * own PDF of the same name; the data ones carry exactly its numbers and its
 * sources, and nothing is interpolated between them.
 *
 * HTML, not SVG, for anything with words in it. The PDF drew its contract
 * sequences as lifeline diagrams; scaled to a phone those labels land at about
 * 7px. A numbered list of "who hands what to whom" says the same thing and
 * reads at any width and in either direction. The two charts that are genuinely
 * curves (11, 13) are the exception.
 *
 * Same rules as EconomyFigures.jsx: no recharts, no entrance animation, every
 * body string through RichText.
 */
import { useState } from 'react'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'
import RichText from '../../RichText.jsx'
import './economy.css'

const L = (ar, en) => ({ ar, en })

/* ---------- shared: who hands what to whom ----------
   steps: { from, to, what, kind: 'money' | 'asset' | 'promise' } */
const KIND = {
  money: L('مال', 'money'),
  asset: L('أصل أو سلعة', 'asset or good'),
  promise: L('وعدٌ أو حقّ انتفاع', 'a promise or right of use'),
}
function SeqList({ actors, steps }) {
  const { t } = useApp()
  const arrow = t(L('←', '→'))
  return (
    <ol className="td-seq">
      {steps.map((s, i) => (
        <li key={i} className={`td-seq-row ${s.kind}`}>
          <span className="td-seq-n">{i + 1}</span>
          <span className="td-seq-who">
            <span className="td-seq-actor">{t(actors[s.from])}</span>
            <span className="td-seq-arrow" aria-hidden>{arrow}</span>
            <span className="td-seq-actor">{t(actors[s.to])}</span>
          </span>
          <span className="td-seq-what"><RichText value={s.what} /></span>
          <span className="td-seq-kind">{t(KIND[s.kind])}</span>
        </li>
      ))}
    </ol>
  )
}

/* ---------- shared: labelled horizontal bars ---------- */
function BarList({ rows, unit, share }) {
  const { t, isAr } = useApp()
  const max = Math.max(...rows.map((r) => r.v))
  return (
    <div className="td-bars">
      {rows.map((r, i) => (
        <div key={i} className="td-bars-row">
          <span className="td-bars-lbl">{t(r.label)}{isAr && r.en && <small>{r.en}</small>}</span>
          <div className="td-bars-track" aria-hidden><i style={{ inlineSize: `${Math.max((r.v / max) * 100, 0.6)}%` }} /></div>
          <span className="td-bars-v">{share ? `${r.share}%` : `${r.v}%`}{share && <small>{r.v.toLocaleString('en')} {t(unit)}</small>}</span>
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   Fig 10 — Two paths on interest
   ============================================================ */
const PATHS = [
  { era: L('قبل الميلاد', 'Antiquity'),
    eu: { ban: false, text: L('أرسطو: الفائدة مالٌ يولّد مالاً من نفسه، وهذا ممقوت.', 'Aristotle: interest is money begetting money from itself — and that is hateful.') } },
  { era: L('القرن السابع', '7th century'),
    is: { ban: true, text: L('القرآن: ﴿وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا﴾', 'The Qur’an: “Allah has permitted trade and forbidden riba.”') } },
  { era: L('العصور الوسطى', 'Middle Ages'),
    eu: { ban: true, text: L('الكنيسة: كلّ زيادةٍ على القرض خطيئةٌ اسمها الربا (usury).', 'The Church: any increase on a loan is a sin, called usury.') },
    is: { ban: true, text: L('الفقه: التحريم ثابت، والتمويل بالمشاركة والمضاربة والبيوع.', 'Jurisprudence: the ban holds; finance runs on partnership, profit-sharing and sales.') } },
  { era: L('القرنان ١٦ و١٧', '16th–17th centuries'),
    eu: { ban: false, text: L('**١٥٤٥** إنكلترا تجيز الفائدة تحت سقفٍ قانوني. البروتستانت يقبلون القرض بفائدة. ومارلو يسوق فاوست إلى الجحيم.', '**1545**: England allows interest under a legal cap. Protestants accept lending at interest. Marlowe still sends Faustus to hell.') } },
  { era: L('القرن التاسع عشر', '19th century'),
    eu: { ban: false, text: L('غوته: فاوست ينجو، وصارت الفائدة سعراً عادياً.', 'Goethe: Faust is saved, and interest has become an ordinary price.') } },
  { era: L('القرنان ٢٠ و٢١', '20th–21st centuries'),
    eu: { ban: false, text: L('البنوك تخلق المال بالإقراض، وصار الدَّين وقود الاقتصاد.', 'Banks create money by lending, and debt has become the economy’s fuel.') },
    is: { ban: true, text: L('**١٩٦٣** بنك ادّخارٍ بلا فائدة في ميت غمر بمصر · **١٩٧٥** بنك دبي الإسلامي · **١٩٨٥** مجمع الفقه الإسلامي الدولي: فائدة البنوك ربا · **٢٠٢٥** أصول الصناعة نحو ٤٫٤ تريليون دولار.', '**1963**: an interest-free savings bank in Mit Ghamr, Egypt · **1975**: Dubai Islamic Bank · **1985**: the International Islamic Fiqh Academy rules bank interest is riba · **2025**: industry assets around $4.4 trillion.') } },
]
export function TdRibaPaths() {
  const { t } = useApp()
  const Cell = ({ c }) => (c
    ? <div className={`td-path-cell ${c.ban ? 'ban' : 'allow'}`}><RichText value={c.text} /></div>
    : <div className="td-path-cell empty" aria-hidden>—</div>)
  return (
    <FigureFrame number={10} interactive={false}
      title={L('مساران في الفائدة', 'Two paths on interest')}
      caption={L('أوروبا رفعت التحريم في القرن السادس عشر، والفقه الإسلاميّ بقي عليه، إلى أن عادت فكرة البنك بلا فائدة في القرن العشرين. الحدّ المصمت: الفائدة محرّمة؛ الخطّ الرفيع: مسموحٌ بها أو مسكوتٌ عنها. الزمن ليس بمقياس.',
                   'Europe lifted the ban in the sixteenth century; Islamic jurisprudence kept it, until the idea of a bank without interest returned in the twentieth. Solid edge: interest forbidden; thin edge: allowed, or not ruled on. Time is not to scale.')}>
      <div className="td-paths">
        <div className="td-path-head" aria-hidden>
          <span />
          <span>{t(L('أوروبا المسيحية', 'Christian Europe'))}</span>
          <span>{t(L('العالم الإسلامي', 'The Islamic world'))}</span>
        </div>
        {PATHS.map((r, i) => (
          <div key={i} className="td-path-row">
            <span className="td-path-era">{t(r.era)}</span>
            <Cell c={r.eu} />
            <Cell c={r.is} />
          </div>
        ))}
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 11 — Compound interest against a murabaha price
   ============================================================
   A = 100·(1+r)^n for the loan; the murabaha price is fixed on contract day at
   what the loan would owe on the due date (year 3), and never moves after. */
export function TdCompound() {
  const { t, dir } = useApp()
  const [r, setR] = useState(10)
  const [yr, setYr] = useState(5)
  const due = 3, maxY = 8
  const debt = (n) => 100 * Math.pow(1 + r / 100, n)
  const fixed = debt(due)
  const top = debt(maxY) * 1.05
  const W = 520, H = 230, pad = 30
  const X = (n) => { const v = pad + (n / maxY) * (W - 2 * pad); return dir === 'rtl' ? W - v : v }
  const Y = (v) => H - pad - ((v - 90) / (top - 90)) * (H - 2 * pad)
  const pts = Array.from({ length: 81 }, (_, i) => i / 10)
  const double = Math.log(2) / Math.log(1 + r / 100)
  const now = debt(yr)
  return (
    <FigureFrame number={11}
      title={L('«أضعافاً مضاعفة» بالأرقام', '“Doubled and redoubled”, in numbers')}
      caption={L('تمويل ١٠٠ لثلاث سنوات بالكلفة نفسها على الورق. **الخطّ المنحني:** قرضٌ بفائدةٍ مركّبة لا يُسدَّد فينمو الدَّين من تلقاء نفسه. **الخطّ المستوي:** ثمن المرابحة يُحدَّد يوم العقد ولا يتحرّك بعدها، وإن تأخّر السداد. مثالٌ افتراضيّ.',
                   'Financing of 100 for three years, at the same cost on paper. **The curve:** a loan at compound interest, unpaid, grows by itself. **The flat line:** a murabaha price is set on contract day and never moves after — even if payment is late. A hypothetical example.')}>
      <div className="td-compound">
        <svg viewBox={`0 0 ${W} ${H}`} className="td-chart" role="img"
          aria-label={t(L('الدَّين المركّب مقابل ثمن المرابحة الثابت', 'Compounding debt against a fixed murabaha price'))}>
          <line x1={X(0)} x2={X(maxY)} y1={H - pad} y2={H - pad} className="td-axis" />
          <line x1={X(due)} x2={X(due)} y1={pad - 8} y2={H - pad} className="td-cursor due" />
          <text x={X(due)} y={pad - 12} className="td-tick" textAnchor="middle">{t(L('موعد السداد', 'Due date'))}</text>
          <line x1={X(0)} x2={X(maxY)} y1={Y(fixed)} y2={Y(fixed)} className="td-line fixed" />
          <path className="td-line debt" d={pts.map((n, i) => `${i ? 'L' : 'M'}${X(n).toFixed(1)},${Y(debt(n)).toFixed(1)}`).join(' ')} />
          <line x1={X(yr)} x2={X(yr)} y1={pad} y2={H - pad} className="td-cursor" />
          <circle cx={X(yr)} cy={Y(now)} r="5" className="td-dot debt" />
          <circle cx={X(yr)} cy={Y(fixed)} r="5" className="td-dot fixed" />
          {[0, 2, 4, 6, 8].map((n) => <text key={n} x={X(n)} y={H - 10} className="td-tick" textAnchor="middle">{n}</text>)}
        </svg>
        <div className="td-legend" aria-hidden>
          <span className="td-key debt">{t(L('قرضٌ بفائدةٍ مركّبة', 'Loan at compound interest'))}</span>
          <span className="td-key fixed">{t(L('ثمن المرابحة', 'Murabaha price'))}</span>
        </div>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('نسبة الفائدة السنوية', 'Annual rate'))}: <b>{r}%</b></span>
          <input type="range" min="4" max="15" value={r} onChange={(e) => setR(+e.target.value)} />
        </label>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('السنوات منذ يوم العقد', 'Years since contract day'))}: <b>{yr}</b></span>
          <input type="range" min="0" max={maxY} value={yr} onChange={(e) => setYr(+e.target.value)} />
        </label>
        <div className="td-stats" role="status">
          <span>{t(L('الدَّين', 'Debt'))} <b>{now.toFixed(1)}</b></span>
          <span>{t(L('ثمن المرابحة', 'Murabaha price'))} <b>{fixed.toFixed(1)}</b></span>
          <span>{t(L('يتضاعف الدَّين كلّ', 'Debt doubles every'))} <b>{double.toFixed(1)}</b> {t(L('سنة', 'years'))}</span>
        </div>
        <p className="td-readout"><RichText value={yr < due
          ? L('**قبل الموعد** يكون السداد المبكر أرخص في القرض: لم تتراكم الفائدة بعد. أمّا المرابحة فثمنها محسومٌ منذ اليوم الأوّل.',
              '**Before the due date** early repayment is cheaper on the loan: interest has not piled up yet. The murabaha price was settled on day one.')
          : yr === due
            ? L('**عند الموعد** يتساوى المبلغان: لهذا يبدو العقدان على الورق متشابهين.',
                '**On the due date** the two sums are equal — which is why on paper the two contracts look alike.')
            : L('**بعد الموعد** ينمو الدَّين بالفائدة من الفائدة، وثمن المرابحة لا يتحرّك — هذا هو الفرق الذي يقصده الفقهاء حين يحرّمون الزيادة مقابل التأخير.',
                '**After the due date** the debt grows by interest on interest while the murabaha price does not move — that is the difference the jurists mean when they forbid any increase for delay.')} /></p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 12 — The same car, two contracts
   ============================================================ */
const CAR_ACTORS = [L('العميل', 'Customer'), L('البنك', 'Bank'), L('معرض السيارات', 'Car dealer')]
const CAR = {
  loan: {
    label: L('قرضٌ بفائدة · بنكٌ تقليدي', 'Interest loan · conventional bank'),
    steps: [
      { from: 1, to: 0, what: L('قرضٌ نقديّ: ٢٠٬٠٠٠', 'A cash loan: 20,000'), kind: 'money' },
      { from: 0, to: 2, what: L('ثمن السيارة: ٢٠٬٠٠٠', 'The price of the car: 20,000'), kind: 'money' },
      { from: 2, to: 0, what: L('السيارة — ملك العميل مباشرة', 'The car — the customer’s, directly'), kind: 'asset' },
      { from: 0, to: 1, what: L('٢٠٬٠٠٠ مع فائدة ٣٬٠٠٠', '20,000 plus 3,000 interest'), kind: 'money' },
    ],
    late: L('**تأخّرت؟** تُضاف فائدة تأخيرٍ إلى الدَّين.', '**Late?** Late interest is added to the debt.'),
  },
  murabaha: {
    label: L('مرابحة · بنكٌ إسلامي', 'Murabaha · Islamic bank'),
    steps: [
      { from: 0, to: 1, what: L('طلبٌ ووعدٌ بالشراء', 'A request and a promise to buy'), kind: 'promise' },
      { from: 1, to: 2, what: L('ثمن السيارة: ٢٠٬٠٠٠', 'The price of the car: 20,000'), kind: 'money' },
      { from: 2, to: 1, what: L('السيارة — ملك البنك أوّلاً', 'The car — the bank’s, first'), kind: 'asset' },
      { from: 1, to: 0, what: L('بيعٌ مؤجَّل بـ٢٣٬٠٠٠', 'A deferred sale for 23,000'), kind: 'asset' },
      { from: 0, to: 1, what: L('أقساط: ٢٣٬٠٠٠', 'Instalments: 23,000'), kind: 'money' },
    ],
    late: L('**تأخّرت؟** يبقى الثمن ٢٣٬٠٠٠.', '**Late?** The price stays at 23,000.'),
  },
}
export function TdCarTwoWays() {
  const { t } = useApp()
  const [k, setK] = useState('loan')
  const cur = CAR[k]
  return (
    <FigureFrame number={12}
      title={L('السيارة نفسها، بعقدَين', 'The same car, two contracts')}
      caption={L('في الحالتين يدفع العميل ٢٣٬٠٠٠ في النهاية. الفرق ليس في الكلفة، بل في ثلاثة أمور: **ماذا باع البنك**، و**من تحمّل مخاطرة السيارة قبل أن تصل إلى العميل**، و**ماذا يحدث إن تأخّر**. مثالٌ افتراضيّ على شروط المرابحة عند العثماني.',
                   'Either way the customer pays 23,000 in the end. The difference is not the cost but three things: **what the bank sold**, **who carried the car’s risk before it reached the customer**, and **what happens if he is late**. A hypothetical example on Usmani’s conditions for murabaha.')}>
      <div className="td-switch" role="group">
        {Object.entries(CAR).map(([key, c]) => (
          <button key={key} className={`sf-preset ${k === key ? 'active' : ''}`} onClick={() => setK(key)}>{t(c.label)}</button>
        ))}
      </div>
      <SeqList actors={CAR_ACTORS} steps={cur.steps} />
      <p className="td-readout"><RichText value={cur.late} /></p>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 13 — Who carries the loss?
   ============================================================
   A project fully funded by one financier. Loan at 8%: the financier gets 8
   whatever happens; the entrepreneur keeps the rest, or eats the loss.
   Mudaraba, profit split 50/50: profits are shared; a loss falls on the
   capital, and the entrepreneur loses only his effort. */
export function TdWhoBearsLoss() {
  const { t } = useApp()
  const [o, setO] = useState(-20)
  const rows = [
    { k: 'loan', label: L('قرضٌ بفائدة ٨٪', 'Loan at 8%'), fin: 8, ent: o - 8 },
    { k: 'mud', label: L('مضاربة، الربح مناصفة', 'Mudaraba, profit split evenly'), fin: o > 0 ? o / 2 : o, ent: o > 0 ? o / 2 : 0 },
  ]
  const span = 40
  const Div = ({ v }) => {
    const w = Math.min(Math.abs(v) / span, 1) * 50
    return (
      <div className="td-div" aria-hidden>
        <i className={v < 0 ? 'neg' : 'pos'} style={{ inlineSize: `${w}%`, insetInlineStart: v < 0 ? `${50 - w}%` : '50%' }} />
        <span className="td-div-zero" />
      </div>
    )
  }
  const fmt = (v) => `${v > 0 ? '+' : ''}${v.toFixed(0)}%`
  return (
    <FigureFrame number={13}
      title={L('من يتحمّل الخسارة؟', 'Who carries the loss?')}
      caption={L('مشروعٌ يموّله ممّولٌ واحد بالكامل. حرّك نتيجة المشروع. **في القرض** خطّ الممّول مسطّح: عائده مفصولٌ عن النتيجة ما دام المقترض قادراً على السداد. **في المضاربة** يسير الطرفان مع النتيجة. مثالٌ افتراضيّ.',
                   'A project funded entirely by one financier. Move the project’s outcome. **In the loan** the financier’s line is flat: his return is cut loose from the outcome so long as the borrower can pay. **In mudaraba** both sides move with the outcome. A hypothetical example.')}>
      <label className="sf-slider">
        <span className="sf-slider-lbl">{t(L('نتيجة المشروع، نسبةً إلى رأس المال', 'Project outcome, as a share of capital'))}: <b>{fmt(o)}</b></span>
        <input type="range" min="-30" max="40" value={o} onChange={(e) => setO(+e.target.value)} />
      </label>
      <div className="td-loss">
        {rows.map((r) => (
          <div key={r.k} className="td-loss-block">
            <strong>{t(r.label)}</strong>
            <div className="td-loss-row"><span>{t(L('عائد الممّول', 'Financier'))}</span><Div v={r.fin} /><b className={r.fin < 0 ? 'neg' : ''}>{fmt(r.fin)}</b></div>
            <div className="td-loss-row"><span>{t(L('عائد صاحب المشروع', 'Entrepreneur'))}</span><Div v={r.ent} /><b className={r.ent < 0 ? 'neg' : ''}>{fmt(r.ent)}</b></div>
          </div>
        ))}
      </div>
      <p className="td-readout" role="status"><RichText value={o < 0
        ? L('**خسر المشروع.** في القرض يتحمّل صاحب المشروع الخسارة كلّها وفوقها الفائدة. في المضاربة تقع الخسارة على المال، ويخسر المضارب جهده فقط — «الخراج بالضمان»: من أراد الغُنم تحمّل الغُرم.',
            '**The project lost.** In the loan the entrepreneur carries the whole loss and the interest on top. In mudaraba the loss falls on the capital, and the managing partner loses only his effort — “gain goes with liability”: whoever wants the reward must carry the risk.')
        : L('**ربح المشروع.** في القرض يأخذ الممّول ٨٪ مهما كبر الربح؛ في المضاربة يقتسمه الطرفان.',
            '**The project made money.** In the loan the financier takes 8% however large the profit; in mudaraba the two share it.')} /></p>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 14 — Islamic finance in Saudi banks, by contract
   ============================================================ */
const SAUDI = [
  { label: L('المرابحة', 'Murabaha'), en: 'Murabahah', v: 1373.9, share: 50.7 },
  { label: L('التورّق', 'Tawarruq'), en: 'Tawarruq', v: 1058.0, share: 39.1 },
  { label: L('الإجارة التمويلية', 'Finance lease'), en: 'Finance lease', v: 229.8, share: 8.5 },
  { label: L('عقودٌ أخرى', 'Others'), en: 'Others', v: 43.3, share: 1.6 },
  { label: L('المضاربة', 'Mudaraba'), en: 'Mudarabah', v: 2.3, share: 0.08 },
  { label: L('المشاركة', 'Musharaka'), en: 'Musharakah', v: 2.0, share: 0.07 },
]
export function TdSaudiContracts() {
  return (
    <FigureFrame number={14} interactive={false}
      title={L('التمويل المتوافق مع الشريعة في البنوك السعودية', 'Shariah-compliant financing in Saudi banks')}
      caption={L('بحسب العقد، الربع الثالث ٢٠٢٥. المجموع ٢٬٧٠٩٫٣ مليار ريال. المرابحة والتورّق معاً نحو ٩٠٪؛ والمشاركة والمضاربة — العقدان اللذان يعدّهما العثماني الأصل — معاً أقلّ من ٠٫٢٪. بيانات البنك المركزي السعودي (ساما) كما نشرها موقع «أرقام».',
                   'By contract, Q3 2025. Total SAR 2,709.3 billion. Murabaha and tawarruq together are about 90%; musharaka and mudaraba — the two Usmani calls the ideal — together under 0.2%. Saudi Central Bank (SAMA) data as published by Argaam.')}>
      <BarList rows={SAUDI} share unit={L('مليار ريال', 'bn SAR')} />
    </FigureFrame>
  )
}

/* ============================================================
   Fig 15 — Layers of money
   ============================================================ */
export function TdMoneyLayers() {
  const { t } = useApp()
  const Tier = ({ name, sub, kind, share, tone }) => (
    <div className={`td-tier ${tone}`}>
      <div><strong>{t(name)}</strong><span>{t(sub)}</span></div>
      {share && <div className="td-tier-share"><b>{share}</b><span>{t(kind)}</span></div>}
    </div>
  )
  const Between = ({ down, up }) => (
    <div className="td-tier-links">
      <span>↓ {t(down)}</span>
      <span>↑ {t(up)}</span>
    </div>
  )
  return (
    <FigureFrame number={15} interactive={false}
      title={L('طبقات المال', 'The layers of money')}
      caption={L('البنك المركزي يخلق مال الدولة، والبنوك التجارية تخلق معظم المال المتداول حين تُقرض. والناس لا يتعاملون مع البنك المركزي إلا عبر البنوك. النِّسب لبريطانيا، عن بنك إنكلترا (٢٠١٤).',
                   'The central bank creates the state’s money; commercial banks create most of the money in circulation when they lend. And people deal with the central bank only through the banks. The shares are for the UK, from the Bank of England (2014).')}>
      <div className="td-tiers">
        <Tier tone="cb" name={L('البنك المركزي، أي الدولة', 'The central bank — the state')} sub={L('يخلق الأوراق النقدية والاحتياطيات', 'Creates notes, coins and reserves')}
          share="3%" kind={L('أوراقٌ نقدية ومعدنية من النقود المتداولة', 'notes and coins, of money in circulation')} />
        <Between down={L('يُقرض البنوك احتياطيات', 'lends the banks reserves')} up={L('تودع البنوك سنداتٍ ضماناً', 'banks pledge bonds as collateral')} />
        <Tier tone="bank" name={L('البنوك التجارية، وهي خاصّة', 'Commercial banks — private')} sub={L('تخلق الودائع حين تُقرض', 'Create deposits when they lend')}
          share="97%" kind={L('ودائع مصرفية من النقود المتداولة', 'bank deposits, of money in circulation')} />
        <Between down={L('قرضٌ جديد = وديعةٌ جديدة', 'a new loan = a new deposit')} up={L('سداد القرض: المال يفنى', 'repaying a loan: the money vanishes')} />
        <Tier tone="people" name={L('الناس والشركات', 'People and firms')} sub={L('يحملون ودائع مصرفية وأوراقاً نقدية', 'Hold bank deposits and banknotes')} />
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 16 — The life of a government bond
   ============================================================ */
const BOND_ACTORS = [L('الناس والشركات', 'People and firms'), L('الحكومة', 'Government'), L('البنوك والمستثمرون', 'Banks and investors'), L('البنك المركزي', 'Central bank')]
const BOND_STEPS = [
  { from: 1, to: 2, what: L('سندات', 'Bonds'), kind: 'asset' },
  { from: 2, to: 1, what: L('ثمن السندات', 'The price of the bonds'), kind: 'money' },
  { from: 1, to: 0, what: L('إنفاقٌ عام: طرقٌ ومدارس ورواتب', 'Public spending: roads, schools, salaries'), kind: 'money' },
  { from: 0, to: 1, what: L('ضرائب', 'Taxes'), kind: 'money' },
  { from: 1, to: 2, what: L('فائدة، ثم أصل الدَّين', 'Interest, then the principal'), kind: 'money' },
  { from: 2, to: 3, what: L('سنداتٌ ضماناً، أو بيعاً', 'Bonds, as collateral or for sale'), kind: 'asset' },
  { from: 3, to: 2, what: L('مالٌ جديد', 'New money'), kind: 'money' },
]
export function TdBondCycle() {
  return (
    <FigureFrame number={16} interactive={false}
      title={L('دورة السند الحكوميّ', 'The life of a government bond')}
      caption={L('الحكومة تقترض من البنوك والمستثمرين وتُنفق، ثم تسدّد من الضرائب مع فائدة. والبنوك تحوّل السندات إلى مالٍ جديد لدى البنك المركزي، رهناً أو بيعاً. مثالٌ مبسّط.',
                   'The government borrows from banks and investors and spends, then repays out of taxes, with interest. And the banks turn the bonds into new money at the central bank, pledged or sold. A simplified example.')}>
      <SeqList actors={BOND_ACTORS} steps={BOND_STEPS} />
    </FigureFrame>
  )
}

/* ============================================================
   Fig 17 — Public debt, share of GDP
   ============================================================ */
const DEBT = [
  { label: L('اليابان', 'Japan'), v: 206.5 }, { label: L('اليونان', 'Greece'), v: 145.7 },
  { label: L('إيطاليا', 'Italy'), v: 137.1 }, { label: L('الولايات المتحدة', 'United States'), v: 123.9 },
  { label: L('فرنسا', 'France'), v: 116.0 }, { label: L('بريطانيا', 'United Kingdom'), v: 102.3 },
  { label: L('مصر', 'Egypt'), v: 86.8 }, { label: L('ماليزيا', 'Malaysia'), v: 70.7 },
  { label: L('ألمانيا', 'Germany'), v: 62.9 }, { label: L('إندونيسيا', 'Indonesia'), v: 41.0 },
  { label: L('الكويت', 'Kuwait'), v: 14.6 },
]
export function TdDebtGdp() {
  return (
    <FigureFrame number={17} interactive={false}
      title={L('الدَّين العام نسبةً إلى الناتج', 'Public debt as a share of GDP')}
      caption={L('الدَّين العام الإجماليّ في بلدانٍ مختارة سنة ٢٠٢٥. كثيرٌ من أثقلها ديناً من أغنى بلدان العالم. بيانات صندوق النقد الدولي، نيسان ٢٠٢٦.',
                   'General government gross debt in selected countries, 2025. Several of the most indebted are among the richest countries in the world. IMF data, April 2026.')}>
      <BarList rows={DEBT} />
    </FigureFrame>
  )
}

/* ============================================================
   Fig 18 — Who issues sukuk?
   ============================================================ */
const SUKUK = [
  { label: L('حكومات', 'Sovereigns'), en: 'Sovereign', v: 137.5, share: 52.3 },
  { label: L('جهاتٌ شبه حكومية', 'Quasi-sovereigns'), en: 'Quasi-sovereign', v: 52.3, share: 19.9 },
  { label: L('مؤسّساتٌ مالية', 'Financial institutions'), en: 'Financial institutions', v: 39.6, share: 15.1 },
  { label: L('شركات', 'Corporates'), en: 'Corporate', v: 33.5, share: 12.7 },
]
export function TdSukukIssuers() {
  return (
    <FigureFrame number={18} interactive={false}
      title={L('من يُصدر الصكوك؟', 'Who issues sukuk?')}
      caption={L('إصدارات العالم سنة ٢٠٢٥، ومجموعها ٢٦٢٫٩ مليار دولار؛ أكثر من نصفها حكومات. وتجاوز مجموع الصكوك القائمة تريليون دولار. بيانات السوق المالية الإسلامية الدولية (IIFM).',
                   'Worldwide issuance in 2025, totalling $262.9 billion; more than half by governments. Sukuk outstanding passed $1 trillion. International Islamic Financial Market (IIFM) data.')}>
      <BarList rows={SUKUK} share unit={L('مليار دولار', 'bn USD')} />
    </FigureFrame>
  )
}

/* ============================================================
   Fig 19 — A bond and an ijara sukuk
   ============================================================ */
const BS_ACTORS = [L('المستثمرون', 'Investors'), L('الدولة', 'The state')]
const BS = {
  bond: {
    label: L('سندٌ حكوميّ', 'Government bond'),
    steps: [
      { from: 0, to: 1, what: L('قرض: ١٠٠', 'A loan: 100'), kind: 'money' },
      { from: 1, to: 0, what: L('فائدةٌ كلّ سنة', 'Interest every year'), kind: 'money' },
      { from: 1, to: 0, what: L('ردّ القرض: ١٠٠', 'The loan repaid: 100'), kind: 'money' },
    ],
    note: L('**العائد فائدةٌ على قرض.**', '**The return is interest on a loan.**'),
  },
  sukuk: {
    label: L('صكّ إجارةٍ حكوميّ', 'Government ijara sukuk'),
    steps: [
      { from: 1, to: 0, what: L('بيع أصلٍ: مبنى مثلاً', 'Sale of an asset — a building, say'), kind: 'asset' },
      { from: 0, to: 1, what: L('ثمن الأصل: ١٠٠', 'The price of the asset: 100'), kind: 'money' },
      { from: 0, to: 1, what: L('تأجير الأصل للدولة', 'The asset leased back to the state'), kind: 'promise' },
      { from: 1, to: 0, what: L('أجرةٌ كلّ سنة', 'Rent every year'), kind: 'money' },
      { from: 1, to: 0, what: L('إعادة شراء الأصل: ١٠٠', 'The asset bought back: 100'), kind: 'money' },
    ],
    note: L('**العائد أجرةُ أصلٍ مملوك.** والخطوة الخامسة موضع النقد: الثمن نفسه يضمن رأس المال.',
            '**The return is rent on an owned asset.** The fifth step is where the criticism lands: the same price guarantees the capital.'),
  },
}
export function TdBondVsSukuk() {
  const { t } = useApp()
  const [k, setK] = useState('sukuk')
  const cur = BS[k]
  return (
    <FigureFrame number={19}
      title={L('السند وصكّ الإجارة', 'A bond and an ijara sukuk')}
      caption={L('في السند قرضٌ وفائدة. وفي الصكّ يشتري المستثمرون أصلاً ويؤجّرونه للدولة — وعملياً تتوسّط شركةٌ ذات غرضٍ خاصّ تمثّلهم. مثالٌ افتراضيّ مبسّط.',
                   'In the bond there is a loan and interest. In the sukuk the investors buy an asset and lease it to the state — in practice through a special-purpose company that represents them. A simplified hypothetical example.')}>
      <div className="td-switch" role="group">
        {Object.entries(BS).map(([key, c]) => (
          <button key={key} className={`sf-preset ${k === key ? 'active' : ''}`} onClick={() => setK(key)}>{t(c.label)}</button>
        ))}
      </div>
      <SeqList actors={BS_ACTORS} steps={cur.steps} />
      <p className="td-readout"><RichText value={cur.note} /></p>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 20 — The road from savings to a project, in three systems
   ============================================================ */
const SYSTEMS = [
  { k: 'cap', name: L('الرأسمالي', 'Capitalist'),
    path: [L('مودِع، أي دائنٌ للبنك', 'A depositor — the bank’s creditor'), L('بنكٌ خاصّ يخلق ائتماناً', 'A private bank, creating credit'), L('قرضٌ بفائدة', 'A loan at interest'), L('مشروعٌ خاصّ', 'A private project')],
    back: L('فائدةٌ ثابتة، مضمونةٌ بالعقد.', 'Fixed interest, guaranteed by contract.') },
  { k: 'com', name: L('الشيوعي', 'Communist'),
    path: [L('مدّخرٌ له دفتر توفير', 'A saver with a savings book'), L('بنك الدولة الوحيد', 'The single state bank'), L('ائتمانٌ بحسب الخطّة', 'Credit by the plan'), L('منشأةٌ تملكها الدولة', 'A state-owned enterprise')],
    back: L('فائدةٌ إدارية صغيرة: ٢٪ أو ٣٪ في الاتحاد السوفييتي.', 'A small administered interest: 2% or 3% in the Soviet Union.') },
  { k: 'isl', name: L('الإسلامي', 'Islamic'),
    path: [L('ربُّ مال، أي شريك', 'Owner of capital — a partner'), L('بنكٌ مضارب', 'A bank as managing partner'), L('مشاركةٌ أو بيعٌ أو إجارة', 'Partnership, sale or lease'), L('مشروعٌ خاصّ ضمن حدود الشرع', 'A private project, within the law’s limits')],
    back: L('حصّةٌ من ربحٍ فعليّ، والخسارة واردة.', 'A share of real profit — and a loss is possible.') },
]
export function TdThreeSystems() {
  const { t } = useApp()
  const arrow = t(L('←', '→'))
  return (
    <FigureFrame number={20} interactive={false}
      title={L('طريق المدّخرات إلى المشروع', 'The road from savings to a project')}
      caption={L('كيف تصل مدّخرات شخصٍ إلى مشروع، وماذا يعود إليه، في كلّ نظام.', 'How one person’s savings reach a project, and what comes back to them, in each system.')}>
      <div className="td-systems">
        {SYSTEMS.map((s) => (
          <div key={s.k} className={`td-system ${s.k}`}>
            <strong className="td-system-name">{t(s.name)}</strong>
            <ol className="td-system-path">
              {s.path.map((p, i) => (
                <li key={i}>{t(p)}{i < s.path.length - 1 && <span aria-hidden className="td-system-arrow">{arrow}</span>}</li>
              ))}
            </ol>
            <p className="td-system-back"><RichText value={s.back} /></p>
          </div>
        ))}
      </div>
    </FigureFrame>
  )
}
