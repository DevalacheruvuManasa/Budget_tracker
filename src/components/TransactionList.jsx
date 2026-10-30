import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from 'lucide-react'

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function formatDate(date) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function TransactionList({ transactions, onEdit, onDelete, compact = false }) {
  if (!transactions.length) {
    return <div className="empty-state"><span className="empty-state-icon"><ArrowDownLeft size={20} /></span><strong>No transactions yet</strong><span>Your money story starts with your first transaction.</span></div>
  }

  return (
    <div className="transaction-table-wrap">
      <table className="transaction-table">
        <thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th>AMOUNT</th>{!compact && <th><span className="sr-only">Actions</span></th>}</tr></thead>
        <tbody>
          {transactions.map((transaction) => {
            const income = transaction.type === 'income'
            return (
              <tr key={transaction.id}>
                <td><div className="transaction-name"><span className={`transaction-type-icon ${income ? 'income' : 'expense'}`}>{income ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}</span><span><strong>{transaction.title}</strong><small>{transaction.description || transaction.type}</small></span></div></td>
                <td><span className="category-pill">{transaction.category}</span></td>
                <td className="date-cell">{formatDate(transaction.date)}</td>
                <td className={`amount-cell ${income ? 'positive' : 'negative'}`}>{income ? '+' : '−'}{currency.format(transaction.amount)}</td>
                {!compact && <td><div className="row-actions"><button type="button" aria-label={`Edit ${transaction.title}`} onClick={() => onEdit(transaction)}><Pencil size={15} /></button><button type="button" aria-label={`Delete ${transaction.title}`} onClick={() => onDelete(transaction.id)}><Trash2 size={15} /></button></div></td>}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
