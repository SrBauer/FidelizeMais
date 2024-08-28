document.querySelector('.entra').addEventListener('click', function(event) {
    event.preventDefault();

    const nome = document.querySelector('input[placeholder="Nome do Usuário"]').value;
    const empresa = document.querySelector('input[placeholder="Nome da Empresa"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.nome === nome && usuario.empresa === empresa && usuario.senha === senha) {
        window.location.href = 'dashboard.html'; // Redireciona para o dashboard
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

