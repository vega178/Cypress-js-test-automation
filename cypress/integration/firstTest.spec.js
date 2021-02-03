/// <reference types="cypress" />

describe('Our firts suite', () => {

  it("Firts test", () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
    cy.get('a.sidebar-toggle').click()

    //by Tag Name
    cy.get('input');

    //by ID
    cy.get('#inputEmail1');

    //by class name
    cy.get('.input-full-width');

    //by Attribute Name
    cy.get('[placeholder]');

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    //by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]');

    //by tag name, attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]');

  });

  it("Second test", () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.get('a.sidebar-toggle').click()

    cy.get('[data-cy="singInButton"]')
    cy.contains('Sign in')
    cy.contains('[status="warning"]','Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card','Horizontal form').find('[type="email"]')
  });

  it("Then and wrapp methods", () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.get('a.sidebar-toggle').click()

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    //Save values in Jquery methds form 
    cy.contains('nb-card', 'Using the Grid').then(gridForm => {
      const emailLabelFirstForm = gridForm.find('[for="inputEmail1"]').text()
      const passLabelFirstForm = gridForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirstForm).to.equal('Email')
      expect(passLabelFirstForm).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(basicForm => {
        const passLabelSecondForm = basicForm.find('[for="exampleInputPassword1"]').text()
        expect(passLabelFirstForm).to.equal(passLabelSecondForm)

      //Save values in Cypress methods form
      cy.wrap(basicForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      });
    });
  });

  it("Invoke command", () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    cy.get('a.sidebar-toggle').click()

    //1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(basicForm => {
      expect(basicForm.text()).to.equal('Email address')
    });

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    });

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked')
      .then(classValueParam => {
        expect(classValueParam).to.contain('checked')
      });
  });

  it.only("Assert property", () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    cy.get('a.sidebar-toggle').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 17, 2021')
    });
  });
});