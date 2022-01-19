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

    it('Uso do find', () => {
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
    });

    it('Uso do timeout', () => {
        //timeout é passado como um atributo, mas também pode ser passado no json. É o tempo de espera até dar o erro ou o acerto, não sendo um tempo fixo como o wait()
     //    cy.get('#novoCampo', {timeout: 1000}).should('exist'); 
         // cy.get('#novoCampo').should('exist');

         cy.get('#buttonListDOM').click();
         cy.get('#lista li span', {timeout:30000})
             .should('contain', 'Item 2');

         cy.get('#buttonListDOM').click();
         cy.get('#lista li span')
             .should('have.length', 1);

         cy.get('#lista li span')
             .should('have.length', 2);
         //cy.wait(1000) // Evite o waat fixo, pois nos dias em que a aplicação estiver boa o tempo de espera será o mesmo.
    });

    it.only('Click retry' , () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value',111)
    })
});