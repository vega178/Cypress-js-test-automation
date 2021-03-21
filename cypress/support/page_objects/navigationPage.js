const testUtils =  require("../utils/testUtilis").utilFunctions;

export class NavigationPage {
  formLayoutsPage(isNecessaryToHideIt) {
    testUtils.selectGroupMenuItem("Form")
    cy.contains('Form Layouts').click()
    testUtils.changeMenuState(isNecessaryToHideIt)
  }

  datepickerPage(isNecessaryToHideIt) {
    testUtils.changeMenuState(isNecessaryToHideIt)
    testUtils.selectGroupMenuItem("Form")
    cy.contains('Datepicker').click()
    testUtils.changeMenuState(isNecessaryToHideIt)
  }

  toasterPage(isNecessaryToHideIt) {
    testUtils.selectGroupMenuItem("Modal & Overlays")
    cy.contains('Toastr').click()
    testUtils.changeMenuState(isNecessaryToHideIt)
  }

  smartTablePage(isNecessaryToHideIt) {
    testUtils.selectGroupMenuItem("Tables & Data")
    cy.contains('Smart Table').click()
    testUtils.changeMenuState(isNecessaryToHideIt)
  }

  tooltip(isNecessaryToHideIt) {
    testUtils.selectGroupMenuItem("Modal & Overlays")
    cy.contains('Tooltip').click()
    testUtils.changeMenuState(isNecessaryToHideIt)
  }
}

export const navigateTo = new NavigationPage();