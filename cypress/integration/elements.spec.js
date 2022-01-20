/// <reference types="cypress" /> 

describe('Work itens with basic elements', () => {
    before(() => { // before é um hook executado antes de todos os itens
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => { //beforeEach é executado antes de cada it
        cy.reload()
    })

    it('Find Text', () => {
        cy.get('span').should('contain','Cuidado') // aceita valor incompleto
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...') // só aceita valor completo
    })

    it('link', () => {
        cy.get('#resultado').should('not.have.text','Voltou!')              
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')  
    })

    it('input text', () => {
        cy.get('#formNome')
        .type('Ana Carolina')
        .should('have.value','Ana Carolina')

        cy.get('#elementosForm\\:sugestoes')
        .type('vai dar erro aqui{backspace}{backspace}')
        .should('not.have.value','vai dar erro aqui ')

        cy.get('#elementosForm\\:sugestoes')
        .clear()
        .type('Erro{selectAll}acerto',{delay:100}) // as vezes um delay é bom para disparar eventos js
        .should('have.value','acerto')
    })

    it('radio button', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        
        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get("[name='formSexo']")
            .should('have.length',2)
    })

    it('checkbox', () => {
        cy.get("[name='formComidaFavorita']").
            click({multiple:true}) // multiple é um atributo do cypress que permite selecionar mais de um elemento ao mesmo tempo
    })

    it('combo/select', () => {
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value','2graucomp')
        
        cy.get('[data-test="dataEscolaridade"] option')
            .should('have.length', 8)

        cy.get('[data-test="dataEscolaridade"] option').then($array => {
            const values = [];
            $array.each(function(){ //utilizou o 'function()' para poder pegar o 'this'
                values.push(this.innerHTML) //está pegando o texxto dos options e inserindo noa array
            })
            expect(values).to.include.members(["Mestrado", "Superior"])
        })
        
         
        cy.get('[data-test="dataEscolaridade"]')
            .select('1graucomp')
            .should('have.value','1graucomp')

    })

    it.only('combo/select multiplo', () => {
        cy.get('#formEsportes')
        .select(['Karate','natacao','nada'])
        
        //shoud.have.value não funciona direito neste caso de select múltiplo
        cy.get('[data-testid="dataEsportes"]').then($el => {
            console.log($el.val())
            // expect($el.val()).to.be.deep.equal(['Karate','natacao','nada']) //ele está oganizando na ordem dos valores no select
            expect($el.val()).to.be.deep.equal(['natacao','Karate','nada'])
            expect($el.val()).to.be.length(3)
        })

        cy.get('[data-testid="dataEsportes"]')
        .invoke('val') //invocando a funçõ val(), como se fosse #$el.val()
        .should('eql',['natacao','Karate','nada']) // eql é como se fosse um deep.equal
        
    })
})