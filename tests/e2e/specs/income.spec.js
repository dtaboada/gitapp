describe('Ingresos Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia cargar el formulario al editar un ingreso', () => {
        cy.visit('/income');

        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();

        cy.get('input[name=id]').should('have.value', '3');
        cy.get('input[name=category]').should('have.value', 'Sueldo');
        cy.get('input[name=amount]').should('have.value', '50000');
    });

    it('Deberia poder crear un nuevo ingreso', () => {
        cy.visit('/income');

        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.reload();

        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    it('Deberia poder refresh sin reload()', () => {
        cy.visit('/income');
        var name='Bono';
        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type(name);
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.contains(name)
          .should('be.visible');

        cy.get('[data-testid=movement]').should('have.length', 5);
    });
    it('Se debe mostrar una alerta cuando un movimiento se cree exitosamente', () => {
        cy.visit('/income');
        
        //crear un movimiento
        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.reload()

        //validar contenido del alert y del boton
        const mensajeDelAlert = 'se creo un movimiento con exito'; 
        cy.on('window:alert', (str) => {
            expect(str).to.equal(mensajeDelAlert)
        })
              
      });

      it('Se debe mostrar la fecha correcta al crear un movimiento', () => {
        cy.visit('/income');
        const fecha = '2021-04-26';
        
        cy.get('input[name=date]').type(fecha);
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();
        cy.reload();
        
        cy.get('body > main > div > div > div:nth-child(2) > div > div.card-content > div > ul > li:nth-child(5) > div > div.level-left > div:nth-child(2) > div > p.has-text-weight-light.is-size-7')
            .should('include.text', fecha);
        
    });
    

      it('Se debe mostrar una confirmacion antes de eliminar', () => {
        cy.visit('/income');
       
        //crear un movimiento
       cy.get('input[name=date]').type('2021-04-26');
       cy.get('input[name=category]').type('Bono');
       cy.get('input[name=amount]').type('100000');
       cy.contains('Guardar').click();
       cy.reload()
       cy.contains('editar').click();
       cy.contains('Eliminar').click();

        //validar contenido del alert y del boton
        const mensajeDelAlert = 'Seguro que quiere eliminar?'; 
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(mensajeDelAlert)
        })
              
      });



      
});
