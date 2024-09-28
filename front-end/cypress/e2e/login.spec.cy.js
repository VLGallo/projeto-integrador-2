describe('Teste de login', () => {
  it('Deve acessar a página inicial e fazer login com credenciais válidas', () => {
    cy.visit('http://localhost:3000');
    cy.get('input[id="username"]').type('vanessa.gallo');
    cy.get('input[id="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.url().should('eq', 'http://localhost:3000/Home');
  });
});