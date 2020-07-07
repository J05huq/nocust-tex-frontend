/// <reference types="Cypress" />

context('Deposit & Withdrawal', () => {
  beforeEach(() => {
    window.localStorage.setItem('show_demo_modal', 'false')
    window.localStorage.setItem('wallet_address', Cypress.env('WALLET_ADDRESS'))
    window.localStorage.setItem('private_key', Cypress.env('PRIVATE_KEY'))
    cy.visit(Cypress.env('HOST'))
  })
  it('Can add withdraw successfully', () => {
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'sendTransaction').as('sendTransaction')
      cy.contains('Deposit & Withdrawal').click()
      cy.get('button#withdraw-tab-tab').click()
      cy.get('input#withdrawal_amount')
        .eq(0)
        .type('0.001')
      cy.get('input#withdraw_to')
        .eq(0)
        .type(Cypress.env('WALLET_ADDRESS_B'))
      cy.get('button#widthdraw_btn').click()
      cy.get('@sendTransaction', { timeout: 5000 }).should('be.called')
      cy.get('@sendTransaction', { timeout: 5000 })
        .then({ timeout: 40000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.wait(5000)
      cy.get('button.close').click()
    })
  })
})
