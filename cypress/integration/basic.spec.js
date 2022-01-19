/// <reference types="cypress" /> 

describe('Basic', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        // console.log(cy.title().should('be.equal', 'açlsdçlaskd'));
        // cy.title().should('be.equal', 'Campo de Treinamento');
        // cy.title().should('include', 'Campo de Treinamento')
        // cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        cy.title().debug();

        // se eu quiser pegar esse title e utilizar mais a frente, irei fazer da seguinte forma
        let  syncTitle;

        cy.title().then(title => { //promisse
            console.log(title)
            cy.get('#formNome').type(title)
            syncTitle = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el => {
            $el.
        })

        cy.title().should(title => { //promisse
            console.log(title)
        })
    });

    describe('Challengs', () => {
        it('Should print the title in console', () => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
            cy.title().then(title => {
                console.log(title)
            })
        });

        //should input the title of the page in the input #formNome
        it('Should input the title of the page in the input #formNome', () => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
            // cy.pause(); 
            cy.title().then(title => {
                cy.get('#formNome').type(title);
                // cy.get('#formNome').type(title).debug();
                // cy.get('#buttonSimple').click().should('have.value', 'Obrigado!')
            })
        });
        
        it('Deve clicar no botão "click me"', () => {
            cy.get('#buttonSimple').click().should('have.value', 'Obrigado!')
        })


    });



    // //  shoud visit the wikipedia page and type 'QA é top' in the search input 
    // it('Should visit the wikipedia page and type "QA é top" in the search input', () => {
    //     cy.visit('https://wikipedia.org/')
    //     cy.get('#searchInput').type('QA é top')
    // });


});
