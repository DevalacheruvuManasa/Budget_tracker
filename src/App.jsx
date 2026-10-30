import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import TransactionForm from './components/TransactionForm'
import ExpenseProvider from './context/ExpenseContext'
import useExpenses from './context/useExpenses'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'

const pageTitles = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  analytics: 'Analytics',
}

function ExpenseTracker() {
  const { transactions, storageError, addTransaction, updateTransaction, deleteTransaction } = useExpenses()
  const [activePage, setActivePage] = useState('dashboard')
  const [formOpen, setFormOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)

  function openAddForm() {
    setEditingTransaction(null)
    setFormOpen(true)
  }

  function openEditForm(transaction) {
    setEditingTransaction(transaction)
    setFormOpen(true)
  }

  function saveTransaction(transaction) {
    if (editingTransaction) updateTransaction(editingTransaction.id, transaction)
    else addTransaction(transaction)
    setFormOpen(false)
    setEditingTransaction(null)
  }

  function removeTransaction(id) {
    if (window.confirm('Delete this transaction? This cannot be undone.')) deleteTransaction(id)
  }

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-area">
        <Navbar title={pageTitles[activePage]} onAdd={openAddForm} />
        {storageError && <p className="storage-error" role="alert">{storageError}</p>}
        {activePage === 'dashboard' && <Dashboard transactions={transactions} onNavigate={setActivePage} onEdit={openEditForm} onDelete={removeTransaction} />}
        {activePage === 'transactions' && <Transactions transactions={transactions} onAdd={openAddForm} onEdit={openEditForm} onDelete={removeTransaction} />}
        {activePage === 'analytics' && <Analytics transactions={transactions} />}
      </main>
      {formOpen && <TransactionForm transaction={editingTransaction} onSubmit={saveTransaction} onClose={() => setFormOpen(false)} />}
    </div>
  )
}

function App() {
  return <ExpenseProvider><ExpenseTracker /></ExpenseProvider>
}

export default App
