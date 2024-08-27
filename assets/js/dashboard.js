let clientes = [];
let premios = [];

function showSection(sectionId) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');

 }

function hideSection(sectionId) {
    document.getElementById(sectionId).classList.add('hidden');
}

function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const sexo = document.getElementById('sexo').value;

    const cliente = {
        nome: nome,
        telefone: telefone,
        sexo: sexo,
        pontos: 0
    };

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    alert('Cliente cadastrado com sucesso!');
    document.getElementById('cadastroForm').reset();
    atualizarDadosClientes();
}

function listarMembros() {
    const membrosList = document.getElementById('membrosList');
    membrosList.innerHTML = '';
    clientes.forEach((cliente, index) => {
        let li = document.createElement('li');
        li.innerText = `${cliente.nome} - ${cliente.telefone} - ${cliente.pontos} pontos`;
        li.setAttribute('data-index', index);
        li.onclick = () => {
            let pontos = prompt('Quantos pontos deseja adicionar?');
            adicionarPontos(index, parseInt(pontos));
        };
        membrosList.appendChild(li);
    });
}

function adicionarPontos(index, pontos) {
    if (isNaN(pontos)) return;
    clientes[index].pontos += pontos;
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listarMembros();
    atualizarDadosClientes();
}

function pesquisarCliente() {
    const pesquisa = document.getElementById('pesquisa').value.toLowerCase();
    const resultadoPesquisa = document.getElementById('resultadoPesquisa');
    resultadoPesquisa.innerHTML = '';
    clientes.forEach(cliente => {
        if (cliente.nome.toLowerCase().includes(pesquisa) || cliente.telefone.includes(pesquisa)) {
            let li = document.createElement('li');
            li.innerText = `${cliente.nome} - ${cliente.telefone} - ${cliente.pontos} pontos`;
            resultadoPesquisa.appendChild(li);
        }
    });
}

function adicionarPremio() {
    const premio = document.getElementById('premio').value;
    if (premio) {
        premios.push(premio);
        localStorage.setItem('premios', JSON.stringify(premios));
        listarPremios();
        document.getElementById('premiosForm').reset();
    }
}

function listarPremios() {
    const premiosList = document.getElementById('premiosList');
    premiosList.innerHTML = '';
    premios.forEach((premio, index) => {
        let li = document.createElement('li');
        li.innerText = premio;
        premiosList.appendChild(li);
    });
}

function atualizarDadosClientes() {
    document.querySelector('.clientes p:nth-child(2)').innerText = `${clientes.length} Cartões Cadastrados`;
    document.querySelector('.clientes p:nth-child(3)').innerText = `${clientes.filter(c => c.pontos > 0).length} Ativos`;
    document.querySelector('.clientes p:nth-child(4)').innerText = `${clientes.filter(c => c.pontos === 0).length} Cancelados`;

    const recorrentes = clientes.filter(c => c.pontos > 10).length;
    document.querySelector('.comportamento p:nth-child(2)').innerText = `${recorrentes} Clientes Recorrentes`;
    const ticketMedio = clientes.length > 0 ? (clientes.reduce((sum, cliente) => sum + cliente.pontos, 0) / clientes.length).toFixed(2) : 0;
    document.querySelector('.comportamento p:nth-child(3)').innerText = `R$ ${ticketMedio} Ticket Médio`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('clientes')) {
        clientes = JSON.parse(localStorage.getItem('clientes'));
    }
    if (localStorage.getItem('premios')) {
        premios = JSON.parse(localStorage.getItem('premios'));
    }
    listarMembros();
    listarPremios();
    atualizarDadosClientes();
});
