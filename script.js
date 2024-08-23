document.addEventListener('DOMContentLoaded', function () {
    const btnEntrar = document.getElementById('btn-entrar');
    const loginContainer = document.getElementById('login-container');

    btnEntrar.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        loginContainer.style.display = 'flex';
    });
});