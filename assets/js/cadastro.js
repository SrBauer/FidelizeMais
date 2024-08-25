{/* <script>
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault() // Evita o envio do formulário padrão

        // Captura os valores dos campos
        const empresa = document.getElementById('empresa').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const ramo = document.getElementById('ramo').value;
    const plano = document.getElementById('plano').value;

    // Validação simples
    if (empresa === '' || nome === '' || celular === '' || ramo === '' || plano === '') {
        alert('Por favor, preencha todos os campos.');
    return;
        }

    // Criação do objeto para armazenar os dados
    const cadastro = {
        empresa,
        nome,
        celular,
        ramo,
        plano
    };

    // Conversão para JSON
    const cadastroJSON = JSON.stringify(cadastro);

    // Armazena no arquivo JSON
    saveDataToJSON(cadastroJSON);
});

    // Função para armazenar o dado em um arquivo JSON
    function saveDataToJSON(data) {
        // O código abaixo simula o salvamento local (no navegador) usando localStorage
        // Em um ambiente de servidor, você precisaria enviar esses dados para o backend.
        localStorage.setItem('cadastro', data);
        
        // Simulação de feedback ao usuário
        alert('Dados salvos com sucesso!');
        console.log('Dados salvos:', data);
    }
</script> */}
