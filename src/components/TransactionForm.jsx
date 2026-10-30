import { useState } from 'react'
import { X } from 'lucide-react'

const categories = {
  expense: ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Healthcare', 'Education', 'Bills', 'Others'],
  income: ['Salary', 'Freelancing', 'Business', 'Investments', 'Others'],
}

function todayString() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export default function TransactionForm({ transaction, onSubmit, onClose }) {
  const [form, setForm] = useState(() => transaction
    ? { ...transaction, amount: String(transaction.amount) }
    : {
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: todayString(),
        description: '',
      })
  const [error, setError] = useState('')

  const update = (event) => {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'type' ? { category: '' } : {}),
    }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const amount = Number(form.amount)
    if (!form.title.trim()) return setError('Enter a title for this transaction.')
    if (!Number.isFinite(amount) || amount <= 0) return setError('Amount must be greater than zero.')
    if (!form.category) return setError('Choose a category.')
    if (!form.date) return setError('Choose a date.')

    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim(), amount })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="transaction-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div><p className="page-kicker">{transaction ? 'UPDATE YOUR RECORD' : 'KEEP TRACK'}</p><h2 id="form-title">{transaction ? 'Edit transaction' : 'New transaction'}</h2></div>
          <button className="icon-button" type="button" aria-label="Close form" onClick={onClose}><X size={19} /></button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="type-toggle" role="group" aria-label="Transaction type">
            {['expense', 'income'].map((type) => (
              <button className={form.type === type ? `selected ${type}` : ''} type="button" key={type} onClick={() => setForm((current) => ({ ...current, type, category: '' }))}>
                {type === 'expense' ? 'Expense' : 'Income'}
              </button>
            ))}
          </div>
          <label>Title<input name="title" value={form.title} onChange={update} placeholder="e.g. Weekly groceries" autoFocus /></label>
          <div className="form-grid">
            <label>Amount<input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={update} placeholder="0.00" /></label>
            <label>Category<select name="category" value={form.category} onChange={update}><option value="">Select category</option>{categories[form.type].map((category) => <option key={category}>{category}</option>)}</select></label>
          </div>
          <label>Date<input name="date" type="date" value={form.date} onChange={update} /></label>
          <label>Description <span className="optional-label">Optional</span><textarea name="description" rows="3" value={form.description} onChange={update} placeholder="Add a note..." /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button className="button button-subtle" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{transaction ? 'Save changes' : 'Add transaction'}</button></div>
        </form>
      </section>
    </div>
  )
}
