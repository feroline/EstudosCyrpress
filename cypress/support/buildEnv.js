//trabalhando com gerenciamento em massa

const buildEnv = () => {
    //traz rotas genéricos que pode ser utilizadas em todos os testes

    cy.server(); //cria um server para enganar o frontend, tem que ser executado antes de cada teste
    cy.route('POST','/token').as('getToken'); //cria um endpoint para o frontend
        cy.route({ //simula a rota real
            method: 'POST',
            url: '/signin', //url que o frontend vai acessar
            response: {
                id: 1000,
                nome: 'Ususario Falso',
                token: 'String grande que nao deveria ser aceita, mas irá' //aida  não, mas irá
            }
        }).as('signin');

    cy.route({
        method: 'PUT',
        url: '/contas/**', //aceita qualquer id, coisa 
        response: [{
            id: 1,
            conta: 'Conta com movimentacao ficticia01',
            saldo: 10000,
            // token: 'String grande que nao deveria ser aceita, mas irá' 
        },
        {
            conta_id: 2,
            conta: 'Conta com movimentacao ficticia02',
            saldo: 15000,
            // token: 'String grande que nao deveria ser aceita, mas irá' 
        }]
    }).as('saldo')
           

};

export default buildEnv;