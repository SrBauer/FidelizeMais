document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const empresa = document.getElementById('empresa').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('E-mail').value;
    const celular = document.getElementById('celular').value;
    const ramo = document.getElementById('ramo').value;
    const plano = document.getElementById('plano').value;
    const senha = document.getElementById('password').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const usuario = {
        empresa: empresa,
        nome: nome,
        email: email,
        celular: celular,
        ramo: ramo,
        plano: plano,
        senha: senha
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; // Redireciona para a tela de login após o cadastro
});