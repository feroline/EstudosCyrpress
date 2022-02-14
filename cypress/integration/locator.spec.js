/// <reference types="cypress" />

//Eu posso definir a prioridade de escolha para localizar os elementos

describe('Work itens with locators', () => {
    before(() => { // before é um hook executado antes de todos os itens
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('locator with jquery selector', () => {
        //primeiro elemento , terceiro filho
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')

        //que o onclick contenha: 
        cy.get("[onclick*='Francisco']")

        // ~ procura pelo irmão
        cy.get("table#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3)")
        
    })

    //XPath é utilizado para localizar elementos em xml, entretanto dá para utilizar em html
    // /html/body/div/input -> qual elemento eu quero encontrar
    // //input -> chegar no input diretamente, chegando no input diretamente 
    it.only('Using XPath', () => {
        cy.xpath('(//input[@type="button"][@value="Clique aqui"])[2]') // @ -> atributo ; () -> filhos ;
        cy.xpath('//input[contains(@onclick, "Francisco")]')
        
    })

})