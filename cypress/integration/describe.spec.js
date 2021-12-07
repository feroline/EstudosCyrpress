/// <reference types="cypress" />

it.only('Um teste externo... ', () => {
    //server para escrever um teste
});

describe('Deve ser um grupo de testes ...', () => {
    //para agruapr testes 
    it.skip('Um teste interno... ', () => {
        //server para escrever um teste
    });

    describe('Deve ser um grupo de testes mais espeficos ...', () => {
        it('Um teste interno especifico... ', () => {
            //server para escrever um teste
        });
    });
})