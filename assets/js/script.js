// script.js

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefone(celular) {
    const re = /^[0-9]{10,11}$/;
    return re.test(celular);
}

function validarFormulario() {
    const email = document.getElementById("email").value;
    const celular = document.getElementById("celular").value;
    const senha = document.getElementById("password").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    if (!validarEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return false;
    }

    if (!validarTelefone(celular)) {
        alert("Por favor, insira um celular válido (somente números, com 10 ou 11 dígitos).");
        return false;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Por favor, verifique.");
        return false;
    }

    // Adicione outras validações, se necessário

    return true; // Permite o envio do formulário se todas as validações passarem
}
