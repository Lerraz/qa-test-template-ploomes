const login = require('../fixtures/login.json');
describe('Login', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Validar campos para login', () => {
    cy.visit('https://app10.ploomes.com/login')
    cy.get('div.sc-breuTD > #email').should('have.attr', 'placeholder', 'E-mail')
    cy.get('div.sc-breuTD > #password').should('have.attr', 'placeholder', 'Senha')
  })


  it('Efetuar login', () => {
    cy.visit('https://app10.ploomes.com/login')
    cy.get('div.sc-breuTD > #email').type(login.email)
    cy.get('div.sc-breuTD > #password').type(login.password)
    cy.get('#centerRender').click()
  })

  it('Efetuar logout', () => {
    cy.Login(login.email, login.password)
    cy.intercept('GET', '**/Account@SupportAccesses@Requests?$filter=Approved+eq+null&$select=Id').as('getAccount')
    cy.wait('@getAccount')
    cy.get('.jYWYCm').click()
    cy.get(':nth-child(7) > :nth-child(2) > #centerRender').click()
  })
})