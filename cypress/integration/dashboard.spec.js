/// <reference types="Cypress" />

context('Dashboard', () => {
  beforeEach(() => {
    window.localStorage.setItem('show_demo_modal', 'false')
    window.localStorage.setItem('wallet_address', Cypress.env('WALLET_ADDRESS'))
    window.localStorage.setItem('private_key', Cypress.env('PRIVATE_KEY'))
    cy.visit(Cypress.env('HOST'))
  })
  it('Balance should be fetched', () => {
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'getNOCUSTBalance').as('getBalance')
      cy.get('@getBalance', { timeout: 5000 }).should('be.called')
      cy.get('@getBalance', { timeout: 5000 })
        .then({ timeout: 40000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.wait(5000)
    })
  })
  it('Orderbook should be fetched', () => {
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'getOrderBook').as('getOrderbook')
    })
    cy.get('@getOrderbook', { timeout: 5000 }).should('be.called')

    const orderbook = cy
      .get('@getOrderbook', { timeout: 5000 })
      .then({ timeout: 20000 }, arr => arr.getCall(0).returnValue)

    orderbook.should('have.property', 'sell_orders')
    cy.wait(5000)
  })
  it('Trade history should be fetched', () => {
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'getTransactionsList').as('getTradeHistory')
    })
    cy.get('@getTradeHistory', { timeout: 5000 }).should('be.called')
    cy.get('@getTradeHistory', { timeout: 5000 })
      .then({ timeout: 20000 }, arr => arr.getCall(0).returnValue)
      .should('not.be.false')
    cy.wait(5000)
  })
  it('Transactions should be fetched', () => {
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'getSwapHistory').as('getTransactions')
    })
    cy.get('@getTransactions', { timeout: 40000 }).should('be.called')
    cy.get('@getTransactions', { timeout: 5000 })
      .then({ timeout: 20000 }, arr => arr.getCall(0).returnValue)
      .should('not.be.false')
    cy.wait(5000)
  })

  it('Should log you out', () => {
    cy.get('#logout_nav').click()
    cy.wait(2000)
    cy.get('button#logout_btn')
      .click()
      .should(() => {
        expect(window.localStorage.getItem('wallet_address')).to.be.null
        expect(window.localStorage.getItem('private_key')).to.be.null
      })
  })
})
