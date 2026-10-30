export function getTotals(transactions, now = new Date()) {
  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + Number(transaction.amount), 0)
  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + Number(transaction.amount), 0)
  const monthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const monthlyTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(monthPrefix),
  )
  const monthlyIncome = monthlyTransactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + Number(transaction.amount), 0)
  const monthlyExpenses = monthlyTransactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + Number(transaction.amount), 0)

  return {
    balance: income - expenses,
    income,
    expenses,
    monthlySavings: monthlyIncome - monthlyExpenses,
    monthlyIncome,
    monthlyExpenses,
  }
}

export function getExpenseBreakdown(transactions) {
  const totals = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((categories, transaction) => {
      categories[transaction.category] =
        (categories[transaction.category] || 0) + Number(transaction.amount)
      return categories
    }, {})

  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export function getMonthlyTrends(transactions, count = 6, now = new Date()) {
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - count + index + 1, 1)
    const prefix = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthTransactions = transactions.filter((transaction) =>
      transaction.date.startsWith(prefix),
    )

    return {
      key: prefix,
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      income: monthTransactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((total, transaction) => total + Number(transaction.amount), 0),
      expenses: monthTransactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((total, transaction) => total + Number(transaction.amount), 0),
    }
  })
}
