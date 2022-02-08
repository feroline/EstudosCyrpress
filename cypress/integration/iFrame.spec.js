/// <reference types="cypress" /> 

describe('Work itens with iFrame', () => {
    // before(() => { // before é um hook executado antes de todos os itens
    //     cy.visit('https://wcaquino.me/cypress/componentes.html')
    // })

    it('Preencher campo de texto',() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            let body = iframe.contents().find('body') 
            cy.wrap(body).find('#tfield')
            .type('Oie')
            .should('have.value', 'Oie')
        })
    })

    //será necessário testar primeior o escopo externo do iframe, acessando-o por meio do link
    it('Testar o frame diretamente ', () => {  
        cy.visit('https://wcaquino.me/cypress/frame.html')
       
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
        cy.get('#otherButton').click()
            
    })
})