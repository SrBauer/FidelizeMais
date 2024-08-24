document.addEventListener('DOMContentLoaded', function () {
    const btnEntrar = document.getElementById('btn-entrar');
    const loginContainer = document.getElementById('login-container');

    btnEntrar.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do botão

        // Captura os valores dos campos de entrada
        const username = document.getElementById('username').value;
        const company = document.getElementById('company').value;
        const password = document.getElementById('password').value;

        // Define os valores esperados (alterar conforme necessário)
        const expectedUsername = "usuarioExemplo";
        const expectedCompany = "empresaExemplo";
        const expectedPassword = "senhaExemplo";

        // Valida os dados de login
        if (username === expectedUsername && company === expectedCompany && password === expectedPassword) {
            // Redireciona para a página index.html
            <script>window.location.href = 'index.html';</script>
        } else {
            // Exibe uma mensagem de erro
            alert("Dados de login inválidos. Por favor, tente novamente.");
        }
    });
});
