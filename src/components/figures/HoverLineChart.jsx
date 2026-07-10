import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import { useApp } from '../../context/AppContext.jsx'

/*
 * Generic 24h hover line chart used by Fig 1 (body temperature) and
 * Fig 2 (melatonin). Axis labels, tooltip and legend all translate.
 */
export default function HoverLineChart({ data, xKey, yKey, color, xLabel, yLabel, unit, markers = [], yDomain, yTicks }) {
  const { t, lang, theme } = useApp()
  const stroke = 'var(--chart-grid)'
  const textCol = 'var(--text-muted)'

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const p = payload[0].payload
    return (
      <div className="chart-tip">
        <div>{t(xLabel)}: <b>{p[xKey]}</b></div>
        <div>{t(yLabel)}: <b>{p[yKey]}{unit ? ` ${t(unit)}` : ''}</b></div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: 300 }} dir="ltr">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid stroke={stroke} strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fill: textCol, fontSize: 12 }} stroke={stroke}
            label={{ value: t(xLabel), position: 'insideBottom', offset: -8, fill: textCol, fontSize: 12 }} />
          <YAxis tick={{ fill: textCol, fontSize: 12 }} stroke={stroke} width={52}
            domain={yDomain || ['auto', 'auto']} ticks={yTicks} allowDecimals
            label={{ value: t(yLabel), angle: -90, position: 'insideLeft', fill: textCol, fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          {markers.map((mk, i) => (
            <ReferenceLine key={i} x={mk.x} stroke="var(--text-muted)" strokeDasharray="4 4"
              label={{ value: t(mk.label), fill: textCol, fontSize: 11, position: 'top' }} />
          ))}
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={3} dot={false} activeDot={{ r: 5 }} isAnimationActive />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
