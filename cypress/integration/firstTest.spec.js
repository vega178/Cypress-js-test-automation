/// <reference types="cypress" />

describe('Our firts suite', () => {

  it("Firts test", () => {

    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

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
});