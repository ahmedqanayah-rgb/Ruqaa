import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell, Legend, ReferenceLine,
} from 'recharts'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })

/* ---------------- Fig 3 — The shrinking of collective attention ----------------
   Sourced: Lehmann et al. found a topic stayed in Twitter's top-50 for 17.5h in
   2013, falling to 11.9h by 2016. Two sourced points → two bars. */
const attnData = [
  { year: '2013', h: 17.5 },
  { year: '2016', h: 11.9 },
]
export function SfCollectiveAttention() {
  const { t } = useApp()
  return (
    <FigureFrame number={3} interactive={false}
      title={L('انكماش الانتباه الجماعي', 'The shrinking of collective attention')}
      caption={L('كم بقي الموضوع الرائج ضمن أكثر ٥٠ موضوعاً تداولاً على تويتر — هبط من ١٧٫٥ ساعة (٢٠١٣) إلى ١١٫٩ ساعة (٢٠١٦). النمط نفسه ظهر في بحث غوغل ومبيعات الأفلام.',
                 'How long a trending topic stayed in Twitter’s top-50 — down from 17.5 hours (2013) to 11.9 hours (2016). The same pattern appeared in Google searches and movie sales.')}>
      <div style={{ width: '100%', height: 260 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={attnData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              label={{ value: t(L('السنة', 'Year')), position: 'insideBottom', offset: -8, fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} width={44} domain={[0, 20]}
              label={{ value: t(L('ساعات في الصدارة', 'Hours on top')), angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip formatter={(v) => `${v} ${t(L('ساعة', 'h'))}`} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="h" radius={[6, 6, 0, 0]} maxBarSize={72}>
              <Cell fill="var(--blue)" />
              <Cell fill="var(--danger)" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 6 — Reading vs. the phone ----------------
   Sourced (2017): the average American spent 17 min/day reading books and
   5.4h (324 min) on their phone; reading for pleasure fell 40% (men) / 29%
   (women) between 2004 and 2017. */
const readData = [
  { what: L('قراءة الكتب', 'Reading books'), min: 17, c: 'var(--cool)' },
  { what: L('على الهاتف', 'On the phone'), min: 324, c: 'var(--danger)' },
]
export function SfReadingDecline() {
  const { t } = useApp()
  const data = readData.map((d) => ({ ...d, label: t(d.what) }))
  return (
    <FigureFrame number={6} interactive={false}
      title={L('القراءة مقابل الهاتف', 'Reading vs. the phone')}
      caption={L('دقائق اليوم عام ٢٠١٧: ١٧ دقيقة لقراءة الكتب مقابل ٥٫٤ ساعة (٣٢٤ دقيقة) على الهاتف. وبين ٢٠٠٤ و٢٠١٧ هبطت القراءة للمتعة ٤٠٪ لدى الرجال و٢٩٪ لدى النساء.',
                 'Minutes per day in 2017: 17 for reading books vs 5.4 hours (324 minutes) on the phone. Between 2004 and 2017, reading for pleasure fell 40% for men and 29% for women.')}>
      <div style={{ width: '100%', height: 260 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              label={{ value: t(L('دقائق في اليوم', 'Minutes per day')), position: 'insideBottom', offset: -4, fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis type="category" dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} width={96} />
            <Tooltip formatter={(v) => `${v} ${t(L('دقيقة', 'min'))}`} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="min" radius={[0, 6, 6, 0]} maxBarSize={40}>
              {data.map((d, i) => <Cell key={i} fill={d.c} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 10 — The shorter work week ----------------
   Sourced: Microsoft Japan (2019) reported +40% productivity on a four-day
   week; Kellogg (1920s) cut to a six-hour day and workplace accidents fell 41%.
   Horizontal layout so the long case names never clip on narrow screens. */
const weekData = [
  { case: L('مايكروسوفت اليابان', 'Microsoft Japan'), pct: 40, note: L('إنتاجية +٤٠٪', '+40% productivity'), c: 'var(--success)' },
  { case: L('كيلوغ (العشرينيات)', 'Kellogg (1920s)'), pct: 41, note: L('حوادث −٤١٪', '−41% accidents'), c: 'var(--cool)' },
]
export function SfFourDayWeek() {
  const { t } = useApp()
  const data = weekData.map((d) => ({ ...d, label: t(d.case) }))
  return (
    <FigureFrame number={10} interactive={false}
      title={L('أسبوع العمل الأقصر', 'The shorter work week')}
      caption={L('حين قصُر وقت العمل تحسّن الأداء: مايكروسوفت اليابان (٢٠١٩) سجّلت +٤٠٪ إنتاجية على أربعة أيّام، وكيلوغ (العشرينيات) خفّض الحوادث ٤١٪ بيومٍ من ست ساعات. وجرّبت بيربتشوال غارديان النيوزيلندية الفكرة بنجاح.',
                 'When working time shrank, performance improved: Microsoft Japan (2019) logged +40% productivity on four days, and Kellogg (1920s) cut accidents 41% with a six-hour day. New Zealand’s Perpetual Guardian trialled it successfully.')}>
      <div style={{ width: '100%', height: 220 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 40, left: 10, bottom: 10 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} domain={[0, 50]}
              label={{ value: t(L('تحسّن %', 'Improvement %')), position: 'insideBottom', offset: -4, fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis type="category" dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} width={118} />
            <Tooltip formatter={(v, k, p) => t(p.payload.note)} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={40}>
              {data.map((d, i) => <Cell key={i} fill={d.c} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 11 — Blood sugar & focus (illustrative) ----------------
   A qualitative schematic (no numeric axis): refined carbs spike then crash,
   dragging focus down mid-morning; a steadier release holds attention.
   A draggable hour cursor reads out the state of each "diet" at that moment.
   Shapes are illustrative of the book's argument, not measured values. */
const sugarData = [
  { h: 0, refined: 1, steady: 1 },
  { h: 0.5, refined: 2.6, steady: 1.3 },
  { h: 1, refined: 3.4, steady: 1.5 },
  { h: 1.5, refined: 2.4, steady: 1.65 },
  { h: 2, refined: 1.2, steady: 1.7 },
  { h: 2.5, refined: 0.7, steady: 1.6 },
  { h: 3, refined: 0.5, steady: 1.5 },
  { h: 3.5, refined: 0.7, steady: 1.45 },
  { h: 4, refined: 0.9, steady: 1.4 },
]
function sugarState(h) {
  const refined =
    h < 0.5 ? L('خطّ الأساس', 'baseline')
    : h <= 1 ? L('⚡ اندفاعٌ عصبيّ — طاقةٌ عالية مشتّتة', '⚡ a jittery surge — high, scattered energy')
    : h <= 2 ? L('📉 الهبوط بدأ — التركيز يتسرّب', '📉 the drop begins — focus leaking away')
    : h <= 3 ? L('😵 الانهيار — ضبابٌ ونعاسٌ وتشتّت', '😵 the crash — fog, drowsiness, distraction')
    : L('🍩 جوعٌ مبكر ورغبةٌ في سكّرٍ جديد', '🍩 early hunger and a craving for more sugar')
  const steady = h < 0.5 ? L('خطّ الأساس', 'baseline') : L('🙂 طاقةٌ مستقرّة وتركيزٌ ثابت', '🙂 steady energy, stable focus')
  return { refined, steady }
}
export function SfBloodSugar() {
  const { t } = useApp()
  const [cur, setCur] = useState(2)
  const state = sugarState(cur)
  return (
    <FigureFrame number={11}
      title={L('سكّر الدم والتركيز', 'Blood sugar & focus')}
      caption={L('رسمٌ توضيحيّ (لا أرقام دقيقة): النشويات المكرّرة ترفع السكّر بسرعة ثم تُسقطه، فيأتي «انهيار» التركيز؛ أمّا الإطلاق البطيء فيُبقي الانتباه أثبت. حرّك مؤشّر الساعة وقارن حالتك على النظامين.',
                 'An illustrative schematic (no precise numbers): refined carbs spike blood sugar then drop it, bringing a focus “crash”; a slower release keeps attention steadier. Drag the hour cursor and compare your state on each diet.')}>
      <div style={{ width: '100%', height: 280 }} dir="ltr">
        <ResponsiveContainer>
          <LineChart data={sugarData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis dataKey="h" type="number" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]}
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickFormatter={(v) => `${v}${t(L('س', 'h'))}`}
              label={{ value: t(L('الساعات بعد الأكل', 'Hours after eating')), position: 'insideBottom', offset: -8, fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis tick={false} width={30} axisLine={{ stroke: 'var(--chart-grid)' }}
              label={{ value: t(L('سكّر الدم', 'Blood sugar')), angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }} />
            <Legend formatter={(v) => (v === 'refined' ? t(L('نشويات مكرّرة', 'Refined carbs')) : t(L('إطلاق بطيء', 'Slow release')))} />
            <ReferenceLine x={cur} stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 3" />
            <Line type="monotone" dataKey="refined" stroke="var(--danger)" strokeWidth={3} dot={false} isAnimationActive />
            <Line type="monotone" dataKey="steady" stroke="var(--success)" strokeWidth={3} dot={false} isAnimationActive />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <label className="sf-slider">
        <span className="sf-slider-lbl">
          {t(L('الساعة بعد الأكل', 'Hours after eating'))}: <b>{t({ ar: String(cur), en: String(cur) })}</b>
        </span>
        <input type="range" min="0" max="4" step="0.5" value={cur} onChange={(e) => setCur(+e.target.value)} />
      </label>
      <div className="sf-sugar-states">
        <p className="sf-sugar-state refined"><b>{t(L('نشويات مكرّرة:', 'Refined carbs:'))}</b> {t(state.refined)}</p>
        <p className="sf-sugar-state steady"><b>{t(L('إطلاق بطيء:', 'Slow release:'))}</b> {t(state.steady)}</p>
      </div>
    </FigureFrame>
  )
}
