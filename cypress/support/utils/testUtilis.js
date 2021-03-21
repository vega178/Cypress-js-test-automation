module.exports = exports = {
  utilFunctions: {
    selectGroupMenuItem: function(groupPage) {
      cy.contains('a', groupPage).then(menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then((attr) => {
          if( attr.includes('left')) {
            cy.wrap(menu).click();
          }
        });
      });
    },
    changeMenuState: function(isNecessaryToHideIt) {
      if (cy.get('nb-sidebar.menu-sidebar').invoke('attr','left expanded') && isNecessaryToHideIt == true) {
        cy.get('a.sidebar-toggle').click()
      }
    },
    selectDayFromCurrent: function(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      let futureMonth = date.toLocaleString('default', {month: 'short'})
      let dateAssert = futureMonth + ' ' + futureDay + ', '+ date.getFullYear()
      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then((dateAttributeItem) => {
        if(!dateAttributeItem.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click();
          this.selectDayFromCurrent(day);
        } else {
          cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
        }
      })
      return dateAssert;
    }
  }
}