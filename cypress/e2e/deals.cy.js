const login = require('../fixtures/login.json');
describe('Deals', () => {

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    it('Cadastrar Negócio', () => {
        cy.Login(login.email, login.password)
        cy.intercept('GET', '**/Account@SupportAccesses@Requests?$filter=Approved+eq+null&$select=Id').as('getAccount')
        cy.wait('@getAccount')
        cy.get(':nth-child(3) > .w-100 > .sc-gKXOVf > #centerRender > #centerRenderMessage').click()
        cy.intercept('GET', '**/Deals/GetAmountSumByCurrencySymbol?$filter=(StatusId+eq+1)+and+StageId+eq+40012403').as('getDeals')
        cy.wait('@getDeals')
        cy.get('.v-middle.width-10 > .button').click().wait(2000)
        cy.get('[uib-tooltip="Morno"]').click()
        cy.get('input[name="deal_title"]').type("Negócio Cypress")
        cy.get('input[name="deal_amount"]').type("15000")
        cy.get('input[id="select-fk-dealcontact-12"]').type("Cliente Negócio Cypress").wait(2000).type('{enter}')
        cy.get('input[id="select-fk-dealorigin-14"]').type("Facebook").wait(2000).type('{enter}').wait(2000)
        cy.get('ng-transclude > .side-wrapper > .hbox > .v-middle > .button').tab({ shift: true })
        cy.focused().click()
        cy.get('ng-transclude > .side-wrapper > .hbox > .v-middle > .button').click().wait(5000)
    })
    it('Listar e Atualizar Negócio', () => {
        cy.Login(login.email, login.password)
        cy.intercept('GET', '**/Account@SupportAccesses@Requests?$filter=Approved+eq+null&$select=Id').as('getAccount')
        cy.wait('@getAccount')
        cy.get('#LeftSideMenuHeader > .d-flex > .sc-gKXOVf').type("Negócio Cypress")
        .intercept('GET', '**/GeneralSearch**').as('getSearch').wait('@getSearch')
        cy.focused().wait(2000).tab().tab()
        cy.focused().click().wait(2000)
        cy.get('.mini-side-wrapper > .dropdown > .button').click().wait(1000)
        cy.get('.mini-side-wrapper > .dropdown > .dropdown-menu > :nth-child(1) > .white-dropdown-link > .hbox > :nth-child(2)').click()
        cy.get('input[name="deal_title"]').type(" Atualizado")
        cy.get('.hbox > .v-middle > .button').click().wait(5000)
    })
    it('Deletar Negócio', () => {
        cy.Login(login.email, login.password)
        cy.intercept('GET', '**/Account@SupportAccesses@Requests?$filter=Approved+eq+null&$select=Id').as('getAccount')
        cy.wait('@getAccount')
        cy.get('#LeftSideMenuHeader > .d-flex > .sc-gKXOVf').type("Negócio Cypress Atualizado")
        .intercept('GET', '**/GeneralSearch**').as('getSearch').wait('@getSearch')
        cy.focused().wait(2000).tab().tab()
        cy.focused().click().wait(2000)
        cy.get('.mini-side-wrapper > .dropdown > .button').click().wait(1000)
        cy.get('.mini-side-wrapper > .dropdown > .dropdown-menu > :nth-child(3) > .white-dropdown-link > .hbox > :nth-child(2)').click().wait(1000)
        cy.get('[ng-if="!hardCheckWord"] > .button-action').click().wait(5000)
    })
})