/// <reference types="cypress" /> 

describe('dinamic', () => {
    beforeEach(() => { 
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const comidas = ['Carne', 'Frango', 'Vegetariano']
    comidas.forEach(comida => {
    it(`Cadastro com a ${comida} ` , () => {
            cy.get('#formNome').type('Joao')
            cy.get('#formSobrenome').type('Silva')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.xpath(`//label[contains(.,'${comida}')]/preceding-sibling::input`).click()
            //{multiple, true} -> seleciona todos os elementos
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })
})