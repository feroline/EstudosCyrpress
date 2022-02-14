/// <reference types="cypress" /> 

describe('Enganando o sistema', () => {
    beforeEach(() => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Voltando no tempo', () => {

        const tempo = new Date(2012,3,10,15,23,50)
        cy.clock(tempo.getTime())

        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain','10/04/2012' )
    })

    //ir passando o o tempo, sem ser tempo fixo, tipo cronometro
    it.only('Indo para o futuro', () => {
        cy.clock()
        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('eq','5000')
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('eq','15000')
        
        // .invoke('text').should('gte', 5000) //deve ser maior ou igual a 5000
    })
})