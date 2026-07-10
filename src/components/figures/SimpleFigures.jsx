import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend, Cell,
} from 'recharts'
import { useApp } from '../../context/AppContext.jsx'
import FigureFrame from './FigureFrame.jsx'
import HoverLineChart from './HoverLineChart.jsx'

const L = (ar, en) => ({ ar, en })

/* ---------------- Fig 1 — Circadian body-temperature rhythm ----------------
   Y-axis measured from the book's reference (Figure 1): 36.6–37.2 °C in 0.1
   steps — deliberately not starting at zero, so the small daily swing shows. */
const tempData = [
  { h: '8am', t: 36.85 }, { h: '10am', t: 36.98 }, { h: '12pm', t: 37.06 },
  { h: '2pm', t: 37.12 }, { h: '4pm', t: 37.15 }, { h: '6pm', t: 37.13 },
  { h: '8pm', t: 37.02 }, { h: '10pm', t: 36.90 }, { h: '12am', t: 36.82 },
  { h: '2am', t: 36.74 }, { h: '4am', t: 36.68 }, { h: '6am', t: 36.75 },
]
export function Fig1Temperature() {
  return (
    <FigureFrame number={1}
      title={L('الإيقاع اليومي لحرارة الجسم الداخلية (٢٤ ساعة)', 'Circadian core body-temperature rhythm (24h)')}
      caption={L('الحرارة تبلغ أدناها قرب الفجر (~٣٦٫٧°م، حين يكون النوم أعمق) وذروتها بعد الظهر (~٣٧٫١°م). محور Y يبدأ من ٣٦٫٦ لا من الصفر لتظهر التغيّرات الصغيرة. مرّر المؤشّر لقراءة (الوقت، الحرارة).',
                 'Temperature bottoms out near dawn (~36.7 °C, when sleep is deepest) and peaks in the afternoon (~37.1 °C). The Y-axis starts at 36.6, not zero, so the small variations are visible. Hover to read (time, temperature).')}>
      <HoverLineChart data={tempData} xKey="h" yKey="t" color="var(--warm)"
        xLabel={L('الوقت', 'Time')} yLabel={L('الحرارة (°م)', 'Temperature (°C)')} unit={L('°م', '°C')}
        yDomain={[36.6, 37.2]} yTicks={[36.6, 36.7, 36.8, 36.9, 37.0, 37.1, 37.2]}
        markers={[{ x: '4am', label: L('الأدنى', 'Trough') }, { x: '4pm', label: L('الذروة', 'Peak') }]} />
    </FigureFrame>
  )
}

/* ---------------- Fig 2 — Melatonin cycle ---------------- */
const melaData = [
  { h: '12:00', m: 2 }, { h: '15:00', m: 3 }, { h: '18:00', m: 6 }, { h: '20:00', m: 20 },
  { h: '21:00', m: 45 }, { h: '22:00', m: 70 }, { h: '00:00', m: 90 }, { h: '02:00', m: 100 },
  { h: '04:00', m: 80 }, { h: '06:00', m: 35 }, { h: '08:00', m: 8 }, { h: '10:00', m: 3 },
]
export function Fig2Melatonin() {
  return (
    <FigureFrame number={2}
      title={L('دورة الميلاتونين (Melatonin)', 'Melatonin cycle')}
      caption={L('الميلاتونين شبه غائب نهاراً، يرتفع بعد الغروب ويبلغ ذروته في عمق الليل — يوقّت النوم ولا يولّده.',
                 'Melatonin is near-absent by day, rises after dusk and peaks deep in the night — it times sleep, it doesn’t generate it.')}>
      <HoverLineChart data={melaData} xKey="h" yKey="m" color="var(--violet)"
        xLabel={L('الوقت', 'Time')} yLabel={L('الميلاتونين', 'Melatonin')} unit={L('%', '%')}
        markers={[{ x: '02:00', label: L('الذروة', 'Peak') }]} />
    </FigureFrame>
  )
}

