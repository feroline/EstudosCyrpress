/// <reference types="Cypress"/>

import locators from '../fixture/locators';
import buildEnv from '../suport/buildEnv';
// import '/../../commandsContas';

after(() => { //executa depois de todos os testes
    cy.clearLocalStorage //é associado a uma url, irá limpar o local storage para impedir que o usuário fique logado
}) 

let token;

beforeEach(() => { //executa antes de cada teste
    buildEnv(); //tem que executar antes de cada teste por porssuir o server()
}) 

   
before(()=>{

    cy.getToken('usuario','senha').then(t => { //pega o token antes de todo teste
        token = t;
    })
})  

it('criar 2 contas ao mesmo tempo', () => {
    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [{ //pode colocar elas em um arquivo json nas fixture e chamar, diminuindo o código
            conta_id: 1000,
            conta: 'Conta com movimentacao ficticia01',
            saldo: 10000,
            // token: 'String grande que nao deveria ser aceita, mas irá' 
        },
        {
            conta_id: 1005,
            conta: 'Conta com movimentacao ficticia02',
            saldo: 15000,
            // token: 'String grande que nao deveria ser aceita, mas irá' 
        }]
    }).as('saldo')
})

it('criar 2 contas com o mesmo nome', () => {
    cy.route({
        method: 'PUT',
        url: '/contas',
        response: {'error': "Já existe uma conta com esse nome" }, 
        status: 400 //tem que dar esse status para o cypress entender que deu erro
    }).as('saveContaComMesmoNome')
})

it('Verificar se os dados são válidos, inserindo login vazio', () => {

    cy.route({ 
        method: 'POST',
        url: '/signin', 
        response: {id: 1000,nome: 'Ususario Falso',token: 'String grande que nao deveria ser aceita, mas irá' },
        onRequest: req => {
            expect(req.request.body.nome).to.be.empty;
            expect(req.request.headers).to.have.property('Authorization');
        }
    }).as('signin');

    //vamos fingir que tem essa função
    cy.acessarMenuConta('{CONTROL}') //enganar o cyprees para passar um valor vazio
})

it('Teste de responsividade', () => {
    cy.get('[data-test=menu-home]').should('exist')
       .and('be.visible');
       
    cy.viewport(500,700) //redimensiona a tela

    cy.get('[data-test=menu-home]').should('exist')
        .and('not.be.visible');

    cy.get('[data-test=menu-home]').should('exist')
       .and('be.visible');
       
    cy.viewport('iphone-5') //redimensiona a tela para iphone 5, um dos tamanhos pré-definidos no site do cypress
    
    cy.get('[data-test=menu-home]').should('exist')
        .and('not.be.visible');    
        
})

