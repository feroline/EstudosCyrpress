// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import locators from './locators'

Cypress.Commands.add('clickAlert', (locator,mensage) => {

    cy.get(locator).click()
    cy.on('window:alert', mensagem => { //pega eventos que ocorrem na tela
        console.log(mensagem) 
        expect(mensagem).to.be.equal(mensage)
    }) 
})

Cypress.Commands.add('Login', (usuario,senha) => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get(locators.LOGIN.USER).type(usuario)
    cy.get(locators.LOGIN.PASSWORD).type(senha)
    cy.get(locators.LOGIN.BUTTON).click()
})

Cypress.Commands.add('getToken', (usuario, senha) => { //função para pegar e retornar o token
    it('Criar uma conta',()=>{
        cy.request({
            method: 'POST',
            url: '/signin',
            body: { //a requisição é mandada para o body
                email: usuario,
                redirecionar: false,
                senha: senha
            }
        }).its('body.token').should('not.be.empty') //verifica se deu certo o login
        .then(token => {
            Cypress.env('token', token) //salva o token no .env do cypress
            return token 
        })})
        .its('status').should('eq', 200)
})

//tem que pegar o id de um registor especifico, porque a cada alteração o id é diferente, dessa forma: 
Cypress.Commands.add('getContaByName', (nome, token) => { 
    cy.request({
        method: 'GET',
        url: `/contas`,
        headers: { Authorization:`JWT ${token}`},
        qs: { //querySeletor
            nome: nome //passando parametros para url para pegar o registro específico
        }
    }).then(resp => {
        return resp.body[0].id //pegou o id para passar corretamente para url
    })

});

//sobrescreve o requeste do cypress para não ter que ficar chamando o token o tempo todo
Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    //se receber apenas um valor, um parametro com todos os dados lá dentro
    if(options.length === 1){
        if(Cypress.env('token')){ //se ele existir no .env
            options[0].headers = {
                Authorization = `JWT ${Cypress.env('token')}` //adiciona o token no header
            }
        }
    }
})