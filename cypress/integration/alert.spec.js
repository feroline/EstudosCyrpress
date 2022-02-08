/// <reference types="cypress" /> 

describe('Work itens with alerts', () => {
    before(() => { // before é um hook executado antes de todos os itens
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => { //beforeEach é executado antes de cada it
        cy.reload()
    })

    it('Alert sem mock', () => {
        cy.get('#alert').click()
        cy.on('window:alert', mensagem => { //pega eventos que ocorrem na tela
            console.log(mensagem) 
            expect(mensagem).to.be.equal('Alert Simples')
        }) 
    })
 
    // mock substitui a função e define um comportamento, guardando as interações para verificá-las
    it('Alert com mock', () => {

    // as() é um método que permite dar um alias ao elemento, um nome
        const stub = cy.stub().as('Alerta') // cria um stub para armazenar as interações 

        cy.on('window:alert', stub)
        cy.get('#alert').click().then( () => { //pede o para depois do clique
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') //verificar a chamada que foi feita no stub
        })
    })

    
    it('Confirm', ()=>{
        cy.on('window:confirm',msg =>{
            expect(msg).to.be.equal('Confirm Simples')
        })
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        //fica no final para o evento ser acionado depois das funções serem definidas
        cy.get('#confirm').click() //ele vai confirmar true por padrão
    })

    it('Deny', ()=>{
        cy.on('window:confirm',msg =>{
            expect(msg).to.be.equal('Confirm Simples')
            return false  //então temos que negar
        })
        
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })

        cy.get('#confirm').click() //ele vai confirmar true por padrão
    })

    it('Prompt',  () => {
        
        //quando vier um prompt com campo de texto
        cy.window().then(win => { // sobrescreve o prompt do browser
            cy.stub(win,'prompt').returns('42')
        })

        //quando vier um confirm
        cy.on('window:confirm',msg =>{
            expect(msg).to.be.equal('Era 42?')
        })
        
        //quando vier um alert
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
      
    })

    describe('Desafio proposto', () => {

        it.only('Validando mensagens', () => {
            const stub = cy.stub().as('Alerta')
            
            //NOME
            cy.on('window:alert', stub)
            cy.get('#formCadastrar').click().then(()=>{
                expect(stub).to.be.calledWith('Nome eh obrigatorio')
            })
            cy.get('#formNome')
                .type('Andre')
                .should('have.value', 'Andre')
      

            // SOBRENOME
            cy.on('window:alert', stub)
            cy.get('#formCadastrar').click().then(()=>{
                expect(stub).to.be.calledWith('Sobrenome eh obrigatorio')
            })
            cy.get('[data-cy="dataSobrenome"]')
                .type('Bezerra')
                .should('have.value', 'Bezerra')

            //SEXO
            cy.on('window:alert', stub)
            cy.get('#formCadastrar').click().then(()=>{
                expect(stub).to.be.calledWith('Sexo eh obrigatorio')
            })
            cy.get('#formSexoFem')
                .click()
                .should('be.checked')
            
            cy.get('#formCadastrar').click()

            //RESULTADO
            let resultado = ['Andre', 'Bezerra', 'Feminino']
            cy.get('#resultado')

            cy.then(4000,()=>{
        
                let quantResultado;
                Cypress.$('#resultado').children().each(($el, index) => {
                    
                    let el = Cypress.$(`#${index.getAttribute('id')}`).text()
                
                
                    if(cy.wrap(el).contains(resultado[$el])){
                        cy.get(index.getAttribute('id')).should('have.text', resultado[$el])
                    }
                    
                })
                // console.log(ids)
                // $teste.each((element, index) => {
                    // console.log(element.innerText)
                // })
            })

        })
    })
})