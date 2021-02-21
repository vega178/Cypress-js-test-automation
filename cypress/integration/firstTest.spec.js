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
    cy.get('[for="exampleInputEmail1"]')
      .should('contain', 'Email address')
      .should('have.class','label')
      .should('have.text', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(basicForm => {
      expect(basicForm.text()).to.equal('Email address')
      expect(basicForm).to.have.class('label')
      expect(basicForm).to.have.text('Email address')
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

  it.only("Assert property (Datepicker)", () => {

    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('default', {month: 'short'})
      let dateAssert = futureMonth + ' ' + futureDay + ', '+ date.getFullYear()
      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then((dateAttributeItem) => {
        if(!dateAttributeItem.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click();
          selectDayFromCurrent(day);
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
        }
      })
      return dateAssert;
    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()
    cy.get('a.sidebar-toggle').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(200);
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      cy.wrap(input).should('have.value', dateAssert)
    });
  });

  it("radio button", () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layout').click()
    cy.get('a.sidebar-toggle').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(value => {
        cy.wrap(value)
          .eq(0)
          .check({force: true})
          .should('be.checked')

        cy.wrap(value)
          .eq(1)
          .check({force: true})
        
        cy.wrap(value)
          .eq(0)
          .should('not.be.checked')  

        cy.wrap(value)
          .eq(2)
          .should('be.disabled')    
    })
  })

  it("check boxes", () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()
    cy.get('a.sidebar-toggle').click()

    //cy.get('[type="checkbox"]').check({force : true})
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(1).click({force: true})
  });

  it('lists and dropdowns', () => {
    cy.visit('/')
    //1
    /*cy.get('nav nb-select').click()
    cy.get('.options-list').contains('Cosmic').click()
    cy.get('nav nb-select').should('contain', 'Cosmic')
    cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(50, 50, 89)')*/

    //2
    cy.get('nav nb-select').then( dropdownOptions => {
      cy.wrap( dropdownOptions ).click()
      cy.get('.options-list nb-option').each( (colorItem, index) => {
        const colorText = colorItem.text().trim();

        const colors = { 
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(colorItem).click()
        cy.wrap(dropdownOptions).should('contain', colorText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[colorText])
        if (index < 3) {
          cy.wrap( dropdownOptions ).click()
        }
      });
    });
  });

  it('web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    cy.get('a.sidebar-toggle').click()
    //1
    cy.get('tbody').contains('tr','Larry').then( items => {
      cy.wrap(items).find('.nb-edit').click()
      cy.wrap(items).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(items).find('.nb-checkmark').click()
      cy.wrap(items).find('td').eq(6).should('contain','25')
    });
    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( rowItems => {
      cy.wrap(rowItems).find('[placeholder="First Name"]').type('Esteban')
      cy.wrap(rowItems).find('[placeholder="Last Name"]').type('Vega')
      cy.wrap(rowItems).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(columnItem => {
      cy.wrap(columnItem).eq(2).should('contain','Esteban')
      cy.wrap(columnItem).eq(3).should('contain','Vega')
    })
    //3
    const age = [15, 20 , 30, 100]
    cy.wrap(age).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each(rowItems => {
        if (age == 100) {
          cy.wrap(rowItems).should('contain','No data found')
        } else { 
          cy.wrap(rowItems).find('td').eq(6).should('contain',age)
        }
      })
    })
  });

  it('tooltip', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
    cy.get('a.sidebar-toggle').click()

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  });

  it('dialog box', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
    cy.get('a.sidebar-toggle').click()

    //1
    /*cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      cy.on('window:confirm', (confirm) => {
        expect(confirm).to.equal('Are you sure you want to delete?');
      });
    });*/

    //2
    /*const stub = cy.stub();
    cy.on('window:confirm', stub)
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
    });*/

    //3
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
  });
});