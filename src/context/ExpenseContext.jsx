import { createContext, useEffect, useMemo, useState } from 'react'
import { loadTransactions, saveTransactions } from '../utils/storage'

export const ExpenseContext = createContext(null)

function createTransactionId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getInitialState() {
  try {
    return { transactions: loadTransactions(), storageError: '' }
  } catch {
    return {
      transactions: [],
      storageError: 'Saved data could not be loaded. Clear browser storage or contact support.',
    }
  }
}

export default function ExpenseProvider({ children }) {
  const [initialState] = useState(getInitialState)
  const [transactions, setTransactions] = useState(initialState.transactions)
  const [storageError, setStorageError] = useState(initialState.storageError)

  useEffect(() => {
    if (storageError && transactions.length === 0) return

    try {
      saveTransactions(transactions)
      setStorageError('')
    } catch {
      setStorageError('Changes could not be saved. Check your browser storage settings.')
    }
  }, [transactions])

  const value = useMemo(
    () => ({
      transactions,
      storageError,
      addTransaction: (transaction) =>
        setTransactions((current) => [{ ...transaction, id: createTransactionId() }, ...current]),
      updateTransaction: (id, updatedTransaction) =>
        setTransactions((current) =>
          current.map((transaction) =>
            transaction.id === id ? { ...updatedTransaction, id } : transaction,
          ),
        ),
      deleteTransaction: (id) =>
        setTransactions((current) => current.filter((transaction) => transaction.id !== id)),
    }),
    [transactions, storageError],
  )

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}
