import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ExpenseChart from '../components/ExpenseChart'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import { getExpenseBreakdown, getMonthlyTrends } from '../utils/calculations'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
const COLORS = ['#5b8b68', '#8db697', '#b6ceb9', '#d2dfd3', '#759080', '#aac5af', '#d0b98e', '#92a9ad']

export default function Analytics({ transactions }) {
  const [period, setPeriod] = useState(6)
  const trends = useMemo(() => getMonthlyTrends(transactions, period), [transactions, period])
  const categories = getExpenseBreakdown(transactions)
  const monthKeys = new Set(trends.map((month) => month.key))
  const expenseTransactions = transactions.filter(
    (transaction) =>
      transaction.type === 'expense' &&
      monthKeys.has(transaction.date.slice(0, 7)),
  )

  return (
    <div className="page-content">
      <section className="welcome-strip compact-strip"><div><p className="page-kicker">YOUR MONEY, IN PERSPECTIVE</p><h2>Patterns worth paying attention to.</h2><p>See how your habits and savings are changing over time.</p></div></section>
      <section className="panel analytics-trend-panel"><div className="panel-heading"><div><p className="page-kicker">MONTHLY OVERVIEW</p><h2>Income &amp; expenses</h2></div><label className="period-select"><span className="sr-only">Chart period</span><select aria-label="Chart period" value={period} onChange={(event) => setPeriod(Number(event.target.value))}><option value="6">Last 6 months</option><option value="12">Last 12 months</option></select></label></div><div className="analytics-trend-chart"><IncomeExpenseChart data={trends} /></div></section>
      <section className="analytics-grid">
        <article className="panel"><div className="panel-heading"><div><p className="page-kicker">SPENDING MIX</p><h2>Category-wise spending</h2></div></div><ExpenseChart data={categories} /></article>
        <article className="panel"><div className="panel-heading"><div><p className="page-kicker">SAVING AS YOU GO</p><h2>Savings by month</h2></div></div>{trends.some((month) => month.income || month.expenses) ? <div className="savings-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={trends.map((month) => ({ ...month, savings: month.income - month.expenses }))} margin={{ top: 12, right: 4, left: -18, bottom: 0 }}><CartesianGrid stroke="#edf0ed" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#929a93', fontSize: 11 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#929a93', fontSize: 10 }} tickFormatter={(value) => `$${value}`} /><Tooltip formatter={(value) => currency.format(value)} /><Bar dataKey="savings" name="Net savings" radius={[5, 5, 0, 0]}>{trends.map((month, index) => <Cell key={`${month.month}-${index}`} fill={month.income - month.expenses >= 0 ? COLORS[0] : '#d19a76'} />)}</Bar></BarChart></ResponsiveContainer></div> : <div className="chart-empty">Add income and expenses to discover your savings trends.</div>}</article>
      </section>
      <section className="panel analytics-category-panel"><div className="panel-heading"><div><p className="page-kicker">CATEGORY DETAILS</p><h2>Monthly expenses by category</h2></div></div>{expenseTransactions.length ? <div className="category-bars">{categories.map((item, index) => { const amount = expenseTransactions.filter((transaction) => transaction.category === item.name).reduce((sum, transaction) => sum + Number(transaction.amount), 0); if (!amount) return null; const total = expenseTransactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0); return <div className="category-bar-row" key={item.name}><div><span>{item.name}</span><strong>{currency.format(amount)}</strong></div><span className="bar-track"><i style={{ width: `${(amount / total) * 100}%`, backgroundColor: COLORS[index % COLORS.length] }} /></span></div> })}</div> : <div className="chart-empty">Monthly category details will appear when you record expenses.</div>}</section>
    </div>
  )
}
