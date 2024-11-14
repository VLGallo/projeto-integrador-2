describe("Cadastro de Pedido", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
    cy.get('[data-testid="login-input"]').type("vlgallo");
    cy.get('[data-testid="senha-input"]').type("123");
    cy.get('[data-testid="entrar-btn"]').click();
    cy.wait(3000);
    cy.saveSessionState();
  });

  it("Deve cadastrar um novo pedido", () => {
    // Acessar a página de pedidos
    cy.get('[data-testid="pedido-btn"]').click();

    // Selecionar o cliente "Mariana de Tomazini" no campo de cliente
    cy.get("[data-testid='cliente-picker']").each(($select) => {
      cy.wrap($select)
        .find("option")
        .contains("Mariana de Tomazini")
        .then(($option) => {
          cy.wrap($select).select($option.val());
        });
    });


  
    // Selecionar o(s) produto(s) na lista usando a checkbox
    cy.get("[data-testid='list-item-117']").click(); // Selecionar o primeiro item da lista (modifique o index se necessário)
    cy.get("[data-testid='list-item-118']").click(); // Selecionar o primeiro item da lista 
    
    cy.get("[data-testid='move-selected-right-btn']").click(); // Mover o item para a lista da direita

 
    // Finalizar o cadastro do pedido
    cy.get('[data-testid="salvar-btn"]').click();

    // Verificar se o pedido foi cadastrado com sucesso
    cy.contains("Pedido cadastrado com sucesso").should("be.visible");

    // Fechar a mensagem de sucesso
    cy.get("body").type("{esc}");
  });
});
