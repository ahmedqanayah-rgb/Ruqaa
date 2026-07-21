import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell, Legend, ReferenceLine, ReferenceDot, LabelList,
} from 'recharts'
import { useApp } from '../../../context/AppContext.jsx'
import FigureFrame from '../FigureFrame.jsx'

const L = (ar, en) => ({ ar, en })

/* ---------------------------------------------------------------------------
   Shared hover layer for the four Stolen Focus charts.

   One rule set across all of them: the mark itself is the hit target and lifts
   when the pointer is on it (the others recede), the tooltip leads with the
   value and keys each series with a short stroke of its own colour, and a
   readout under the chart narrates whatever is hovered. Every number a tooltip
   shows is also painted on the chart as a direct label — hover enriches the
   figure, it never gates the data behind a pointer.
   --------------------------------------------------------------------------- */

/* rows = [{ color, value, label }] — `value` is always the emphasized half and
   `label` the secondary one, so callers pass whichever field the reader is
   actually after. `stacked` puts the key + label on their own line above the
   value, for figures whose "value" is a sentence rather than a number.
   `note` adds a line of context under all the rows. */
function SfTip({ head, rows, note, stacked }) {
  return (
    <div className={`chart-tip sf-tip${stacked ? ' sf-tip--stacked' : ''}`}>
      {head && <div className="sf-tip-head">{head}</div>}
      {rows.map((r, i) => (
        <div key={i} className="sf-tip-row">
          <span className="sf-tip-key" style={{ background: r.color }} aria-hidden />
          <b className="sf-tip-val">{r.value}</b>
          <span className="sf-tip-lbl">{r.label}</span>
        </div>
      ))}
      {note && <p className="sf-tip-note">{note}</p>}
    </div>
  )
}

// Every bar chart here needs the same "which bar is under the pointer" state.
function useBarHover() {
  const [active, setActive] = useState(null)
  const handlers = {
    onMouseMove: (s) => setActive(s && s.activeTooltipIndex != null ? s.activeTooltipIndex : null),
    onMouseLeave: () => setActive(null),
  }
  return { active, handlers }
}

// Unhovered bars recede so the hovered one reads as lifted.
const dim = (active, i) => (active === null || active === i ? 1 : 0.4)
const ring = (active, i) => (active === i ? 'var(--text)' : 'transparent')

const tipCursor = { fill: 'var(--surface-hover)', fillOpacity: 0.5 }
const axisTick = { fill: 'var(--text-muted)', fontSize: 12 }
const axisLbl = { fill: 'var(--text-muted)', fontSize: 12 }
const valueLbl = { fill: 'var(--text-soft)', fontSize: 12, fontWeight: 700 }

/* ---------------- Fig 3 — The shrinking of collective attention ----------------
   Sourced: Lehmann et al. found a topic stayed in Twitter's top-50 for 17.5h in
   2013, falling to 11.9h by 2016. Two sourced points → two bars. */
const attnData = [
  { year: '2013', h: 17.5, c: 'var(--blue)' },
  { year: '2016', h: 11.9, c: 'var(--danger)' },
]
const ATTN_DROP = +(attnData[0].h - attnData[1].h).toFixed(1) // 5.6 hours
const ATTN_PCT = Math.round((ATTN_DROP / attnData[0].h) * 100) // 32%

