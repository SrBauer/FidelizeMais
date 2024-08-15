document.addEventListener('DOMContentLoaded', function () {
    const btnExperimente = document.querySelector('.btn-experimente');
    const modalCadastro = document.getElementById('modal-cadastro');

    btnExperimente.addEventListener('click', function () {
        modalCadastro.style.display = 'flex';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modalCadastro) {
            modalCadastro.style.display = 'none';
        }
    });
});