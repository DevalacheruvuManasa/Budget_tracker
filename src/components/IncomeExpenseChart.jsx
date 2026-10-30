import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function IncomeExpenseChart({ data }) {
  if (!data.some((month) => month.income || month.expenses)) {
    return <div className="chart-empty">Your monthly trends will appear here as you add transactions.</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#edf0ed" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#929a93', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#929a93', fontSize: 11 }} tickFormatter={(value) => value >= 1000 ? `$${value / 1000}k` : `$${value}`} width={45} />
        <Tooltip formatter={(value) => currency.format(value)} />
        <Legend verticalAlign="top" align="right" iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingBottom: 16 }} />
        <Line type="monotone" dataKey="income" name="Income" stroke="#648c6d" strokeWidth={2.5} dot={{ r: 3, fill: '#648c6d' }} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#d19a76" strokeWidth={2.5} dot={{ r: 3, fill: '#d19a76' }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
