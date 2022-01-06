/// <reference types="cypress" />

describe('Esperas ... ',() => {

    before(() => { // before é um hook executado antes de todos os itens
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => { //beforeEach é executado antes de cada it
        cy.reload()
    })
    
    it('Deve aguardar um elemento estar disponível', () => {
        
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        cy.get('#novoCampo')
            .should('exist')
            .type('eae');
    });

    it.only('uso do find', () => {
        cy.get('#buttonList').click();
        
        
        cy.get('#lista li').then( some => {
            cy.get('#lista li')
                .find('span')
                .should('contain','Item 1');

            cy.get('#lista li span')
                .should('contain','Item 2');
        });
            // .find('span')
            // .should('containq','Item 1');

       it.only('uso do timeout', () => {
        //    cy.get('#novoCampo', {timeout: 1000}).should('exist');
           cy.get('#novoCampo').should('exist');
       });
    });
""
});