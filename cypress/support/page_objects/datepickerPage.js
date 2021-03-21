const testUtils =  require("../utils/testUtilis").utilFunctions;

export class DatepickerPage {

  selectCommonDatepickerDateFromToday (dayFromToday) {
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = testUtils.selectDayFromCurrent(dayFromToday);
      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      cy.wrap(input).should('have.value', dateAssert)
    });
  }

  selectDatepickerWithRageFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssertFirst = testUtils.selectDayFromCurrent(firstDay);
      let dateAssertSecond = testUtils.selectDayFromCurrent(secondDay);
      const finalDate = dateAssertFirst +  " - " + dateAssertSecond;
      cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
      cy.wrap(input).should('have.value', finalDate)
    });
  }
}

export const onDatePickerPage = new DatepickerPage()