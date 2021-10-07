// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";
import "cypress-file-upload";

Cypress.Commands.add("login", (username?: string, password?: string) => {
  username = username ?? Cypress.env("ADMIN_USERNAME");
  password = password ?? Cypress.env("ADMIN_PASSWORD");
  cy.visit("/auth/signin");
  cy.findByLabelText(/username/i).type(username);
  cy.findByLabelText(/password/i).type(password);
  cy.findByRole("button", { name: /sign in/i }).click();
});

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Log in to the application using credentials in the cypress environment variables
       * @example
       * cy.login()
       */
      login(username?: string, password?: string): Chainable<any>;
    }
  }
}
