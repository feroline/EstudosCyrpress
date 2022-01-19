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

    it('Click retry' , () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value',111)
    })

    it.only('Should vs Then', () => {

        cy.get('#buttonListDOM').click();

        describe('THEN', () => {  //then = espera o elemento existir par apoder executar a ação, com ele eu consigo colocar um return e fazer qualquer coisa depois
             
            cy.get('#lista li span').then($elemento => { //o $ é só para dizer que é um elemento da tela, não é regra, apenas organização
                console.log( `THEN: ${$elemento}`)
                expect($elemento).to.have.length(1) //como é um elemento html, não pode ser tratado com as funções do cypress
                return 2; 
            }).and('eq', 2)

            cy.get('#buttonListDOM').then($elemento => {
                console.log( `THEN: ${$elemento}`)
                expect($elemento).to.have.length(1)
            }).and('have.id', 'buttonListDOM')
        })

        describe('SHOULD', () => { // should = fica executando o código até que o elemento exista, além de ignorar qualquer return  dentro dele, porque so retorna o elemento passado $elemento
            
            cy.get('#lista li span').should($elemento => { //o $ é só para dizer que é um elemento da tela, não é regra, apenas organização
                console.log( `SHOULD: ${$elemento}`)
                expect($elemento).to.have.length(2) //como é um elemento html, não pode ser tratado com as funções do cypress
            })

        })
      

    })
});