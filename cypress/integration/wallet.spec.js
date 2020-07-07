/// <reference types="Cypress" />

context('Wallet', () => {
  beforeEach(() => {
    window.localStorage.setItem('show_demo_modal', 'false')
  })
  it('Should create a new wallet with seed phrase and a password', () => {
    cy.visit(Cypress.env('HOST'))
    cy.window().then(win => {
      const seedPhrase = []
      cy.spy(win.web3.eth.accounts, 'privateKeyToAccount').as('privateKeyToAccount')
      cy.spy(win.nocustManager, 'synchronizeSwapOrders').as('synchronizeSwapOrders')
      cy.contains('No detected account').click()
      cy.get('input#inputPassword1').type(Cypress.env('DUMMY_PASSWORD'))
      cy.get('input#confirm_password_1').type(Cypress.env('DUMMY_PASSWORD'))
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('@privateKeyToAccount', { timeout: 5000 }).should('be.called')
      cy.get('@privateKeyToAccount', { timeout: 5000 })
        .then({ timeout: 5000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.get('li.word').each($el => {
        cy.get($el).should($li => {
          const text = $li.text()
          seedPhrase.push(text)
        })
      })
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('li.word').each(($el, $index) => {
        if ($el.children().length > 0) {
          cy.get($el)
            .find('input')
            .type(seedPhrase[$index])
        }
      })
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('label').each($el => {
        cy.get($el).click()
      })
      cy.get('button')
        .contains('Next')
        .click()

      cy.get('button')
        .contains('Start trading')
        .click()
      cy.get('@synchronizeSwapOrders', { timeout: 5000 }).should('be.called')
      cy.get('@synchronizeSwapOrders', { timeout: 5000 })
        .then({ timeout: 60000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.wait(5000)
    })
  })

  it('Should create a new wallet with seed phrase', () => {
    cy.visit(Cypress.env('HOST'))
    cy.window().then(win => {
      const seedPhrase = []
      cy.spy(win.web3.eth.accounts, 'privateKeyToAccount').as('privateKeyToAccount')
      cy.spy(win.nocustManager, 'synchronizeSwapOrders').as('synchronizeSwapOrders')
      cy.contains('No detected account').click()
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('@privateKeyToAccount', { timeout: 5000 }).should('be.called')
      cy.get('@privateKeyToAccount', { timeout: 5000 })
        .then({ timeout: 5000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.get('li.word').each($el => {
        cy.get($el).should($li => {
          const text = $li.text()
          seedPhrase.push(text)
        })
      })
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('li.word').each(($el, $index) => {
        if ($el.children().length > 0) {
          cy.get($el)
            .find('input')
            .type(seedPhrase[$index])
        }
      })
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('label').each($el => {
        cy.get($el).click()
      })
      cy.get('button')
        .contains('Next')
        .click()

      cy.get('button')
        .contains('Start trading')
        .click()
      cy.get('@synchronizeSwapOrders', { timeout: 5000 }).should('be.called')
      cy.get('@synchronizeSwapOrders', { timeout: 5000 })
        .then({ timeout: 60000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.wait(5000)
    })
  })

  it('Should import a new wallet with seed phrase and password', () => {
    cy.visit(Cypress.env('HOST'))
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'synchronizeSwapOrders').as('synchronizeSwapOrders')
      cy.contains('No detected account').click()
      cy.get('button')
        .contains('Create a browser wallet')
        .click()
      cy.get('button')
        .contains('Import an existing wallet')
        .click()
      cy.get('textarea').type(Cypress.env('SEED_PHRASE'))
      cy.get('input#inputPassword2').type(Cypress.env('DUMMY_PASSWORD'))
      cy.get('input#confirm_password_2').type(Cypress.env('DUMMY_PASSWORD'))
      cy.get('button')
        .contains('Next')
        .click()

      cy.get('input#public_key_step_1')
        .invoke('val')
        .then(text => {
          expect(text.trim()).equal(Cypress.env('WALLET_ADDRESS_B').toLowerCase())
        })

      cy.get('button')
        .contains('Next')
        .click()
      cy.get('@synchronizeSwapOrders', { timeout: 5000 }).should('be.called')
      cy.get('@synchronizeSwapOrders', { timeout: 5000 })
        .then({ timeout: 60000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.wait(5000)
    })
  })

  it('Should import a new wallet with seed phrase', () => {
    cy.visit(Cypress.env('HOST'))
    cy.window().then(win => {
      cy.spy(win.nocustManager, 'synchronizeSwapOrders').as('synchronizeSwapOrders')
      cy.contains('No detected account').click()
      cy.get('button')
        .contains('Create a browser wallet')
        .click()
      cy.get('button')
        .contains('Import an existing wallet')
        .click()
      cy.get('textarea').type(Cypress.env('SEED_PHRASE'))
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('input#public_key_step_1')
        .invoke('val')
        .then(text => {
          expect(text.trim()).equal(Cypress.env('WALLET_ADDRESS_WITHOUT_PASSWORD'))
        })
      cy.get('button')
        .contains('Next')
        .click()
      cy.get('@synchronizeSwapOrders', { timeout: 5000 }).should('be.called')
      cy.get('@synchronizeSwapOrders', { timeout: 5000 })
        .then({ timeout: 60000 }, arr => arr.getCall(0).returnValue)
        .should('not.be.false')
      cy.wait(5000)
    })
  })
})
