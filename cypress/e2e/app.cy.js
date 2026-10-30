const today = new Date().toISOString().slice(0, 10)

function addTransaction({ title, amount, type = 'expense', category = 'Food', date = today }) {
  cy.contains('button', 'Add transaction').first().click()
  cy.get('input[name="title"]').type(title)
  cy.get('input[name="amount"]').type(String(amount))
  cy.get(`.type-toggle button`).contains(type === 'income' ? 'Income' : 'Expense').click()
  cy.get('select[name="category"]').select(category)
  cy.get('input[name="date"]').clear().type(date)
  cy.contains('button', 'Add transaction').last().click()
}

describe('Pocketwise expense tracker', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('shows the dashboard and empty transaction state', () => {
    cy.get('h1').should('contain.text', 'Dashboard')
    cy.contains('Total balance').should('be.visible')
    cy.contains('No transactions yet').should('be.visible')
  })

  it('adds income and expense transactions', () => {
    addTransaction({ title: 'Monthly salary', amount: 3200, type: 'income', category: 'Salary' })
    addTransaction({ title: 'Market groceries', amount: 82.5 })

    cy.contains('Market groceries').should('be.visible')
    cy.get('.summary-card.balance .summary-value').should('contain.text', '$3,117.50')
  })

  it('edits an existing transaction', () => {
    addTransaction({ title: 'Coffee', amount: 5 })
    cy.get('.nav-item').contains('Transactions').click()
    cy.get('[aria-label="Edit Coffee"]').click()
    cy.get('input[name="title"]').clear().type('Coffee and snack')
    cy.get('input[name="amount"]').clear().type('12')
    cy.contains('button', 'Save changes').click()

    cy.contains('Coffee and snack').should('be.visible')
    cy.contains('$12.00').should('be.visible')
  })

  it('deletes a transaction', () => {
    addTransaction({ title: 'One-time purchase', amount: 30 })
    cy.get('.nav-item').contains('Transactions').click()
    cy.on('window:confirm', () => true)
    cy.get('[aria-label="Delete One-time purchase"]').click()
    cy.contains('No transactions yet').should('be.visible')
  })

  it('filters transactions by type and search query', () => {
    addTransaction({ title: 'Paycheck', amount: 2000, type: 'income', category: 'Salary' })
    addTransaction({ title: 'Bus pass', amount: 45, category: 'Transportation' })
    cy.get('.nav-item').contains('Transactions').click()
    cy.get('[aria-label="Filter by type"]').select('income')
    cy.contains('Paycheck').should('be.visible')
    cy.contains('Bus pass').should('not.exist')
    cy.get('[aria-label="Filter by type"]').select('all')
    cy.get('[aria-label="Search transactions"]').type('Bus')
    cy.contains('Bus pass').should('be.visible')
    cy.contains('Paycheck').should('not.exist')
  })

  it('calculates dashboard totals from saved transactions', () => {
    const records = [
      { id: 'salary', title: 'Salary', amount: 5000, type: 'income', category: 'Salary', date: today, description: '' },
      { id: 'rent', title: 'Rent', amount: 1250, type: 'expense', category: 'Bills', date: today, description: '' },
      { id: 'older', title: 'Old purchase', amount: 100, type: 'expense', category: 'Shopping', date: '2020-01-15', description: '' },
    ]
    cy.clearLocalStorage()
    cy.visit('/', {
      onBeforeLoad(window) {
        window.localStorage.setItem('pocketwise.transactions', JSON.stringify(records))
      },
    })

    cy.get('.summary-card.balance .summary-value').should('contain.text', '$3,650.00')
    cy.get('.summary-card.income .summary-value').should('contain.text', '$5,000.00')
    cy.get('.summary-card.expenses .summary-value').should('contain.text', '$1,350.00')
    cy.get('.summary-card.savings .summary-value').should('contain.text', '$3,750.00')
  })

  it('persists transactions after refreshing', () => {
    addTransaction({ title: 'Saved transaction', amount: 24 })
    cy.reload()
    cy.contains('Saved transaction').should('be.visible')
  })

  it('shows validation messages for invalid transactions', () => {
    cy.contains('button', 'Add transaction').first().click()
    cy.contains('button', 'Add transaction').last().click()
    cy.get('[role="alert"]').should('contain.text', 'Enter a title')
    cy.get('input[name="title"]').type('Invalid amount')
    cy.get('input[name="amount"]').type('0')
    cy.get('select[name="category"]').select('Food')
    cy.contains('button', 'Add transaction').last().click()
    cy.get('[role="alert"]').should('contain.text', 'greater than zero')
  })
})
