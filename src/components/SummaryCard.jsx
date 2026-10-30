import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'

const icons = {
  balance: Wallet,
  income: ArrowDownLeft,
  expenses: ArrowUpRight,
  savings: Wallet,
}

export default function SummaryCard({ label, value, kind, currency }) {
  const Icon = icons[kind]
  return (
    <article className={`summary-card ${kind}`}>
      <div className="summary-card-heading">
        <span>{label}</span>
        <span className="summary-icon"><Icon size={18} aria-hidden="true" /></span>
      </div>
      <p className="summary-value">{currency.format(value)}</p>
      <span className="summary-caption">{kind === 'savings' ? 'Saved this month' : 'All time'}</span>
    </article>
  )
}
