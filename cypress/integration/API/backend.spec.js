// EXEMPLO NÃO FUNCIONAL
/// <reference types="Cypress" />


describe('Testar API REST', () => {
    before(()=>{

    })


    it('Criar uma conta',()=>{
        cy.request({
            method: 'POST',
            url: 'https//barrigarest.wcaquino.me/signin',
            body: { //a requisição é mandada para o body
                email: "usuario@gmail",
                redirecionar: false,
                senha: "123456"
            }
        }).its('body.token').should('not.be.empty') //verifica se deu certo o login
        .then(token => { //caso precise do token
            cy.request({
                method: 'POST',
                headers: { Authorization:`JWT ${token}`}, //JWT é a estratégia de login que está senod utilizada, tavez n precisa dependendo da API
                url: 'https//barrigarest.wcaquino.me/contas',
                body: { 
                   nome: 'Conta Teste',
                }
            }).as('response')    //dar um alias permite que seja utilizaod em qualquer ponto
        })
    })

    cy.get('@response').then(response => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('nome', 'Conta Teste')
    })
})