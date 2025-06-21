Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/v1/');
  cy.get('#user-name').type(username);
  cy.get('#password').type(password);
  cy.get('#login-button').click();
});