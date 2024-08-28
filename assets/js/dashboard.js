let clientes = [];
let premios = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    document.getElementById(sectionId).style.display = 'block';
    document.getElementById(sectionId).classList.remove('hidden');

    const button = document.querySelector(`.button.${sectionId.split('-')[0]}-bg`);
    const offsetTop = button.offsetTop + button.offsetHeight + 10;
    document.getElementById(sectionId).style.top = `${offsetTop}px`;
}

function hideSection(sectionId) {
    document.getElementById(sectionId).classList.add('hidden');
    document.getElementById(sectionId).style.display = 'none';
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
    listarMembros();
}

function listarMembros() {
    const membrosList = document.getElementById('membrosList');
    membrosList.innerHTML = '';
    clientes.forEach((cliente, index) => {
        let tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.pontos}</td>
            <td>
                <button onclick="adicionarPontos(${index})">Adicionar Pontos</button>
                <button onclick="resgatarPremio(${index})">Resgatar</button>
            </td>
        `;
        
        membrosList.appendChild(tr);
    });
}

function adicionarPontos(index) {
    let pontos = prompt('Quantos pontos deseja adicionar?');
    if (isNaN(pontos) || pontos === null) return;

    clientes[index].pontos += parseInt(pontos);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listarMembros();
    atualizarDadosClientes();
}

function resgatarPremio(index) {
    let cliente = clientes[index];
    let premioElegivel = premios.find(premio => cliente.pontos >= premio.pontos);
    
    if (premioElegivel) {
        alert(`${cliente.nome} resgatou o prêmio ${premioElegivel.nome}!`);
        cliente.pontos -= premioElegivel.pontos;
        localStorage.setItem('clientes', JSON.stringify(clientes));
        listarMembros();
    } else {
        alert('Pontos insuficientes para resgatar um prêmio.');
    }
}

function adicionarPremio() {
    const premio = document.getElementById('premio').value;
    const pontosNecessarios = document.getElementById('pontosNecessarios').value;

    if (premio && pontosNecessarios) {
        premios.push({ nome: premio, pontos: parseInt(pontosNecessarios) });
        localStorage.setItem('premios', JSON.stringify(premios));
        listarPremios();
        document.getElementById('premiosForm').reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function listarPremios() {
    const premiosList = document.getElementById('premiosList');
    premiosList.innerHTML = '';
    premios.forEach(premio => {
        let li = document.createElement('li');
        li.innerText = `${premio.nome} - ${premio.pontos} pontos necessários`;
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
