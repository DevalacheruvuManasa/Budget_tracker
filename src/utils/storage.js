const STORAGE_KEY = 'pocketwise.transactions'

export function loadTransactions() {
  const storedTransactions = window.localStorage.getItem(STORAGE_KEY)
  if (!storedTransactions) return []

  const parsedTransactions = JSON.parse(storedTransactions)
  if (!Array.isArray(parsedTransactions)) {
    throw new Error('Saved transactions are not in a valid format.')
  }

  return parsedTransactions
}

export function saveTransactions(transactions) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}
