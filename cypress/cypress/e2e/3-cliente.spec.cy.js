describe("Cadastro de Cliente", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
    cy.get('[data-testid="login-input"]').type("vlgallo");
    cy.get('[data-testid="senha-input"]').type("123");
    cy.get('[data-testid="entrar-btn"]').click();
    cy.wait(5000);
    cy.saveSessionState();
  });

  it("Deve cadastrar um novo cliente", () => {
    cy.get('[data-testid="cliente-btn"]').click();
    cy.get('[data-testid="nome-cliente-input"]').click().type("Josivaldo da Silva");
    cy.get('[data-testid="telefone-input"]').click().type("16998725562");
    cy.get('[data-testid="CEP-input"]').click().type("13561060");
    cy.get('[data-testid="numero-input"]').click().type("691");
    cy.get('[data-testid="cadastrar-btn"]').click();
    cy.contains("Cliente cadastrado com sucesso").should("be.visible");
    cy.get("body").type("{esc}");
  });
});
