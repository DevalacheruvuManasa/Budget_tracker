import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import TransactionList from '../components/TransactionList'

export default function Transactions({ transactions, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const categories = [...new Set(transactions.map((transaction) => transaction.category))].sort()
  const filtered = useMemo(() => transactions.filter((transaction) => {
    const query = search.trim().toLowerCase()
    return (!query || `${transaction.title} ${transaction.category} ${transaction.description}`.toLowerCase().includes(query))
      && (type === 'all' || transaction.type === type)
      && (category === 'all' || transaction.category === category)
      && (!fromDate || transaction.date >= fromDate)
      && (!toDate || transaction.date <= toDate)
  }).sort((a, b) => b.date.localeCompare(a.date)), [transactions, search, type, category, fromDate, toDate])

  return (
    <div className="page-content">
      <section className="welcome-strip compact-strip"><div><p className="page-kicker">YOUR MONEY, YOUR RECORD</p><h2>Every little detail, in one place.</h2><p>Search, filter, and keep your transactions up to date.</p></div></section>
      <section className="panel transactions-panel">
        <div className="panel-heading transactions-heading"><div><p className="page-kicker">TRANSACTION HISTORY</p><h2>All transactions <span className="count-badge">{filtered.length}</span></h2></div><button className="button button-primary" type="button" onClick={onAdd}>+ Add transaction</button></div>
        <div className="filters" aria-label="Transaction filters">
          <label className="search-control"><Search size={17} /><input type="search" aria-label="Search transactions" placeholder="Search transactions..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <label className="filter-control"><SlidersHorizontal size={15} /><select aria-label="Filter by type" value={type} onChange={(event) => setType(event.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option></select></label>
          <label className="filter-control"><select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="date-filter">From<input aria-label="From date" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></label>
          <label className="date-filter">To<input aria-label="To date" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></label>
        </div>
        <TransactionList transactions={filtered} onEdit={onEdit} onDelete={onDelete} />
      </section>
    </div>
  )
}
