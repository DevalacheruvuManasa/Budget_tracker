describe('application shell', () => {
  it('shows the Pocketwise welcome screen', () => {
    cy.visit('/')
    cy.get('h1').should('contain.text', 'A little more clarity, every day.')
    cy.contains('Your workspace is getting ready').should('be.visible')
  })
})
