/// <reference types="cypress" />

// Custom commands for Cypress tests
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to navigate to a specific section
       * @example cy.navigateToSection('inputs')
       */
      navigateToSection(section: string): Chainable<void>
      
      /**
       * Custom command to add a parameter
       * @example cy.addParameter('Sodium', 1.5, 'mg/L')
       */
      addParameter(element: string, value: number, unit?: string): Chainable<void>
      
      /**
       * Custom command to switch language
       * @example cy.switchLanguage('ru')
       */
      switchLanguage(language: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('navigateToSection', (section: string) => {
  cy.get(`[data-menu-id*="${section}"]`).click();
});

Cypress.Commands.add('addParameter', (element: string, value: number, unit?: string) => {
  cy.get('[data-testid="add-parameter-btn"]').click();
  cy.get('[data-testid="element-select"]').click();
  cy.get(`[title="${element}"]`).click();
  cy.get('[data-testid="value-input"]').clear().type(value.toString());
  if (unit) {
    cy.get('[data-testid="unit-input"]').type(unit);
  }
  cy.get('[data-testid="save-parameter-btn"]').click();
});

Cypress.Commands.add('switchLanguage', (language: string) => {
  cy.get('[data-testid="language-selector"]').click();
  cy.get(`[value="${language}"]`).click();
});

export {};
