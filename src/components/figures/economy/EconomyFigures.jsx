/*
 * Figures for «الاقتصاد كما أشرحه لابنتي» — one per chapter, figures 1–9.
 *
 * Hand-rolled SVG and HTML, no recharts, for the reason the flow figures give:
 * the registry keeps charting behind its own lazy boundary, and none of these
 * needs it. Their CSS sits in economy.css beside them and is imported from
 * here, so it rides in this lazy chunk rather than the entry stylesheet.
 *
 * THE BOOK HAS NO DATA. Varoufakis tells stories — a camp, a river, a hunt — and
 * these figures let a reader push on the story's one moving part. Where a figure
 * runs a model, the model is ours and illustrative, and its caption says so;
 * the shapes are chosen to follow the book's argument, not fitted to anything.
 * Don't add numbers to an axis that would make one look like a measurement.
 *
 * No entrance animation (POLISH-PLAN §6); transitions on state changes only.
 * Every body text goes through RichText — see FlowFigures.jsx for why.
 */
import { useMemo, useState } from 'react'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'
import RichText from '../../RichText.jsx'
import './economy.css'

const L = (ar, en) => ({ ar, en })
const pct = (x) => `${Math.round(x)}%`

/* ============================================================
   Fig 1 — What the surplus made possible (chapter 1)
   ============================================================ */
