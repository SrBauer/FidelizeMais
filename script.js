document.addEventListener("DOMContentLoaded", function() {

    function loadCadastro() {
        fetch('cadastro.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('modal-cadastro-container').innerHTML = data;

                document.getElementById('modal-cadastro').style.display = 'block';
            })
            .catch(error => console.error('Erro ao carregar a tela de cadastro:', error));
    }

    // Vincular os eventos de clique aos botões
    document.getElementById('btn-experimente').addEventListener('click', loadCadastro);
    document.getElementById('btn-comece-gratis').addEventListener('click', loadCadastro);
    document.getElementById('btn-comece-agora-1').addEventListener('click', loadCadastro);
    document.getElementById('btn-comece-agora-2').addEventListener('click', loadCadastro);
});
