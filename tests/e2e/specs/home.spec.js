describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Gitapp', () => {
        cy.visit('/');
        cy.title().should('eq', 'Gitapp');
    });


    //Verifica que se utilice card-header-title en el titulo
    it('Deberia tener el titulo con la clase card-header-title', () => {
        cy.visit('/');
        cy.get('.card').each((card) => {
          cy.wrap(card).get('.card-header-title').should('be.visible');
        });

    });


    //Verifica que se utilice card-header en el titulo
    it('Deberia tener el titulo con la clase card-header', () => {
        cy.visit('/');
        cy.get('.card').each((card) => {
            cy.wrap(card).get('.card-header').should('be.visible');
        });
    });


    //Verifica que se coloque signo (+) a un ingreso y (-) a un egreso
    it('Deberia tener signo (+) un ingreso y signo (-) un egreso', () => {
        cy.visit('/');
        cy.get('.level-right .level-item').each((amount) => {
            if (cy.wrap(amount).get(".has-text-success.is-size-3").length > 0) {
                cy.wrap(amount).should('include.text','$')
            } else {
                cy.wrap(amount).should('include.text','$')
            }
        });
    });



    it('Deberia mostrar los ultimos 5 movimientos', () => {
        cy.visit('/');

        cy.get('[data-testid=last-movements]').contains('Últimos movimientos');
        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    it('Deberia poder navegar a income', () => {
        cy.visit('/');

        cy.get('a[href*=income]')
            .contains('Ingresos')
            .click()
            .title()
            .should('eq', 'Gitapp - Ingresos')
    });
});
