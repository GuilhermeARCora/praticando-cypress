describe('Checkout', () => {

  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      cy.login(validUser.username, validUser.password);
    });

    // Adiciona um item ao carrinho e vai para a tela do carrinho
    cy.get('.inventory_item').first().within(() => {
      cy.contains('ADD TO CART').click();
    });

    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
  });

  // Feature: Checkout
  // Scenario: Iniciar processo de checkout
  // Given que estou na tela do carrinho
  // When eu clico no botão 'CHECKOUT'
  // Then sou redirecionado para a tela de checkout step one

  it('deve iniciar o processo de checkout e ir para a tela de checkout step one', () => {
    cy.contains('CHECKOUT').click();
    cy.url().should('include', '/checkout-step-one.html');
  });

  // Feature: Checkout
  // Scenario: Preencher dados obrigatórios (nome, sobrenome, Zip/Postal Code) 
  // Given que estou na tela de checkout step one
  // When eu preencho os três campos
  // And clico no botão 'CONTINUE'
  // Then sou redirecionado para a tela de checkout step two

  it('deve preencher os campos obrigatórios e avançar para o resumo da compra', () => {
    cy.contains('CHECKOUT').click();
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.contains('CONTINUE').click();

    cy.url().should('include', '/checkout-step-two.html');
  });

  // Feature: Checkout
  // Scenario: Erro ao preencher dados obrigatórios 
  // Given que estou na tela de checkout step one
  // When eu não preencho um ou mais dos três campos
  // And clico no botão 'CONTINUE'
  // Then uma mensagem de erro aparece

  it('deve exibir erro ao tentar continuar sem preencher os campos obrigatórios', () => {
    cy.contains('CHECKOUT').click();
    cy.contains('CONTINUE').click();
    cy.get('[data-test="error"]').should('be.visible');
  });

  // Feature: Checkout
  // Scenario: Validar resumo da compra
  // Given que preenchi corretamente os campos no step one
  // And clico no botão 'CONTINUE'
  // When estou na tela de checkout step two
  // Then vejo o resumo da minha compra

  it('deve exibir o resumo da compra na tela de checkout step two', () => {
    cy.contains('CHECKOUT').click();
    cy.get('[data-test="firstName"]').type('Maria');
    cy.get('[data-test="lastName"]').type('Souza');
    cy.get('[data-test="postalCode"]').type('54321');
    cy.contains('CONTINUE').click();

    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_info').should('be.visible');
    cy.get('.inventory_item_name').should('be.visible');
  });

  // Feature: Checkout
  // Scenario: Finalizar compra
  // Given que o resumo da minha compra está correto
  // When eu clico no botão 'FINISH'
  // Then vejo a mensagem de confirmação de sucesso da compra

  it('deve finalizar a compra com sucesso e exibir a mensagem de confirmação', () => {
    cy.contains('CHECKOUT').click();
    cy.get('[data-test="firstName"]').type('Carlos');
    cy.get('[data-test="lastName"]').type('Pereira');
    cy.get('[data-test="postalCode"]').type('67890');
    cy.contains('CONTINUE').click();

    cy.contains('FINISH').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
  });

});
