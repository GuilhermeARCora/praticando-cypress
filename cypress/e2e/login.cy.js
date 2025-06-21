describe('Login', () => {

  // Feature: Login
  // Scenario: Login com dados inválidos
  // Given que estou na tela de login
  // When eu preencho usuário e senha inválidos e clico em login
  // Then mensagem de erro é exibida
  
  it('não deve logar com sucesso e deve exibir erro por conta de credenciais inválidas', () => {
    cy.fixture('users').then(({ invalidUser }) => {
      cy.login(invalidUser.username, invalidUser.password);
      cy.get('[data-test="error"]').should('be.visible');
    });
  });

  // Feature: Login
  // Scenario: Login com sucesso e logout
  // Given que estou na tela de login
  // And o usuário "standard_user" está registrado
  // When eu insiro as credenciais corretas
  // And clico no botão de login
  // Then devo ser redirecionado para a tela de inventário
  // And devo ver o botão de menu no header
  // When clico no menu e seleciono logout
  // Then devo retornar para a tela de login

  it('deve fazer login e logout com sucesso', () => {
    cy.fixture('users').then(({ validUser }) => {

      cy.login(validUser.username, validUser.password);
      cy.url().should('include', '/inventory.html');

      cy.get('.bm-burger-button').click();

      cy.get('#logout_sidebar_link').click();

      cy.url().should('include', '/');
      cy.get('#login-button').should('be.visible');
    });
  });
});


