/// <reference types="cypress" />

const { promises } = require("combined-stream")

describe('Helpers...', () => {
    it('Wrap', () => {
        const objeto = {
            nome: 'Maria josefa',
            iadde: '40'
        }
        expect(objeto).to.have.property('nome') 

        // objeto.should('have.property', 'nome') // não funciona porque quem tem essa funcionalidade é uma função do cypress
        cy.wrap(objeto).should('have.property', 'nome') //agora dá certo

        cy.visit('https://wcaquino.me/cypress/componentes.html')

//        cy.get('formNome').then( $el => {
//            // $el.value('Maria josefa') //dessa forma, via jquery, funciona, entretanto o log do cypress se perderia e queremos ele
//            cy.wrap($el).type('Maria josefa') //agora dá certo e com log
//        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        //promises.then(num => console.log(num)) // isso não é gerenciado pelo cypress, é um promise independente
        cy.wrap(promise).then(num => console.log(num)) // agora é gerenciado pelo cypress, é um promise
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
    })

    it('Its ...', () => {
        const objeto = {
            nome: 'Maria josefa',
            iadde: '40'
        }
        cy.wrap(objeto).should('have.property', 'nome', 'Maria josefa')  //funciona
        cy.wrap(objeto).its('nome').should('be.equal', 'Maria josefa') //funciona, mas acessa diretamente a propriedade, encurtando as coisas

        const objeto2 = {
            nome: 'Maria josefa',
            iadde: '40', 
            endereco: {
                rua: 'Rua dos bobos',
                avenida: 'Avenida dos bobos', 
                lote: '12'
            }
        }
        
        cy.wrap(objeto2) //ruim
            .should('have.property', 'endereco')
            .should('have.property', 'rua', 'Rua dos bobos') 

        cy.wrap(objeto2) //bom !! só aceita objeto
            .its('endereco') 
            .its('rua')
            .should('be.equal', 'Rua dos bobos')
        
        cy.wrap(objeto2) //ótimo    
            .its('endereco.rua')
            .should('be.equal', 'Rua dos bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })

    it.only('Invoke ...', () => {

        const getValue = () => 1;
        const soma = (a,b) => a+b;
        
        cy.wrap({functionGetValue: getValue})  // passo a função como um objeto
            .invoke('functionGetValue')
            .should('be.equal', 1)

        cy.wrap({functionSoma: soma})  // passo a função como um objeto
            .invoke('functionSoma', 2, 4)
            .should('be.equal', 6)

        //invoke é um método que permite acessar as funções do jquery
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'Alert via invoke')
        cy.get('#resultado').invoke('html', '<input type="buton" value="ehehehe">') 

    })
})