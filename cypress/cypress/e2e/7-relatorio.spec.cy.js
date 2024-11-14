describe("Validação de relatorio", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
    cy.get('[data-testid="login-input"]').type("vlgallo");
    cy.get('[data-testid="senha-input"]').type("123");
    cy.get('[data-testid="entrar-btn"]').click();
    cy.wait(5000);
    cy.saveSessionState();
  });

  it("Deve validar que o pedido entregue consta no relatório", () => {
    cy.get(
      ""
    ).click();
    cy.contains("Entregue").should("be.visible");
  });
});