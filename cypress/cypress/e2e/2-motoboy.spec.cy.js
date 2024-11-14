describe("Cadastro de Motoboy", () => {
  before(() => {
    cy.visit(Cypress.config("baseUrl"));
    cy.get('[data-testid="login-input"]').type("vlgallo");
    cy.get('[data-testid="senha-input"]').type("123");
    cy.get('[data-testid="entrar-btn"]').click();
    cy.wait(5000)
    cy.saveSessionState();
  });

  it("Deve cadastrar um novo motoboy", () => {
    cy.visit(Cypress.config("baseUrl"));
    cy.get('div[tabindex="0"]').contains("Cadastro").click();
    cy.get('[data-testid="nome-entregador-input"]').type("Antenor Garcia");
    cy.get('[data-testid="telefone-entregador-input"]').type("16998774522");
    cy.get('[data-testid="placa-entregador-input"]').type("MLB8170");
    cy.get('[data-testid="salvar-entregador-btn"]').click();
    cy.contains("Entregador(a) cadastrado(a) com sucesso").should("be.visible");
    cy.get("body").type("{esc}");
  });
});