export function SfCollectiveAttention() {
  const { t } = useApp()
  const { active, handlers } = useBarHover()

  const notes = [
    L(`نقطة البداية: موضوعٌ واحد كان يصمد في الصدارة ما يقارب يوماً كاملاً من الاهتمام.`,
      `The starting point: a single topic held the top 50 for the better part of a waking day.`),
    L(`بعد ثلاث سنواتٍ فقط: −${ATTN_DROP} ساعة (−${ATTN_PCT}٪). لم يتغيّر الناس، بل تسارع ما يُعرض عليهم.`,
      `Just three years later: −${ATTN_DROP} hours (−${ATTN_PCT}%). People didn’t change — the rate of what’s pushed at them did.`),
  ]

  const Tip = ({ active: on, payload }) => {
    if (!on || !payload || !payload.length) return null
    const i = attnData.findIndex((d) => d.year === payload[0].payload.year)
    return (
      <SfTip head={t(L('السنة', 'Year')) + ' ' + payload[0].payload.year}
        rows={[{ color: attnData[i].c, value: `${attnData[i].h} ${t(L('ساعة', 'h'))}`, label: t(L('في الصدارة', 'on top')) }]}
        note={t(notes[i])} />
    )
  }

  return (
    <FigureFrame number={3}
      title={L('انكماش الانتباه الجماعي', 'The shrinking of collective attention')}
      caption={L('كم بقي الموضوع الرائج ضمن أكثر ٥٠ موضوعاً تداولاً على تويتر — هبط من ١٧٫٥ ساعة (٢٠١٣) إلى ١١٫٩ ساعة (٢٠١٦). النمط نفسه ظهر في بحث غوغل ومبيعات الأفلام. **مرّر المؤشّر على العمودين** لقراءة الفارق.',
                 'How long a trending topic stayed in Twitter’s top-50 — down from 17.5 hours (2013) to 11.9 hours (2016). The same pattern appeared in Google searches and movie sales. **Hover the two bars** to read the gap.')}>
      <div style={{ width: '100%', height: 260 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={attnData} margin={{ top: 24, right: 20, left: 0, bottom: 20 }} {...handlers}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" tick={axisTick}
              label={{ value: t(L('السنة', 'Year')), position: 'insideBottom', offset: -8, ...axisLbl }} />
            <YAxis tick={axisTick} width={44} domain={[0, 20]}
              label={{ value: t(L('ساعات في الصدارة', 'Hours on top')), angle: -90, position: 'insideLeft', ...axisLbl }} />
            <Tooltip content={<Tip />} cursor={tipCursor} />
            <Bar dataKey="h" radius={[6, 6, 0, 0]} maxBarSize={72} isAnimationActive>
              {attnData.map((d, i) => (
                <Cell key={i} fill={d.c} fillOpacity={dim(active, i)} stroke={ring(active, i)} strokeWidth={2} />
              ))}
              <LabelList dataKey="h" position="top" offset={8} {...valueLbl}
                formatter={(v) => `${v}${t(L('س', 'h'))}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="sf-readout" aria-live="polite">
        {active === null
          ? t({ ar: `في ثلاث سنوات فقط فقد الموضوع الرائج ${ATTN_DROP} ساعة من عمره في الصدارة — انكماشٌ قدره ${ATTN_PCT}٪.`,
                en: `In three years a trending topic lost ${ATTN_DROP} hours of life at the top — a ${ATTN_PCT}% contraction.` })
          : t(notes[active])}
      </p>
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
const READ_RATIO = Math.round(readData[1].min / readData[0].min) // 19×

export function SfReadingDecline() {
  const { t } = useApp()
  const { active, handlers } = useBarHover()
  const data = readData.map((d) => ({ ...d, label: t(d.what) }))

  const notes = [
    L('١٧ دقيقة في اليوم. وبين ٢٠٠٤ و٢٠١٧ هبطت القراءة للمتعة ٤٠٪ لدى الرجال و٢٩٪ لدى النساء.',
      '17 minutes a day. And between 2004 and 2017, reading for pleasure fell 40% for men and 29% for women.'),
    L(`٥٫٤ ساعة في اليوم — أي نحو ${READ_RATIO} ضعف الوقت الذي نمنحه للكتب.`,
      `5.4 hours a day — roughly ${READ_RATIO}× the time we give to books.`),
  ]

  const Tip = ({ active: on, payload }) => {
    if (!on || !payload || !payload.length) return null
    const p = payload[0].payload
    const i = data.findIndex((d) => d.label === p.label)
    return (
      <SfTip head={p.label}
        rows={[{ color: p.c, value: `${p.min} ${t(L('دقيقة', 'min'))}`, label: t(L('في اليوم', 'per day')) }]}
        note={t(notes[i])} />
    )
  }

  return (
    <FigureFrame number={6}
      title={L('القراءة مقابل الهاتف', 'Reading vs. the phone')}
      caption={L('دقائق اليوم عام ٢٠١٧: ١٧ دقيقة لقراءة الكتب مقابل ٥٫٤ ساعة (٣٢٤ دقيقة) على الهاتف. وبين ٢٠٠٤ و٢٠١٧ هبطت القراءة للمتعة ٤٠٪ لدى الرجال و٢٩٪ لدى النساء. **مرّر المؤشّر على الشريطين** لترى النسبة بينهما.',
                 'Minutes per day in 2017: 17 for reading books vs 5.4 hours (324 minutes) on the phone. Between 2004 and 2017, reading for pleasure fell 40% for men and 29% for women. **Hover the two bars** to see the ratio.')}>
      <div style={{ width: '100%', height: 260 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 64, left: 10, bottom: 10 }} {...handlers}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={axisTick} domain={[0, 360]}
              label={{ value: t(L('دقائق في اليوم', 'Minutes per day')), position: 'insideBottom', offset: -4, ...axisLbl }} />
            <YAxis type="category" dataKey="label" tick={axisTick} width={96} />
            <Tooltip content={<Tip />} cursor={tipCursor} />
            <Bar dataKey="min" radius={[0, 6, 6, 0]} maxBarSize={40} isAnimationActive>
              {data.map((d, i) => (
                <Cell key={i} fill={d.c} fillOpacity={dim(active, i)} stroke={ring(active, i)} strokeWidth={2} />
              ))}
              <LabelList dataKey="min" position="right" offset={10} {...valueLbl}
                formatter={(v) => `${v} ${t(L('د', 'min'))}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="sf-readout" aria-live="polite">
        {active === null
          ? t({ ar: `الهاتف يلتهم نحو ${READ_RATIO} ضعف ما تلتهمه الكتب من يومنا.`,
                en: `The phone eats about ${READ_RATIO}× as much of our day as books do.` })
          : t(notes[active])}
      </p>
    </FigureFrame>
  )
}

/* ---------------- Fig 10 — The shorter work week ----------------
   Sourced: Microsoft Japan (2019) reported +40% productivity on a four-day
   week; Kellogg (1920s) cut to a six-hour day and workplace accidents fell 41%.
   Horizontal layout so the long case names never clip on narrow screens. */
const weekData = [
  { case: L('مايكروسوفت اليابان', 'Microsoft Japan'), pct: 40, c: 'var(--success)',
    note: L('٢٠١٩: أربعة أيّام عمل في الأسبوع، فارتفعت الإنتاجية ٤٠٪ — ساعاتٌ أقلّ وإنجازٌ أكثر.',
            '2019: a four-day week, and productivity rose 40% — fewer hours, more done.') },
  { case: L('كيلوغ (العشرينيات)', 'Kellogg (1920s)'), pct: 41, c: 'var(--cool)',
    note: L('العشرينيات: يوم عملٍ من ست ساعات، فهبطت حوادث العمل ٤١٪ — الانتباه يتعافى حين يرتاح.',
            'The 1920s: a six-hour day, and workplace accidents fell 41% — attention recovers when it rests.') },
]

export function SfFourDayWeek() {
  const { t } = useApp()
  const { active, handlers } = useBarHover()
  const data = weekData.map((d) => ({ ...d, label: t(d.case) }))

  const Tip = ({ active: on, payload }) => {
    if (!on || !payload || !payload.length) return null
    const p = payload[0].payload
    return (
      <SfTip head={p.label}
        rows={[{ color: p.c, value: `${p.pct}%`, label: t(L('تحسّن', 'improvement')) }]}
        note={t(p.note)} />
    )
  }

  return (
    <FigureFrame number={10}
      title={L('أسبوع العمل الأقصر', 'The shorter work week')}
      caption={L('حين قصُر وقت العمل تحسّن الأداء: مايكروسوفت اليابان (٢٠١٩) سجّلت +٤٠٪ إنتاجية على أربعة أيّام، وكيلوغ (العشرينيات) خفّض الحوادث ٤١٪ بيومٍ من ست ساعات. وجرّبت بيربتشوال غارديان النيوزيلندية الفكرة بنجاح. **مرّر المؤشّر على كلّ حالة** لتفصيلها.',
                 'When working time shrank, performance improved: Microsoft Japan (2019) logged +40% productivity on four days, and Kellogg (1920s) cut accidents 41% with a six-hour day. New Zealand’s Perpetual Guardian trialled it successfully. **Hover each case** for the detail.')}>
      <div style={{ width: '100%', height: 220 }} dir="ltr">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 56, left: 10, bottom: 10 }} {...handlers}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tick={axisTick} domain={[0, 50]}
              label={{ value: t(L('تحسّن %', 'Improvement %')), position: 'insideBottom', offset: -4, ...axisLbl }} />
            <YAxis type="category" dataKey="label" tick={axisTick} width={118} />
            <Tooltip content={<Tip />} cursor={tipCursor} />
            <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={40} isAnimationActive>
              {data.map((d, i) => (
                <Cell key={i} fill={d.c} fillOpacity={dim(active, i)} stroke={ring(active, i)} strokeWidth={2} />
              ))}
              <LabelList dataKey="pct" position="right" offset={10} {...valueLbl} formatter={(v) => `${v}%`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="sf-readout" aria-live="polite">
        {active === null
          ? t(L('حالتان مختلفتان تماماً، ونتيجةٌ واحدة: تقصير وقت العمل رفع الأداء بدل أن يخفضه.',
                'Two very different cases, one result: cutting working time raised performance instead of lowering it.'))
          : t(data[active].note)}
      </p>
    </FigureFrame>
  )
}

/* ---------------- Fig 11 — Blood sugar & focus (illustrative) ----------------
   A qualitative schematic (no numeric axis): refined carbs spike then crash,
   dragging focus down mid-morning; a steadier release holds attention.
   An hour cursor reads out the state of each "diet" at that moment — driven by
   hovering the plot itself (the crosshair snaps to the nearest half-hour), with
   the slider kept as the keyboard/touch path to the same state.
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
  const [hovering, setHovering] = useState(false)
  const state = sugarState(cur)
  const point = sugarData.find((d) => d.h === cur) || sugarData[0]

  // Hovering the plot drives the same cursor the slider does — recharts snaps
  // activeLabel to the nearest datum, so the crosshair lands on real half-hours.
  const onMove = (s) => {
    if (!s || s.activeLabel == null) return
    const h = Number(s.activeLabel)
    if (!Number.isNaN(h)) { setHovering(true); setCur(h) }
  }

  // One tooltip, both series — the pointer never has to land on a line. Here the
  // "value" is the state sentence, so it takes the emphasis and the series name
  // sits above it as the secondary label (stacked, since sentences wrap).
  const Tip = ({ active: on }) => {
    if (!on) return null
    const st = sugarState(cur)
    return (
      <SfTip stacked head={`${cur}${t(L('س', 'h'))} ${t(L('بعد الأكل', 'after eating'))}`}
        rows={[
          { color: 'var(--danger)', label: t(L('نشويات مكرّرة', 'Refined carbs')), value: t(st.refined) },
          { color: 'var(--success)', label: t(L('إطلاق بطيء', 'Slow release')), value: t(st.steady) },
        ]} />
    )
  }

  return (
    <FigureFrame number={11}
      title={L('سكّر الدم والتركيز', 'Blood sugar & focus')}
      caption={L('رسمٌ توضيحيّ (لا أرقام دقيقة): النشويات المكرّرة ترفع السكّر بسرعة ثم تُسقطه، فيأتي «انهيار» التركيز؛ أمّا الإطلاق البطيء فيُبقي الانتباه أثبت. **مرّر المؤشّر عبر الرسم** — أو استخدم المنزلق — وقارن حالتك على النظامين ساعةً بساعة.',
                 'An illustrative schematic (no precise numbers): refined carbs spike blood sugar then drop it, bringing a focus “crash”; a slower release keeps attention steadier. **Sweep the pointer across the plot** — or use the slider — and compare your state on each diet, hour by hour.')}>
      <div style={{ width: '100%', height: 280 }} dir="ltr">
        <ResponsiveContainer>
          <LineChart data={sugarData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
            onMouseMove={onMove} onMouseLeave={() => setHovering(false)}>
            <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" />
            <XAxis dataKey="h" type="number" domain={[0, 4]} ticks={[0, 1, 2, 3, 4]}
              tick={axisTick}
              tickFormatter={(v) => `${v}${t(L('س', 'h'))}`}
              label={{ value: t(L('الساعات بعد الأكل', 'Hours after eating')), position: 'insideBottom', offset: -8, ...axisLbl }} />
            <YAxis tick={false} width={30} axisLine={{ stroke: 'var(--chart-grid)' }}
              label={{ value: t(L('سكّر الدم', 'Blood sugar')), angle: -90, position: 'insideLeft', ...axisLbl }} />
            <Legend formatter={(v) => (v === 'refined' ? t(L('نشويات مكرّرة', 'Refined carbs')) : t(L('إطلاق بطيء', 'Slow release')))} />
            <Tooltip content={<Tip />} cursor={false} />
            {/* the cursor line is ours, so it persists after the pointer leaves */}
            <ReferenceLine x={cur} stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 3" />
            <Line type="monotone" dataKey="refined" stroke="var(--danger)" strokeWidth={3} dot={false}
              activeDot={{ r: 6, stroke: 'var(--bg-elev)', strokeWidth: 3 }} isAnimationActive />
            <Line type="monotone" dataKey="steady" stroke="var(--success)" strokeWidth={3} dot={false}
              activeDot={{ r: 6, stroke: 'var(--bg-elev)', strokeWidth: 3 }} isAnimationActive />
            {/* markers pinned to the cursor keep both values visible without hover */}
            <ReferenceDot x={cur} y={point.refined} r={5} fill="var(--danger)" stroke="var(--bg-elev)" strokeWidth={2} />
            <ReferenceDot x={cur} y={point.steady} r={5} fill="var(--success)" stroke="var(--bg-elev)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <label className="sf-slider">
        <span className="sf-slider-lbl">
          {t(L('الساعة بعد الأكل', 'Hours after eating'))}: <b>{t({ ar: String(cur), en: String(cur) })}</b>
          {hovering && <span className="sf-slider-hint"> · {t(L('تتبع المؤشّر', 'following the pointer'))}</span>}
        </span>
        <input type="range" min="0" max="4" step="0.5" value={cur}
          onChange={(e) => { setHovering(false); setCur(+e.target.value) }} />
      </label>
      <div className="sf-sugar-states">
        <p className="sf-sugar-state refined"><b>{t(L('نشويات مكرّرة:', 'Refined carbs:'))}</b> {t(state.refined)}</p>
        <p className="sf-sugar-state steady"><b>{t(L('إطلاق بطيء:', 'Slow release:'))}</b> {t(state.steady)}</p>
      </div>
    </FigureFrame>
  )
}
