describe('Produtos', () => {

  beforeEach(() => {
    cy.fixture('users').then(({ validUser }) => {
      cy.login(validUser.username, validUser.password);
    });
  });

  // Feature: Produtos
  // Scenario: Exibição da lista de produtos após login
  // Given que estou na tela de login
  // When eu preencho usuário e senha válidos e clico em login
  // Then sou redirecionado para a tela com a lista de produtos

  it('deve exibir a lista de produtos após login', () => {
    cy.get('#inventory_container').should('be.visible');
  });

  // Feature: Produtos
  // Scenario: Visualização de detalhes de um produto
  // Given que estou autenticado na aplicação
  // When eu clico em um produto da lista
  // Then devo ser redirecionado para a página de detalhes do produto
  // And devo visualizar nome, descrição e preço do produto

  it('deve permitir visualizar os detalhes de um produto', () => {
    cy.get('.inventory_item').first().find('.inventory_item_name').click();
    cy.url().should('include', '/inventory-item.html');
    cy.get('.inventory_details_name').should('be.visible');
    cy.get('.inventory_details_desc').should('be.visible');
    cy.get('.inventory_details_price').should('be.visible');
  });

  // Feature: Produtos
  // Scenario: Ordenação de produtos por preço
  // Given que estou na tela de produtos
  // When seleciono a ordenação por "Price (low to high)"
  // Then os produtos devem estar ordenados do menor para o maior preço

  it('deve ordenar os produtos por preço do menor para o maior', () => {
    cy.url().should('include', '/inventory.html'); // garante que o login funcionou
    cy.get('#inventory_container').should('be.visible'); // espera a tela carregar
    cy.get('.product_sort_container').should('be.visible').select('lohi'); // agora deve funcionar

    cy.get('.inventory_item_price').then(($precos) => {
        const precos = [...$precos].map(p => parseFloat(p.innerText.replace('$', '')));
        const ordenado = [...precos].sort((a, b) => a - b);
        expect(precos).to.deep.equal(ordenado);
    });
   });


});