const SURPLUS = [
  { k: 'writing', name: L('الكتابة', 'Writing'),
    line: L('أوّل ما كُتب في بلاد ما بين النهرين كان **حساباً**: كم أودع السيد نابوك من القمح في المخزن المشترك.',
            'The first thing ever written down in Mesopotamia was **an account**: how much grain Mr Nabuk had left in the shared granary.') },
  { k: 'debt', name: L('الدَّين والنقود', 'Debt and money'),
    line: L('صَدَفةٌ نُقش عليها ما يدين به الحاكم للعامل من قمحٍ لم يُحصد بعد — **دَينٌ ونقدٌ معاً**. فالنقود «الافتراضية» ليست اختراعاً حديثاً.',
            'A shell engraved with grain the ruler owed a worker from a harvest not yet in — **a debt and a currency at once**. “Virtual” money is nothing new.') },
  { k: 'state', name: L('الدولة', 'The state'),
    line: L('لا قيمة للصَّدَفة ما لم تضمنها سلطةٌ يثق الناس بها وتبقى بعد موت الحاكم. ومن هنا كلمة الائتمان (credit): من اللاتينية credere، أي «أن تؤمن».',
            'A shell is worth nothing without an authority people trust, one that outlives the ruler. Hence “credit”, from the Latin credere: “to believe”.') },
  { k: 'army', name: L('البيروقراطية والجيش', 'Bureaucracy and army'),
    line: L('موظّفون وشرطةٌ وجنودٌ لا يزرعون شيئاً: لا يعيشون إلا على **فائضٍ ينتجه غيرهم**، وهم في المقابل يحرسونه.',
            'Officials, police and soldiers who grow nothing: they live only on **a surplus someone else produced** — and in return they guard it.') },
  { k: 'clergy', name: L('رجال الدين', 'The clergy'),
    line: L('حكّامٌ أقلّية أمام فلّاحين كُثُر: يحتاجون إلى عقيدةٍ تُقنع الأكثرية بأن التوزيع الجائر للفائض **نظامٌ إلهيّ** — فلا تثور.',
            'A ruling few facing many farmers need a creed that convinces the majority the unequal sharing of the surplus is **a divine order** — so they do not revolt.') },
  { k: 'tech', name: L('التكنولوجيا', 'Technology'),
    line: L('المحاريث وقنوات الريّ أوّلاً، ثم الأهرامات والبارثينون ومعابد الإنكا — بأيدي آلاف العبيد.',
            'Ploughs and irrigation first, then the Pyramids, the Parthenon and the Inca temples — built by thousands of slaves.') },
  { k: 'germs', name: L('الجراثيم', 'Germs'),
    line: L('مخازن القمح والمدن المكتظّة صارت مختبراً للأوبئة. اكتسب أهلها مناعةً على أجيال، فصارت **مصافحتهم سلاحاً** يقتل من لم يعرف الزراعة.',
            'Granaries and crowded towns became a laboratory for epidemics. Their people grew resistant over generations — and **their handshake became a weapon** against peoples who had never farmed.') },
]
export function TdSurplus() {
  const { t } = useApp()
  const [sel, setSel] = useState('writing')
  const [none, setNone] = useState(false)
  const cur = SURPLUS.find((s) => s.k === sel)
  return (
    <FigureFrame number={1}
      title={L('ما الذي ولده الفائض؟', 'What the surplus made possible')}
      caption={L('اختر ما شئت لترى كيف خرج من **الفائض الزراعي**. ثم بدّل إلى أرضٍ لم تحتج إلى الزراعة قطّ — حيث الطعام وفير — لترى ما لم يولد هناك، ولماذا لا علاقة لذلك بذكاء أحد.',
                   'Pick any of them to see how it grew out of the **agricultural surplus**. Then switch to a land that never needed farming — where food was plentiful — to see what was never born there, and why that has nothing to do with anyone’s intelligence.')}>
      <div className="td-surplus">
        <div className="td-switch" role="group">
          <button className={`sf-preset ${!none ? 'active' : ''}`} onClick={() => setNone(false)}>
            {t(L('أوراسيا: زراعةٌ وفائض', 'Eurasia: farming and surplus'))}
          </button>
          <button className={`sf-preset ${none ? 'active' : ''}`} onClick={() => setNone(true)}>
            {t(L('أستراليا الأصلية: طعامٌ وفير بلا زراعة', 'Aboriginal Australia: plenty, no farming'))}
          </button>
        </div>
        <div className={`td-surplus-core ${none ? 'off' : ''}`}>{t(L('الفائض', 'Surplus'))}</div>
        <div className="td-chips">
          {SURPLUS.map((s) => (
            <button key={s.k} className={`td-chip ${sel === s.k && !none ? 'active' : ''} ${none ? 'off' : ''}`}
              onClick={() => { setSel(s.k); setNone(false) }} aria-pressed={sel === s.k && !none}>
              {t(s.name)}
            </button>
          ))}
        </div>
        <p className="td-readout" role="status">
          <RichText value={none
            ? L('بلا حاجةٍ إلى الزراعة لا فائض، وبلا فائضٍ لا كتابة ولا دولة ولا جيوش ولا جراثيم المدن. كان للسكّان الأصليين شعرٌ وموسيقى وأساطير عظيمة القيمة — لكن لا شيء ممّا يحتاجه المرء ليغزو غيره أو يصدّ غازياً. **الجغرافيا، لا الجينات.**',
                'With no need to farm there is no surplus, and with no surplus no writing, no state, no armies and no city germs. The Aboriginal peoples had poetry, music and myths of tremendous value — but none of what it takes to invade, or to repel an invader. **Geography, not genes.**')
            : cur.line} />
        </p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 2 — Two kinds of value (chapter 2)
   ============================================================
   Each item carries the two values as rough levels (0–100) and what happens
   when you offer money for it. Levels are the book's own qualitative claims —
   a sunset has no exchange value, an iPad has plenty — not measurements. */
const VALUES = [
  { k: 'sunset', name: L('غروب الشمس في إيجينا', 'Sunset on Aegina'), exp: 95, exch: 0, good: true,
    paid: L('لا أحد يملكه ليبيعك إيّاه — وتذكرةٌ لمشاهدته لن تضيف إليه شيئاً.',
            'Nobody owns it to sell it to you — and a ticket to watch it would add nothing to it.') },
  { k: 'jokes', name: L('دعابات باريس', 'Paris’s jokes'), exp: 90, exch: 0, good: true,
    paid: L('ادفع لباريس عن كلّ ضحكة فيرتبك ويثقل ظلّه — وغالباً تجفّ النكات.',
            'Pay Paris per laugh and he turns self-conscious — the jokes most likely dry up.') },
  { k: 'dive', name: L('الغطسة من أجل القبطان كوستاس', 'The dive for Captain Kostas'), exp: 85, exch: 0, good: true,
    paid: L('خمسة يوروهات تحوّل معروفاً بطولياً إلى عملٍ باردٍ ومبلَّل — وقد لا تقفز كسينيا أصلاً.',
            'Five euros turn a heroic favour into a cold, wet chore — and Xenia might not jump at all.') },
  { k: 'blood', name: L('التبرّع بالدم', 'Giving blood'), exp: 80, exch: 0, good: true,
    paid: L('يقول الكتاب إن البلدان التي تدفع للمتبرّعين تجمع دماً أقلّ. والأدلّة اللاحقة أكثر اختلاطاً — انظر تحقّق النادي تحت الفصل.',
            'The book says countries that pay donors collect less blood. Later evidence is more mixed — see the club’s check below this chapter.') },
  { k: 'ipad', name: L('جهاز «آيباد»', 'An iPad'), exp: 55, exch: 90, good: false,
    paid: L('ادفع لـ«أبل» أكثر تصنع أكثر: في السلعة يتحرّك السعر والعرض معاً.',
            'Pay Apple more and it makes more: for a commodity, price and supply move together.') },
  { k: 'moussaka', name: L('مسقّعة المطعم', 'The taverna’s moussaka'), exp: 60, exch: 75, good: false,
    paid: L('كلّما بيع منها أكثر خبز الطاهي منها أكثر. هذه بضاعة: صُنعت لتُباع.',
            'The more of it sells, the more the cook bakes. This is a commodity: made in order to be sold.') },
]
export function TdTwoValues() {
  const { t } = useApp()
  const [sel, setSel] = useState('dive')
  const [paid, setPaid] = useState(false)
  const cur = VALUES.find((v) => v.k === sel)
  // Pricing a good crowds its experiential value out; pricing a commodity is just
  // what commodities are for. Same ratio across goods: the claim is the direction.
  const exp = paid && cur.good ? cur.exp * 0.35 : cur.exp
  const Meter = ({ label, v, tone }) => (
    <div className="td-meter">
      <span className="td-meter-lbl">{t(label)}</span>
      <div className={`td-bar ${tone}`} aria-hidden><i style={{ inlineSize: `${Math.max(v, 2)}%` }} /></div>
    </div>
  )
  return (
    <FigureFrame number={2}
      title={L('نوعان من القيمة', 'Two kinds of value')}
      caption={L('اختر شيئاً، ثم «اعرض مالاً مقابله». في **البضائع** يجلب المال مزيداً منها؛ في **المسرّات** قد يطرد المالُ القيمةَ التي جعلتها تستحقّ العناء. المستويات تعبيرٌ عن حجّة الكتاب، لا قياسات.',
                   'Pick something, then “offer money for it”. For **commodities**, money brings forth more; for **goods** in the book’s sense, money can drive out the very value that made them worth doing. The levels express the book’s argument, not measurements.')}>
      <div className="td-values">
        <div className="td-chips">
          {VALUES.map((v) => (
            <button key={v.k} className={`td-chip ${sel === v.k ? 'active' : ''}`}
              onClick={() => { setSel(v.k); setPaid(false) }} aria-pressed={sel === v.k}>{t(v.name)}</button>
          ))}
        </div>
        <div className="td-values-panel">
          <Meter label={L('القيمة الاستعمالية (التجربة نفسها)', 'Experiential value')} v={exp} tone="exp" />
          <Meter label={L('القيمة التبادلية (ثمنها في السوق)', 'Exchange value')} v={cur.exch} tone="exch" />
          <button className={`sf-preset ${paid ? 'active' : ''}`} onClick={() => setPaid((p) => !p)}>
            {paid ? t(L('اسحب العرض', 'Withdraw the offer')) : t(L('اعرض مالاً مقابله', 'Offer money for it'))}
          </button>
          <p className="td-readout" role="status">
            <RichText value={paid ? cur.paid : (cur.good
              ? L('**مسرّة**: لها قيمةٌ استعمالية كبيرة ولا قيمة تبادلية لها. لم تُصنع لتُباع.',
                  'A **good**: plenty of experiential value, no exchange value. It was never made to be sold.')
              : L('**بضاعة**: صُنعت لتُباع، ولها في السوق ثمن.',
                  'A **commodity**: made to be sold, and the market puts a price on it.'))} />
          </p>
        </div>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 3 — The Great Reversal (chapter 3)
   ============================================================ */
const ORDERS = {
  feudal: {
    label: L('قبل: الإقطاع', 'Before: feudalism'),
    steps: [
      { name: L('إنتاج', 'Production'), line: L('الأقنان يزرعون ويحصدون.', 'Serfs sow and reap.') },
      { name: L('توزيع', 'Distribution'), line: L('يرسل السيّد مأموره فيأخذ حصّته من المحصول — بالقوة إن لزم.', 'The lord’s sheriff takes his share of the harvest — by force if need be.') },
      { name: L('دَين', 'Debt'), line: L('إن وقع، جاء في الآخر: يبيع السيّد ما فضل ويُقرض به.', 'If it comes at all, it comes last: the lord sells what is left and lends from it.') },
    ],
    note: L('الكلّ يعرف حصّته **بعد** أن يُنتَج المحصول.', 'Everyone learns their share **after** the harvest exists.'),
  },
  market: {
    label: L('بعد: مجتمع السوق', 'After: market society'),
    steps: [
      { name: L('دَين', 'Debt'), line: L('صاحب المشروع يقترض أوّلاً — ليدفع الإيجار والأجور وثمن البذار قبل أن يملك شيئاً.', 'The entrepreneur borrows first — rent, wages and seed must be paid before he owns anything.') },
      { name: L('توزيع', 'Distribution'), line: L('الإيجار والأجور والفائدة تُحسم مقدّماً، قبل أن يوجد ما يُوزَّع.', 'Rent, wages and interest are fixed in advance, before there is anything to share.') },
      { name: L('إنتاج', 'Production'), line: L('ينتج ويبيع — وعليه أن يربح ليسدّ الدَّين وفائدته، أو يغرق.', 'He produces and sells — and must make a profit to repay the debt with interest, or go under.') },
    ],
    note: L('الوحيد الذي لا يعرف ما سيبقى له هو **صاحب المشروع نفسه**. هكذا صار الربح شرطاً للبقاء، لا مجرّد رغبةٍ في الغنى.',
            'The only person who does not know what he will be left with is **the entrepreneur himself**. That is how profit became a condition of survival, not merely a wish to be rich.'),
  },
}
export function TdGreatReversal() {
  const { t } = useApp()
  const [era, setEra] = useState('market')
  const [step, setStep] = useState(0)
  const cur = ORDERS[era]
  const arrow = t(L('←', '→'))
  return (
    <FigureFrame number={3}
      title={L('الانقلاب الكبير', 'The Great Reversal')}
      caption={L('بدّل بين النظامين وانقر الخطوات. انتقل الدَّين من آخر السلسلة إلى أوّلها — ومعه صار التوزيع يسبق الإنتاج.',
                   'Switch between the two orders and tap the steps. Debt moved from the end of the chain to its start — and with it, distribution came to precede production.')}>
      <div className="td-reversal">
        <div className="td-switch" role="group">
          {Object.entries(ORDERS).map(([k, o]) => (
            <button key={k} className={`sf-preset ${era === k ? 'active' : ''}`} onClick={() => { setEra(k); setStep(0) }}>{t(o.label)}</button>
          ))}
        </div>
        <ol className="td-chain">
          {cur.steps.map((s, i) => (
            <li key={i}>
              <button className={`td-step ${step === i ? 'active' : ''} ${t(s.name) === t(L('دَين', 'Debt')) ? 'debt' : ''}`}
                onClick={() => setStep(i)} aria-pressed={step === i}>
                <span className="td-step-n">{i + 1}</span>{t(s.name)}
              </button>
              {i < cur.steps.length - 1 && <span className="td-chain-arrow" aria-hidden>{arrow}</span>}
            </li>
          ))}
        </ol>
        <p className="td-readout" role="status"><RichText value={cur.steps[step].line} /></p>
        <p className="td-note"><RichText value={cur.note} /></p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 4 — Money from thin air (chapter 4)
   ============================================================
   A toy bank, in thousands of pounds. It starts with 2,400 of deposits and
   600 of its own capital; one loan to Miriam is 500. The point the numbers
   carry: the loan CREATES a deposit (money appears), repaying it DESTROYS one
   (money disappears), and a single default eats most of the bank's capital —
   which is why a few of them make depositors queue. */
const BANK0 = { reserves: 300, loans: 2700, deposits: 2400, equity: 600 }
const BANK_STEPS = {
  start: { ...BANK0, miriam: 0, maker: 0,
    line: L('مصرفٌ عاديّ: قروضٌ وأموالٌ احتياطية في جهة، وودائع الناس ورأس مال المصرف في الجهة الأخرى.',
            'An ordinary bank: loans and reserves on one side; people’s deposits and the bank’s own capital on the other.') },
  lent: { ...BANK0, loans: 3200, deposits: 2900, miriam: 500, maker: 0,
    line: L('**لم يأخذ المصرف المبلغ من أحد.** كتب «٥٠٠٬٠٠٠» بجانب اسم مريم، فظهر قرضٌ في جهة ووديعةٌ جديدة في الجهة الأخرى. مالٌ وُلد من العدم.',
            '**The bank took the money from nobody.** It typed “500,000” next to Miriam’s name: a loan appeared on one side and a brand-new deposit on the other. Money born from thin air.') },
  paid: { ...BANK0, loans: 3200, deposits: 2900, miriam: 0, maker: 500,
    line: L('تدفع مريم ثمن الآلة. انتقلت الوديعة من حسابها إلى حساب صانع الآلات — والمال الجديد يدور الآن في الاقتصاد.',
            'Miriam pays for the machine. The deposit moved from her account to the machine-maker’s — the new money is circulating now.') },
  repaid: { ...BANK0, deposits: 2375, equity: 625, miriam: 0, maker: 500,
    line: L('باعت الدرّاجات وسدّدت القرض وفائدته. **يختفي المال الذي خُلق** حين يُسدَّد القرض، ويبقى للمصرف ربحه: ٢٥ ألفاً. لم يُختلّ «الخطّ الزمني».',
            'The bikes sold; she repaid the loan with interest. **The money that was created vanishes** as the loan is repaid, and the bank keeps its profit: 25 thousand. The timeline held.') },
  defaulted: { ...BANK0, loans: 2700, deposits: 2900, equity: 100, miriam: 0, maker: 500,
    line: L('لم يأتِ المستقبل الذي اقترضت منه. شُطب القرض فأكل **خمسة أسداس رأس مال المصرف** — والمال الذي خُلق باقٍ في الاقتصاد. قرضٌ آخر كهذا ويُفلس المصرف، فيصطفّ المودعون أمام الأبواب.',
            'The future she borrowed from never came. The loan is written off and eats **five-sixths of the bank’s capital** — while the money it created stays in the economy. One more like her and the bank is insolvent, and depositors queue at the doors.') },
}
export function TdBankLedger() {
  const { t } = useApp()
  const [st, setSt] = useState('start')
  const b = BANK_STEPS[st]
  const max = 3500
  const Bar = ({ label, v, tone }) => (
    <div className={`td-ledger-row ${tone}`}>
      <span className="td-ledger-lbl">{t(label)}</span>
      <div className="td-ledger-bar" aria-hidden><i style={{ inlineSize: `${(Math.max(v, 0) / max) * 100}%` }} /></div>
      <span className="td-ledger-v">{v.toLocaleString('en')}</span>
    </div>
  )
  const go = (k) => () => setSt(k)
  return (
    <FigureFrame number={4}
      title={L('مالٌ من العدم', 'Money from thin air')}
      caption={L('مصرفٌ مبسّط بآلاف الجنيهات. اتبع قرض مريم من أوّله إلى آخره، ثم أعِد التجربة وجرّب أن تتعثّر. **«المال في الاقتصاد»** هو مجموع الودائع. الأرقام توضيحية؛ آلية القيد المزدوج هي ما يصفه بنك إنكلترا نفسه.',
                   'A simplified bank, in thousands of pounds. Follow Miriam’s loan from start to finish, then run it again and let her default. **“Money in the economy”** is total deposits. The figures are illustrative; the double entry itself is what the Bank of England describes.')}>
      <div className="td-ledger">
        <div className="td-ledger-cols">
          <div className="td-ledger-col">
            <span className="td-ledger-hd">{t(L('ما يملكه المصرف', 'What the bank owns'))}</span>
            <Bar label={L('احتياطيات', 'Reserves')} v={b.reserves} tone="a" />
            <Bar label={L('القروض', 'Loans')} v={b.loans} tone="a" />
          </div>
          <div className="td-ledger-col">
            <span className="td-ledger-hd">{t(L('ما يدين به المصرف', 'What the bank owes'))}</span>
            <Bar label={L('الودائع', 'Deposits')} v={b.deposits} tone="l" />
            <Bar label={L('رأس مال المصرف', 'Bank’s own capital')} v={b.equity} tone={b.equity < 200 ? 'warn' : 'e'} />
          </div>
        </div>
        <div className="td-ledger-money" role="status">
          <span>{t(L('المال في الاقتصاد', 'Money in the economy'))}</span>
          <b>{b.deposits.toLocaleString('en')}</b>
          <span className="td-ledger-sub">{t(L('حساب مريم', 'Miriam’s account'))}: {b.miriam} · {t(L('صانع الآلات', 'Machine-maker'))}: {b.maker}</span>
        </div>
        <div className="td-switch" role="group">
          <button className="sf-preset" onClick={go('lent')} disabled={st !== 'start'}>{t(L('١ · امنح مريم ٥٠٠ ألف', '1 · Lend Miriam 500k'))}</button>
          <button className="sf-preset" onClick={go('paid')} disabled={st !== 'lent'}>{t(L('٢ · تشتري الآلة', '2 · She buys the machine'))}</button>
          <button className="sf-preset" onClick={go('repaid')} disabled={st !== 'paid'}>{t(L('٣ · تسدّد', '3 · She repays'))}</button>
          <button className="sf-preset" onClick={go('defaulted')} disabled={st !== 'paid'}>{t(L('٣ · تتعثّر', '3 · She defaults'))}</button>
          <button className="sf-preset" onClick={go('start')} disabled={st === 'start'}>{t(L('من جديد', 'Start again'))}</button>
        </div>
        <p className="td-readout"><RichText value={b.line} /></p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 5 — The stag hunt (chapter 5)
   ============================================================
   Six hunters; each holds the line only if the group's shared confidence clears
   their own threshold. The stag needs ALL six, so the first to leave takes the
   rest with him — that two-step cascade is Rousseau's point, and Maria's. */
const HUNTERS = [28, 40, 48, 56, 64, 72]
export function TdStagHunt() {
  const { t } = useApp()
  const [conf, setConf] = useState(70)
  const [news, setNews] = useState(false)
  const c = Math.max(0, conf - (news ? 25 : 0))
  const firstOut = HUNTERS.filter((h) => h > c)
  const stag = firstOut.length === 0
  return (
    <FigureFrame number={5}
      title={L('صيد الأيل', 'The stag hunt')}
      caption={L('حرّك الثقة: كم يثق كلّ صيّادٍ بأن الآخرين سيثبتون في الدائرة. لكلٍّ منهم عتبته، والأيل لا يُصاد إلا بالستّة. ثم جرّب خبر «النقابات تقبل خفض الأجور ٢٠٪» — هكذا يقرأه أصحاب العمل: الأوضاع سيّئة. **التفاؤل والتشاؤم كلاهما يحقّق نفسه.**',
                   'Move the confidence: how far each hunter trusts the others to hold the circle. Each has a threshold, and the stag needs all six. Then try the headline “unions accept a 20% wage cut” — which is how employers read it: things must be bad. **Optimism and pessimism both fulfil themselves.**')}>
      <div className="td-stag">
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('الثقة بأن الجميع سيثبتون', 'Confidence that everyone holds the line'))}: <b>{pct(c)}</b></span>
          <input type="range" min="0" max="100" value={conf} onChange={(e) => setConf(+e.target.value)} />
        </label>
        <button className={`sf-preset ${news ? 'active' : ''}`} onClick={() => setNews((n) => !n)}>
          {t(L('خبر: «النقابات تقبل خفض الأجور ٢٠٪»', 'Headline: “unions accept a 20% wage cut”'))}
        </button>
        <div className="td-hunters" aria-hidden>
          {HUNTERS.map((h, i) => {
            const leaves = h > c
            const cls = stag ? 'stag' : leaves ? 'hare first' : 'hare follows'
            return (
              <div key={i} className={`td-hunter ${cls}`}>
                <span className="td-hunter-dot" />
                <span className="td-hunter-th">{t(L('عتبة', 'needs'))} {h}%</span>
              </div>
            )
          })}
        </div>
        <p className={`td-readout ${stag ? 'good' : 'bad'}`} role="status">
          <RichText value={stag
            ? L('**صِيد الأيل.** كلٌّ منهم وثق بالآخرين فثبت — فصدقت ثقته. عند ماريا: يوظّف الجميع، فيكسب العمّال، فيشترون الثلّاجات.',
                'The stag is caught. Each trusted the others and held — so the trust came true. For Maria: everyone hires, workers earn, and they buy the fridges.')
            : L(`**يأكلون الأرانب.** ${firstOut.length === HUNTERS.length ? 'لم يثبت أحد.' : `انسحب ${firstOut.length} أوّلاً، ورأى الباقون أن الأيل سيفلت فتبعوهم.`} عند ماريا: لا يوظّف أحد، فلا يكسب أحد، فلا يشتري أحد — وصدق التشاؤم.`,
                `**They eat hare.** ${firstOut.length === HUNTERS.length ? 'Nobody held.' : `${firstOut.length} broke away first; the rest saw the stag would escape and followed.`} For Maria: nobody hires, nobody earns, nobody buys — and the pessimism came true.`)} />
        </p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 6 — The Icarus syndrome (chapter 6)
   ============================================================
   OUR ILLUSTRATIVE MODEL, across a whole industry, with automation a in [0, 0.95]:
     cost per unit   c(a) = 1 − 0.55a           machines make each unit cheaper
     buyers' wages   d(a) = 1 − 0.8a            robots buy nothing
     price           p(a) = c + 0.28·d^1.6 − 0.12a
   Competition pins price to cost, and shrinking wages pull the margin down
   faster than automation pulls cost, until price < cost somewhere near a ≈ 0.68.
   Shapes only — the chart has no numbers on its axes on purpose. */
const IC = (a) => {
  const c = 1 - 0.55 * a
  const d = 1 - 0.8 * a
  const p = c + 0.28 * Math.pow(Math.max(d, 0), 1.6) - 0.12 * a
  return { c, d, p }
}
export function TdIcarus() {
  const { t, dir } = useApp()
  const [a, setA] = useState(30)
  const [crashed, setCrashed] = useState(false)
  const W = 520, H = 230, pad = 28
  const xs = useMemo(() => Array.from({ length: 96 }, (_, i) => i / 100), [])
  const crisisAt = xs.find((x) => IC(x).p < IC(x).c) ?? 1
  const X = (x) => { const v = pad + (x / 0.95) * (W - 2 * pad); return dir === 'rtl' ? W - v : v }
  const Y = (v) => H - pad - ((v - 0.35) / (1.3 - 0.35)) * (H - 2 * pad)
  const path = (key) => xs.map((x, i) => `${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(IC(x)[key]).toFixed(1)}`).join(' ')
  const cur = IC(a / 100)
  const inCrisis = cur.p < cur.c
  const margin = (cur.p - cur.c) / cur.c
  const onSlide = (v) => { setA(v); setCrashed(false) }
  return (
    <FigureFrame number={6}
      title={L('متلازمة إيكاروس', 'The Icarus syndrome')}
      caption={L('ارفع الأتمتة في صناعةٍ كاملة. الآلات تخفض **الكلفة**، والمنافسة تشدّ **السعر** نحوها، والروبوتات لا تشتري شيئاً فتضعف الأجور التي يُشترى بها. عند نقطةٍ ما يهبط السعر تحت الكلفة — فيذوب الشمع. **نموذجٌ توضيحيّ من النادي يتبع حجّة الكتاب، لا بيانات.**',
                   'Raise automation across a whole industry. Machines cut **cost**, competition drags **price** down to meet it, and robots buy nothing, so the wages that buy the products shrink. Somewhere the price falls below cost — and the wax melts. **An illustrative model of the club’s, following the book’s argument — not data.**')}>
      <div className="td-icarus">
        <svg viewBox={`0 0 ${W} ${H}`} className="td-chart" role="img"
          aria-label={t(L('السعر والكلفة مع ازدياد الأتمتة', 'Price and cost as automation rises'))}>
          <rect x={Math.min(X(crisisAt), X(0.95))} y={pad} width={Math.abs(X(0.95) - X(crisisAt))} height={H - 2 * pad} className="td-zone" />
          <text x={(X(crisisAt) + X(0.95)) / 2} y={pad + 16} className="td-zone-lbl" textAnchor="middle">{t(L('أزمة', 'Crisis'))}</text>
          <line x1={X(0)} x2={X(0.95)} y1={H - pad} y2={H - pad} className="td-axis" />
          <path d={path('c')} className="td-line cost" />
          <path d={path('p')} className="td-line price" />
          <line x1={X(a / 100)} x2={X(a / 100)} y1={pad} y2={H - pad} className="td-cursor" />
          <circle cx={X(a / 100)} cy={Y(cur.p)} r="5" className="td-dot price" />
          <circle cx={X(a / 100)} cy={Y(cur.c)} r="5" className="td-dot cost" />
          <text x={X(0)} y={H - 8} className="td-tick" textAnchor="middle">{t(L('عمّال', 'workers'))}</text>
          <text x={X(0.95)} y={H - 8} className="td-tick" textAnchor="middle">{t(L('روبوتات', 'robots'))}</text>
        </svg>
        <div className="td-legend" aria-hidden>
          <span className="td-key price">{t(L('السعر', 'Price'))}</span>
          <span className="td-key cost">{t(L('الكلفة', 'Cost'))}</span>
        </div>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('الأتمتة', 'Automation'))}: <b>{pct(a)}</b> · {t(L('الهامش', 'Margin'))}: <b>{(margin * 100).toFixed(0)}%</b></span>
          <input type="range" min="0" max="95" value={a} onChange={(e) => onSlide(+e.target.value)} />
        </label>
        <p className={`td-readout ${inCrisis ? 'bad' : ''}`} role="status">
          <RichText value={crashed
            ? L('**بعد الانهيار.** أفلس الأضعف وقلّت المنافسة، وصار البشر الجائعون أرخص من الآلات الجديدة — فعادوا إلى جزءٍ من خطوط الإنتاج. ثم يبدأ الصعود من جديد: **سيزيف**، لا إيكاروس وحده.',
                'After the crash. The weakest went bust, competition thinned, and hungry humans became cheaper than new machines — so they won back part of the line. Then the climb starts again: **Sisyphus**, not only Icarus.')
            : inCrisis
              ? L('**ذاب الشمع.** السعر تحت الكلفة: أصحاب المشاريع الذين اقترضوا من المستقبل ليشتروا الآلات لا يجدون ربحاً يسدّون به — فيتّصلون بمصرفييهم، ويبدأ الانهيار.',
                  'The wax melts. Price is below cost: the entrepreneurs who borrowed from the future to buy machines find no profit to repay with — they call their bankers, and the crash begins.')
              : L('الآلات تخفض الكلفة، لكن الهامش يضيق مع كلّ خطوة: المنافسون يتبعونك، والعمّال الذين استُبدلوا لا يشترون.',
                  'Machines cut cost, but the margin narrows at every step: competitors follow you, and the workers you replaced stop buying.')} />
        </p>
        {inCrisis && !crashed && (
          <button className="sf-preset" onClick={() => { setA(45); setCrashed(true) }}>{t(L('ماذا بعد الانهيار؟', 'What happens after the crash?'))}</button>
        )}
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 7 — The POW camp's money (chapter 7)
   ============================================================
   Price of a chocolate bar in cigarettes = 5 × (cigarettes in the camp ÷ normal).
   The book's own figures: five cigarettes a bar before the bombing, one after.
   The interest panel is the book's arithmetic: 20% a month plus whatever loss
   of value the lender expects. */
export function TdCigaretteCamp() {
  const { t } = useApp()
  const [supply, setSupply] = useState(100)
  const [last, setLast] = useState(null)
  const [infl, setInfl] = useState(10)
  const price = 5 * supply / 100
  const events = {
    parcels: { apply: (s) => Math.min(s * 1.5, 400),
      line: L('وصلت طرود الصليب الأحمر وفيها سجائر إضافية، والقهوة والشوكولاتة كما هي. **كلّ سيجارة تشتري الآن أقلّ**: تضخّم.',
              'Red Cross parcels arrive with extra cigarettes and the same coffee and chocolate. **Each cigarette now buys less**: inflation.') },
    bombing: { apply: (s) => Math.max(s * 0.2, 5),
      line: L('ليلةٌ تحت القصف، والأسرى يدخّنون سيجارةً تلو الأخرى. في الصباح قلّت السجائر كثيراً: **صار لوح الشوكولاتة بسيجارةٍ واحدة**. انكماش.',
              'A night under the bombs, prisoners smoking one cigarette after another. By morning there are far fewer: **a chocolate bar now costs a single cigarette**. Deflation.') },
  }
  const fire = (k) => { setSupply((s) => events[k].apply(s)); setLast(k) }
  const rate = 20 + infl
  return (
    <FigureFrame number={7}
      title={L('نقود معسكر الأسرى', 'The prisoners’ money')}
      caption={L('في معسكر رادفورد كانت السجائر هي النقود، والصليب الأحمر — دون أن يدري — هو المصرف المركزي. قيمة السيجارة لا تتعلّق بكلفة صنعها، بل **بندرتها**. وفي الأسفل حساب الكتاب نفسه: المُقرض يضيف إلى فائدته ما يتوقّع أن تخسره السيجارة من قيمتها.',
                   'In Radford’s camp cigarettes were the money and the Red Cross — without knowing it — was the central bank. A cigarette’s value has nothing to do with what it cost to make, only with **how scarce it is**. Below is the book’s own sum: a lender adds to his interest whatever value he expects a cigarette to lose.')}>
      <div className="td-camp">
        <div className="td-camp-price" role="status">
          <span>{t(L('ثمن لوح الشوكولاتة', 'Price of a chocolate bar'))}</span>
          <b>{price % 1 ? price.toFixed(1) : price}</b>
          <span>{t(L('سيجارة', 'cigarettes'))}</span>
        </div>
        <div className="td-camp-stock" aria-hidden>
          {Array.from({ length: 20 }, (_, i) => <i key={i} className={i < Math.round(supply / 20) ? 'on' : ''} />)}
        </div>
        <div className="td-switch" role="group">
          <button className="sf-preset" onClick={() => fire('parcels')}>{t(L('طرودٌ فيها سجائر إضافية', 'Parcels with extra cigarettes'))}</button>
          <button className="sf-preset" onClick={() => fire('bombing')}>{t(L('ليلة القصف', 'The night of the bombing'))}</button>
          <button className="sf-preset" onClick={() => { setSupply(100); setLast(null) }}>{t(L('الوضع العادي', 'Back to normal'))}</button>
        </div>
        <p className="td-readout"><RichText value={last ? events[last].line
          : L('في الأيام العادية: خمس سجائر للوح الشوكولاتة.', 'On an ordinary day: five cigarettes for a chocolate bar.')} /></p>

        <div className="td-camp-loan">
          <label className="sf-slider">
            <span className="sf-slider-lbl">{t(L('التضخّم الذي يتوقّعه المُقرض هذا الشهر', 'Inflation the lender expects this month'))}: <b>{infl}%</b></span>
            <input type="range" min="0" max="30" value={infl} onChange={(e) => setInfl(+e.target.value)} />
          </label>
          <p className="td-readout">
            <RichText value={L(
              `يُقرض **١٠ سجائر** ويطلب **${(10 * (1 + rate / 100)).toFixed(1)}** الشهر القادم: فائدة ${rate}٪ — أي ٢٠٪ «حقيقية» زائد ${infl}٪ تعويضاً عمّا ستفقده السجائر من قيمة.`,
              `He lends **10 cigarettes** and asks for **${(10 * (1 + rate / 100)).toFixed(1)}** next month: ${rate}% interest — a “real” 20% plus ${infl}% to make up for what the cigarettes will lose in value.`)} />
          </p>
        </div>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 8 — The trout river (chapter 8)
   ============================================================
   OUR ILLUSTRATIVE MODEL. 100 fishermen, each fishing h hours a season; the
   share of the stock caught is 1 − e^(−q·100h); what is left regrows
   logistically. K = 1000, r = 1.2, q = 0.002. At one hour each the river gives
   about the book's 200 a season indefinitely; past four hours it dies. */
const K = 1000, R = 1.2, Q = 0.002, SEASONS = 15
function river(h) {
  const f = 1 - Math.exp(-Q * 100 * h)
  let s = K
  const out = []
  for (let i = 0; i < SEASONS; i++) {
    const catchN = s * f
    const rem = s - catchN
    s = rem + R * rem * (1 - rem / K)
    out.push({ stock: s, catch: catchN })
  }
  return out
}
export function TdTroutRiver() {
  const { t, dir } = useApp()
  const [h, setH] = useState(1)
  const series = useMemo(() => river(h), [h])
  const lastC = series[SEASONS - 1].catch
  const perHour = lastC / (100 * h)
  const W = 520, H = 200, pad = 24, bw = (W - 2 * pad) / SEASONS
  const X = (i) => { const v = pad + i * bw; return dir === 'rtl' ? W - v - bw : v }
  const Y = (v) => H - pad - (v / K) * (H - 2 * pad)
  const dead = series[SEASONS - 1].stock < 30
  return (
    <FigureFrame number={8}
      title={L('نهر السلمون المرقّط', 'The trout river')}
      caption={L('مئة صيّاد على نهرٍ واحد. اختر كم ساعةً يصطاد **كلٌّ منهم** في الموسم وراقب خمسة عشر موسماً: الأعمدة صيد كلّ موسم، والخطّ ما بقي في النهر. ساعةٌ لكلٍّ منهم تُبقي النهر حيّاً إلى الأبد؛ والمنافسة تدفع كلاًّ منهم إلى ساعةٍ أخرى. **نموذجٌ توضيحيّ من النادي، لا بيانات.**',
                   'A hundred fishermen on one river. Choose how many hours **each** fishes a season and watch fifteen seasons: bars are each season’s catch, the line is what is left in the river. An hour each keeps the river alive for ever; competition pushes each of them to fish another. **An illustrative model of the club’s, not data.**')}>
      <div className="td-river">
        <svg viewBox={`0 0 ${W} ${H}`} className="td-chart" role="img"
          aria-label={t(L('الصيد والمخزون عبر خمسة عشر موسماً', 'Catch and stock over fifteen seasons'))}>
          <line x1={pad} x2={W - pad} y1={H - pad} y2={H - pad} className="td-axis" />
          {series.map((d, i) => (
            <rect key={i} x={X(i) + 2} width={bw - 4} y={Y(d.catch)} height={Math.max(H - pad - Y(d.catch), 0)} className="td-bar-catch" />
          ))}
          <path className="td-line stock" d={series.map((d, i) => `${i ? 'L' : 'M'}${(X(i) + bw / 2).toFixed(1)},${Y(d.stock).toFixed(1)}`).join(' ')} />
          <text x={dir === 'rtl' ? W - pad : pad} y={H - 6} className="td-tick" textAnchor="start">{t(L('الموسم ١', 'season 1'))}</text>
          <text x={dir === 'rtl' ? pad : W - pad} y={H - 6} className="td-tick" textAnchor="end">{t(L('الموسم ١٥', 'season 15'))}</text>
        </svg>
        <div className="td-legend" aria-hidden>
          <span className="td-key stock">{t(L('السمك في النهر', 'Trout in the river'))}</span>
          <span className="td-key catch">{t(L('صيد الموسم', 'Season’s catch'))}</span>
        </div>
        <label className="sf-slider">
          <span className="sf-slider-lbl">{t(L('ساعات صيد كلّ صيّاد', 'Hours each fisherman fishes'))}: <b>{h}</b></span>
          <input type="range" min="1" max="8" value={h} onChange={(e) => setH(+e.target.value)} />
        </label>
        <div className="td-stats" role="status">
          <span>{t(L('صيد الموسم الأخير', 'Last season’s catch'))} <b>{Math.round(lastC)}</b></span>
          <span>{t(L('سمكة لكلّ ساعة صيد', 'Trout per hour fished'))} <b>{perHour.toFixed(2)}</b></span>
        </div>
        <p className={`td-readout ${dead ? 'bad' : h === 1 ? 'good' : ''}`}>
          <RichText value={dead
            ? L('**مات النهر.** كلّ صيّادٍ تصرّف «بعقلانية» — ما دامت الساعة الإضافية تجلب سمكاً أكثر — ومجموع العقلانيات غباءٌ منظَّم. هذا معنى «الأغبياء» الأصلي: من لا يفكّر إلا في شأنه الخاص.',
                '**The river is dead.** Each fisherman acted “rationally” — another hour still brought more fish — and the sum of all that rationality is organised stupidity. That is the original meaning of “idiots”: those who mind only their own business.')
            : h === 1
              ? L('اتّفاق الحانة: ساعةٌ لكلّ صيّاد. صيدٌ معقول، ونهرٌ يتجدّد موسماً بعد موسم.',
                  'The pub agreement: one hour each. A decent catch, and a river that renews itself season after season.')
              : L('مزيدٌ من الساعات يرفع الصيد قليلاً ثم يأكل النهر نفسه: كلّ ساعةٍ تجلب سمكاً أقلّ من سابقتها.',
                  'More hours lift the catch a little, then start eating the river itself: each hour brings fewer fish than the last.')} />
        </p>
      </div>
    </FigureFrame>
  )
}

/* ============================================================
   Fig 9 — HALPEVAM (epilogue)
   ============================================================ */
const HALPEVAM = {
  go: L('اخترت الحائط. ستعيش الحياة الأمثل بمقاييسك أنت **كما هي اليوم** — ولن تتغيّر مقاييسك بعد ذلك أبداً. لا خيبة، ولا صراع، ولا سؤال «أريد هذا، لكن هل ينبغي أن أريده؟». يقول فاروفاكيس إن هذا ما يحاوله مجتمع السوق: أن يُشبع رغباتك — وهو هدفٌ لا ينبغي أن يتحقّق.',
        'You chose the wall. You will live the best life by your own standards **as they are today** — and those standards will never change again. No disappointment, no conflict, no “I want this, but should I?”. That, Varoufakis says, is what market society attempts: to satisfy your preferences — a goal that should never be met.'),
  stay: L('رفضت الحائط — وربّما يصعب عليك أن تقول لماذا. جواب الكتاب: السعادة الحقيقية ليست إشباع رغباتٍ ثابتة، بل **صيرورة** — ما سمّاه اليونان «يودايمونيا»، الازدهار — تتغيّر فيها رغباتك نفسها بالاحتكاك بعالمٍ يرفض أن يمنحك كلّ شيء.',
          'You refused the wall — and may find it hard to say why. The book’s answer: real happiness is not satisfying fixed desires but **becoming** — what the Greeks called eudaimonia, flourishing — in which your desires themselves change against a world that refuses to give you everything.'),
  secret: L('ماذا لو نُقلت إليه دون أن تعلم — أنت وكلّ البشر؟ لا أحد سيلاحظ شيئاً إلا ارتفاع السعادة. فإن أثار ذلك اشمئزازك، فقد اتّفقنا: **إشباع الرغبات مهمّ جداً، لكنه ليس كلّ شيء.** ولا فرق كبيراً بينه وبين «ماتريكس».',
            'What if you were moved there without knowing — you and every human? Nobody would notice anything but rising happiness. If that disgusts you, we agree: **satisfying preferences matters enormously, but it is not everything.** And it is not so different from the Matrix.'),
}
export function TdHalpevam() {
  const { t } = useApp()
  const [ans, setAns] = useState(null)
  return (
    <FigureFrame number={9}
      title={L('آلة HALPEVAM', 'The HALPEVAM machine')}
      caption={L('تجربة الكتاب الفكرية في خاتمته: حاسوبٌ يقرأ موجات دماغك ويصنع لك الحياة الأمثل بمقاييسك — خلف حائطٍ ترسمه بقلم. الشرط الوحيد: **لا عودة.**',
                   'The book’s closing thought experiment: a computer that reads your brainwaves and builds you the best possible life by your own lights — behind a wall you draw with a pen. One condition: **no way back.**')}
      interactive>
      <div className="td-halpevam">
        <p className="td-halp-q">{t(L('هل تعبر الحائط إلى الأبد؟', 'Would you go through the wall for ever?'))}</p>
        <div className="td-switch" role="group">
          <button className={`sf-preset ${ans === 'go' ? 'active' : ''}`} onClick={() => setAns('go')}>{t(L('أعبر', 'I’d go'))}</button>
          <button className={`sf-preset ${ans === 'stay' ? 'active' : ''}`} onClick={() => setAns('stay')}>{t(L('أبقى', 'I’d stay'))}</button>
          <button className={`sf-preset ${ans === 'secret' ? 'active' : ''}`} onClick={() => setAns('secret')}>{t(L('وإن نُقلتُ دون علمي؟', 'And if I were moved without knowing?'))}</button>
        </div>
        {ans && <p className="td-readout" role="status"><RichText value={HALPEVAM[ans]} /></p>}
      </div>
    </FigureFrame>
  )
}
