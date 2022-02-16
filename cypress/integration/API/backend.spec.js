// EXEMPLO NÃO FUNCIONAL
/// <reference types="Cypress" />


describe('Testar API REST', () => {
    //o token é algo que tem que ser armazenado, então para isso cria-se uma variável global
    let token;
    before(()=>{
        cy.getToken('usuario','senha').then(t => { //pega o token antes de todo teste
            token = t;
        })
    })  


    it('Criar uma conta',()=>{
      
        then(token => { //caso precise do token
            cy.request({
                method: 'POST',
                headers: { Authorization:`JWT ${token}`}, //JWT é a estratégia de login que está senod utilizada, tavez n precisa dependendo da API
                url: '/contas',
                body: { 
                   nome: 'Conta Teste',
                }
            }).as('response')    //dar um alias permite que seja utilizaod em qualquer ponto
        })

        cy.get('@response').then(response => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('nome', 'Conta Teste')
        })
    })


    it('Alterar uma conta', () => {
        //tem que pegar o id de um registor especifico, porque a cada alteração o id é diferente, dessa forma: 
        cy.request({
            method: 'GET',
            url: `/contas`,
            headers: { Authorization:`JWT ${token}`},
            qs: { //querySeletor
                nome: 'Conta para alterar' //passando parametros para url para pegar o registro específico
            }
        }).then(resp => {
            cy.request({
                url: `/contas/${resp.body[0].id}`, //pegou o id e passou corretamente para url
                method: 'PUT',
                headers: { Authorization:`JWT ${token}`},
                body: {
                    nome: 'Conta alterada via rest' //passo o parametro que quero alterar
                }
            }).as(response)
        })
       
    })

    it('Alterar uma conta com o mesmo nome', () => {
        //tem que pegar o id de um registor especifico, porque a cada alteração o id é diferente, dessa forma: 
        cy.request({
            method: 'GET',
            url: `/contas`,
            headers: { Authorization:`JWT ${token}`},
            qs: { //querySeletor
                nome: 'Conta para alterar repetida' //passando parametros para url para pegar o registro específico
            }, 
            failOnStatusCode: false //O cypress intepreta o erro 400 automaticamente como erro, com esse parametro não dá erro, e retorna um status code 400
        }).then(resp => {
            cy.request({
                url: `/contas/${resp.body[0].id}`, //pegou o id e passou corretamente para url
                method: 'PUT',
                headers: { Authorization:`JWT ${token}`},
                body: {
                    nome: 'Conta alterada repetida' //passo o parametro que quero alterar
                }
            }).as(response)
        })

        cy.get('@response').then(response => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.be.equal('Já existe uma conta com esse nome')
        })
    })

    it('transação',()=>{
        cy.getContaByName('Conta para movimentações', token)
            .then(contaID =>  {
                cy.request({
                    method: 'POST',
                    url: `/transacoes`,
                    headers: { Authorization:`JWT ${token}`},
                    body: {
                        conta_id: contaID,
                        data_pagamento: Cypress.moment().format('DD/MM/YYYY'), //pega a data atual e formata para o padrão esperado
                        data_transacao: Cypress.moment().add({days: 1}).format('DD/MM/YYYY') //adiciona 1 dia após a data atual
                    }
                }).as('response')

                cy.get('@response').its('status').should('be.equal', 201)

            })
        
    })
})