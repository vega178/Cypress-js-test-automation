import { onDatePickerPage } from "../support/page_objects/datepickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('Test with Page Objects', () => {

  beforeEach(('open application'), () => {
    cy.openHomePage()
  });

  it('verify navigations across the pages', () => {
    navigateTo.formLayoutsPage(false)
    navigateTo.datepickerPage(false)
    navigateTo.smartTablePage(false)
    navigateTo.toasterPage(false)
    navigateTo.tooltip(false)
  });

  it.only('should submit and basic form and select tomorrow date in the calendar flow validation', () => {
    navigateTo.formLayoutsPage(true)
    onFormLayoutsPage.submitInlineFormWithNameAndEmail("Esteban", "esteba.co+1@gmai.com")
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword("esteba.co+1@gmai.com", "Ab1234567!")
    navigateTo.datepickerPage(true)
    onDatePickerPage.selectCommonDatepickerDateFromToday(1)
    onDatePickerPage.selectDatepickerWithRageFromToday(7, 14)
    navigateTo.smartTablePage(true)
    onSmartTablePage.addNewRecordWithFirstAndLastName("Esteban", "Velez")
    onSmartTablePage.updateAgeByFirtsName("Esteban", 26)
    onSmartTablePage.deleteRowByIndex(2)
  })
});