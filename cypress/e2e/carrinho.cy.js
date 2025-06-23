describe('Carrinho', () => {

    beforeEach(() => {
        cy.fixture('users').then(({ validUser }) => {
        cy.login(validUser.username, validUser.password);
        });
    });

    // Feature: Carrinho
    // Scenario: Adicionar produtos ao carrinho
    // Given que estou na tela de prudotos
    // When eu clico no botão 'ADD TO CART'
    // Then o produto é adicionado ao carrinho
    // And o icone do carrinho de compras é atualizado

    it('deve adicionar um produto ao carrinho e atualizar o ícone do carrinho', () => {
        cy.get('.inventory_item').first().within(() => {
        cy.contains('ADD TO CART').click();
        });
        cy.get('.shopping_cart_badge').should('contain', '1');
    });

    // Feature: Carrinho
    // Scenario: Remover produtos ao carrinho
    // Given que estou na tela de prudotos
    // And um produto foi adicionado ao carrinho
    // When eu clico no botão 'REMOVE'
    // Then o produto é removido do carrinho
    // And o icone do carrinho de compras é atualizado

    it('deve remover um produto do carrinho e atualizar o ícone do carrinho', () => {
        cy.get('.inventory_item').first().within(() => {
        cy.contains('ADD TO CART').click();
        cy.contains('REMOVE').click();
        });
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    // Feature: Carrinho
    // Scenario: Validar estado do carrinho
    // Given que estou na tela de prudotos
    // When eu clico no icone do carrinho
    // Then sou redirecionado a tela do carrinho
    // And nela posso visualizar os produtos adicionados

     it('deve exibir corretamente os produtos adicionados ao acessar o carrinho', () => {
        cy.get('.inventory_item').first().within(() => {
        cy.contains('ADD TO CART').click();
        });

        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        cy.get('.cart_item').should('have.length', 1);
        cy.get('.cart_item .inventory_item_name').should('be.visible');
    });

});