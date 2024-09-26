describe('Tela de Cadastro', () => {
    beforeEach(() => {
      cy.visit('cadastro.html'); // Acesse a página de cadastro
    });
  
    it('Deve mostrar erro se as senhas não coincidirem', () => {
      cy.get('#empresa').type('Minha Empresa');
      cy.get('#nome').type('Usuário Teste');
      cy.get('#E-mail').type('teste@email.com');
      cy.get('#celular').type('999999999');
      cy.get('#ramo').select('restaurante');
      cy.get('#plano').select('Gratis');
      cy.get('#password').type('123456');
      cy.get('#confirmaSenha').type('654321');
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('As senhas não coincidem!');
      });
    });
  
    it('Deve realizar o cadastro com sucesso', () => {
      cy.get('#empresa').type('Minha Empresa');
      cy.get('#nome').type('Usuário Teste');
      cy.get('#E-mail').type('teste@email.com');
      cy.get('#celular').type('999999999');
      cy.get('#ramo').select('restaurante');
      cy.get('#plano').select('Gratis');
      cy.get('#password').type('123456');
      cy.get('#confirmaSenha').type('123456');
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Cadastro realizado com sucesso!');
      });
  
      cy.url().should('include', 'login.html'); // Verifica o redirecionamento para a tela de login
    });
  });
  