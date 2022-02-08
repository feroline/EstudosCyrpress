/// <reference types="cypress" /> 

describe('Work itens with PopUp', () => {
    // before(() => { // before é um hook executado antes de todos os itens
    //     cy.visit('https://wcaquino.me/cypress/componentes.html')
    // })

    // SE QUISER VER O CONTEÚDO DA POPUP TEM QUE INVOCAR DIRETAMENTE, IGUAL NO IFRAME
    it('Verifica se o popup foi invocado', () => {  
        cy.visit('https://wcaquino.me/cypress/componentes.html')
       
        //verifica se esse método foi invocado ou não
        cy.window().then(win => {
            cy.stub(win,'open').as('winOpen') //open é utilizado para ccriar um popup ; 
        })

        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called') // @ para identificar que é um alias
            
    })

    describe.only('Popup with links', () => {

        beforeEach( () => { // before é um hook executado antes de todos os itens
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('checar a url do popup', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href') // prop é um método que retorna o valor de uma propriedade
                .and('equal', 'https://wcaquino.me/cypress/frame.html' )
        })

        it('Acessar popup dinamicamente', () => {

            cy.contains('Popup2').then($a => { 
                let href = $a.prop('href') // pego a proprieadade href do link
                cy.visit(href)
                cy.get('#tfield').type('Deu certo !!')
            })
        })

        it.only('Acessar popup forçando o link para mesma página', () => {

            cy.contains('Popup2')
                .invoke('removeAttr', 'target') // remove o atributo target do link
                .click()
                
            cy.get('#tfield').type('Deu certo !!')
            
        })
    })
})