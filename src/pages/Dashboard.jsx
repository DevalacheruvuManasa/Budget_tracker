import { ArrowRight } from 'lucide-react'
import SummaryCard from '../components/SummaryCard'
import ExpenseChart from '../components/ExpenseChart'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import TransactionList from '../components/TransactionList'
import { getExpenseBreakdown, getMonthlyTrends, getTotals } from '../utils/calculations'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })

export default function Dashboard({ transactions, onNavigate, onEdit, onDelete }) {
  const totals = getTotals(transactions)
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  return (
    <div className="page-content">
      <section className="welcome-strip">
        <div><p className="page-kicker">YOUR FINANCIAL SNAPSHOT</p><h2>A clearer view of your money.</h2><p>Every thoughtful choice adds up. Here’s where you stand.</p></div>
        <span className="welcome-sparkle" aria-hidden="true">✳</span>
      </section>
      <section className="summary-grid" aria-label="Financial summary">
        <SummaryCard label="Total balance" value={totals.balance} kind="balance" currency={currency} />
        <SummaryCard label="Total income" value={totals.income} kind="income" currency={currency} />
        <SummaryCard label="Total expenses" value={totals.expenses} kind="expenses" currency={currency} />
        <SummaryCard label="Monthly savings" value={totals.monthlySavings} kind="savings" currency={currency} />
      </section>
      <section className="chart-grid">
        <article className="panel expense-panel"><div className="panel-heading"><div><p className="page-kicker">WHERE IT GOES</p><h2>Expense breakdown</h2></div><span className="panel-subtitle">All time</span></div><ExpenseChart data={getExpenseBreakdown(transactions)} /></article>
        <article className="panel trend-panel"><div className="panel-heading"><div><p className="page-kicker">THE BIG PICTURE</p><h2>Income vs. expenses</h2></div><span className="panel-subtitle">Last 6 months</span></div><div className="trend-chart"><IncomeExpenseChart data={getMonthlyTrends(transactions)} /></div></article>
      </section>
      <section className="panel recent-panel"><div className="panel-heading"><div><p className="page-kicker">THE LATEST</p><h2>Recent transactions</h2></div><button className="text-button" type="button" onClick={() => onNavigate('transactions')}>View all <ArrowRight size={15} /></button></div><TransactionList transactions={recent} onEdit={onEdit} onDelete={onDelete} compact /></section>
    </div>
  )
}
