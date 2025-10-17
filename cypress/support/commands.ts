/// <reference types="cypress" />

import { ROUTES } from "../../src/lib/config/constants";

declare global {
  namespace Cypress {
    interface Chainable {
      login(password: string): Chainable<void>;
      getByTestId(
        testId: string,
        ...args: any[]
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("login", password => {
  cy.visit(ROUTES.API_LOGIN);
  cy.get('input[name="password"]').type(`${password}{enter}`);
});

Cypress.Commands.add("getByTestId", (testId, ...args) => {
  return cy.get(`[data-testid="${testId}"]`, ...args);
});

export {};
