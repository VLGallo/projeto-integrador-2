describe("Entrega de Pedido", () => {
  it("Deve entregar um novo pedido", () => {
    cy.visit("https://vlgallo.github.io/projeto-integrador-2/motoboy-page/index.html?motoboy=9");
    
    // Marca o checkbox de "Entregar"
    cy.get('label').contains("Entregar").click();
    cy.get('#checkbox-entregar').check();
    
    // Verifica se o status foi atualizado
    cy.get("#status-entrega").should("be.visible").and("contain", "Entregue");
  });
});
