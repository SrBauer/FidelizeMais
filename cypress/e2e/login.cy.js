describe('Tela de Login', () => {
    beforeEach(() => {
      cy.visit('login.html'); // Acesse a página de login
    });
  
    it('Deve mostrar erro ao inserir credenciais incorretas', () => {
      cy.get('input[placeholder="Nome do Usuário"]').type('usuario_incorreto');
      cy.get('input[placeholder="Nome da Empresa"]').type('empresa_incorreta');
      cy.get('input[placeholder="Senha"]').type('senha_incorreta');
      cy.get('.entra').click();
      
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Usuário ou senha incorretos!');
      });
    });
  
    it('Deve fazer login com credenciais corretas', () => {
      // Simula a criação de um usuário no localStorage
      const usuario = {
        nome: 'usuario_teste',
        empresa: 'empresa_teste',
        senha: '123456'
      };
      localStorage.setItem('usuario', JSON.stringify(usuario));
  
      // Teste de login
      cy.get('input[placeholder="Nome do Usuário"]').type('usuario_teste');
      cy.get('input[placeholder="Nome da Empresa"]').type('empresa_teste');
      cy.get('input[placeholder="Senha"]').type('123456');
      cy.get('.entra').click();
  
      cy.url().should('include', 'dashboard.html'); // Verifica se redirecionou para o dashboard
    });
  });
  