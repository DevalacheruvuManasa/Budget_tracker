import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#5b8b68', '#8db697', '#b6ceb9', '#d2dfd3', '#759080', '#aac5af', '#d0b98e', '#92a9ad']
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function ExpenseChart({ data }) {
  if (!data.length) return <div className="chart-empty">Add an expense to see your spending breakdown.</div>
  return (
    <div className="expense-chart-layout">
      <div className="donut-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="91%" paddingAngle={3} stroke="none">
              {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip formatter={(value) => currency.format(value)} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center"><strong>{data.length}</strong><span>categories</span></div>
      </div>
      <ul className="chart-legend">
        {data.slice(0, 5).map((entry, index) => (
          <li key={entry.name}>
            <span className="legend-label"><i style={{ backgroundColor: COLORS[index % COLORS.length] }} />{entry.name}</span>
            <strong>{currency.format(entry.value)}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