/* ---------------- Fig 10 — Sleep loss vs sports injuries (static) ---------------- */
const injuryData = [
  { s: '5', inj: 75 }, { s: '6', inj: 62 }, { s: '7', inj: 44 },
  { s: '8', inj: 28 }, { s: '9', inj: 18 },
]
export function Fig10Injuries() {
  const { t } = useApp()
  return (
    <FigureFrame number={10} interactive={false}
      title={L('نقص النوم والإصابات الرياضية', 'Sleep loss vs. sports injuries')}
      caption={L('كلّما قلّ نوم الرياضي ارتفع احتمال إصابته بحدّة.',
                 'The less an athlete sleeps, the sharply higher their injury risk.')}>
      <div style={{ width: '100%', height: 280 }} dir="ltr">
        <ResponsiveContainer>
          <LineChart data={injuryData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis dataKey="s" tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              label={{ value: t(L('ساعات النوم', 'Hours of sleep')), position: 'insideBottom', offset: -8, fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} width={44}
              label={{ value: t(L('احتمال الإصابة %', 'Injury likelihood %')), angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Line type="monotone" dataKey="inj" stroke="var(--danger)" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 12 — Sleep loss vs car accidents (static) ---------------- */
const carData = [
  { r: '<4h', mult: 11.5 }, { r: '4–5h', mult: 4.3 },
  { r: '5–6h', mult: 1.9 }, { r: '6–7h', mult: 1.3 },
]
export function Fig12CarAccidents() {
  const { t } = useApp()
  return (
    <FigureFrame number={12} interactive={false}
      title={L('نقص النوم وحوادث السيارات', 'Sleep loss vs. car accidents')}
      caption={L('خطر الحادث يتصاعد بصورة غير خطّية مع نقص النوم — النوم أقلّ من ٤ ساعات يضاعف الخطر ×١١٫٥.',
                 'Crash risk rises non-linearly as sleep drops — under 4 hours multiplies risk ×11.5.')}>
      <div style={{ width: '100%', height: 280 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={carData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="r" tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              label={{ value: t(L('ساعات النوم', 'Hours of sleep')), position: 'insideBottom', offset: -8, fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} width={44}
              label={{ value: t(L('مضاعف الخطر', 'Risk multiplier')), angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 12 }} />
            <Tooltip formatter={(v) => `×${v}`} />
            <Bar dataKey="mult" radius={[6, 6, 0, 0]}>
              {carData.map((d, i) => (
                <Cell key={i} fill={d.mult > 5 ? 'var(--danger)' : d.mult > 2 ? 'var(--warm)' : 'var(--blue)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 13 — Obesity vs sleep over decades (hover both lines) ---------------- */
const obesityData = [
  { year: 1960, sleep: 8.1, obesity: 13 }, { year: 1970, sleep: 7.7, obesity: 15 },
  { year: 1980, sleep: 7.4, obesity: 19 }, { year: 1990, sleep: 7.1, obesity: 23 },
  { year: 2000, sleep: 6.9, obesity: 31 }, { year: 2010, sleep: 6.7, obesity: 36 },
]
export function Fig13Obesity() {
  const { t } = useApp()
  const Tip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    const p = payload[0].payload
    return (
      <div className="chart-tip">
        <div>{t(L('السنة', 'Year'))}: <b>{label}</b></div>
        <div>{t(L('متوسّط النوم', 'Avg sleep'))}: <b>{p.sleep}h</b></div>
        <div>{t(L('نسبة البدانة', 'Obesity'))}: <b>{p.obesity}%</b></div>
      </div>
    )
  }
  return (
    <FigureFrame number={13}
      title={L('البدانة ونقص النوم عبر العقود', 'Obesity vs. sleep over decades')}
      caption={L('خطّان متعاكسان: متوسّط النوم يهبط بينما تصعد البدانة. مرّر المؤشّر لقراءة (السنة، القيمة).',
                 'Two opposing lines: average sleep falls while obesity rises. Hover to read (year, value).')}>
      <div style={{ width: '100%', height: 300 }} dir="ltr">
        <ResponsiveContainer>
          <LineChart data={obesityData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
            <YAxis yAxisId="l" tick={{ fill: 'var(--blue)', fontSize: 12 }} width={40} domain={[6, 9]} />
            <YAxis yAxisId="r" orientation="right" tick={{ fill: 'var(--danger)', fontSize: 12 }} width={40} domain={[0, 45]} />
            <Tooltip content={<Tip />} />
            <Legend formatter={(v) => (v === 'sleep' ? t(L('متوسّط النوم (ساعة)', 'Avg sleep (h)')) : t(L('البدانة %', 'Obesity %')))} />
            <Line yAxisId="l" type="monotone" dataKey="sleep" stroke="var(--blue)" strokeWidth={3} dot={{ r: 3 }} />
            <Line yAxisId="r" type="monotone" dataKey="obesity" stroke="var(--danger)" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </FigureFrame>
  )
}

/* ---------------- Fig 11 — Basketball performance (two sleep conditions) ----------------
   Faithful to the book's Figure 11: the SAME player, André Iguodala, under two
   separate experimental conditions — sleeping ≥8h vs. sleep-deprived (<8h). The
   four "up" metrics are gains seen with a full night; the two "down" metrics are
   the costs seen when deprived. The two conditions are kept clearly separate. */
const bballRested = [
  { label: L('دقائق الاستمرار في اللعب', 'Minutes of play sustained'), value: '+12%' },
  { label: L('معدّل النقاط لكل دقيقة', 'Points per minute'), value: '+29%' },
  { label: L('نسبة تسجيل الثلاثيات', 'Three-point scoring %'), value: '+2%' },
  { label: L('نسبة الرميات الحرّة', 'Free-throw %'), value: '+9%' },
]
const bballDeprived = [
  { label: L('خسارة الكرة لصالح الخصم', 'Turnovers to the opponent'), value: '+37%' },
  { label: L('الأخطاء المرتكبة', 'Committed fouls / errors'), value: '+45%' },
]
export function Fig11Basketball() {
  const { t } = useApp()
  return (
    <FigureFrame number={11} interactive={false}
      title={L('أداء لاعب كرة السلة — حالتان تجريبيتان', 'Basketball performance — two experimental conditions')}
      caption={L('اللاعب نفسه (أندريه إيغودالا / André Iguodala) في حالتين: نومٌ ٨ ساعات فأكثر مقابل حرمانٍ من النوم (أقلّ من ٨ ساعات). في حالة الراحة الكاملة ترتفع مؤشّرات الأداء؛ وفي حالة الحرمان ترتفع الأخطاء والخسائر.',
                 'The same player (André Iguodala) under two conditions: sleeping ≥8 hours vs. sleep-deprived (<8 hours). Well-rested, his performance metrics rise; sleep-deprived, his errors and turnovers rise.')}>
      <div className="bball-conditions">
        <div className="bball-condition rested">
          <div className="bball-cond-head">
            <span className="pill blue">{t(L('النوم ٨ ساعات فأكثر', 'Sleep ≥ 8 hours'))}</span>
            <span className="bball-cond-sub">{t(L('مكاسب الأداء', 'performance gains'))}</span>
          </div>
          <div className="bball-grid">
            {bballRested.map((m, i) => (
              <div key={i} className="bball-cell">
                <span className="bball-arrow good">▲</span>
                <span className="bball-val">{m.value}</span>
                <span className="bball-lbl">{t(m.label)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bball-vs">{t(L('مقابل', 'vs'))}</div>
        <div className="bball-condition deprived">
          <div className="bball-cond-head">
            <span className="pill warm">{t(L('النوم أقلّ من ٨ ساعات', 'Sleep < 8 hours'))}</span>
            <span className="bball-cond-sub">{t(L('تكاليف الحرمان', 'costs of deprivation'))}</span>
          </div>
          <div className="bball-grid">
            {bballDeprived.map((m, i) => (
              <div key={i} className="bball-cell">
                <span className="bball-arrow bad">▼</span>
                <span className="bball-val">{m.value}</span>
                <span className="bball-lbl">{t(m.label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FigureFrame>
  )
}
