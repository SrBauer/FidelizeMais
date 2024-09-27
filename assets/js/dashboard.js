let clientes = [];
let premios = [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });

    document.getElementById(sectionId).style.display = 'block';
    document.getElementById(sectionId).classList.remove('hidden');

    const button = document.querySelector(`.button.${sectionId.split('-')[0]}-bg`);
    const offsetTop = button ? button.offsetTop + button.offsetHeight + 10 : 0;
    document.getElementById(sectionId).style.top = `${offsetTop}px`;
}

function hideSection(sectionId) {
    document.getElementById(sectionId).classList.add('hidden');
    document.getElementById(sectionId).style.display = 'none';
}

function cadastrarCliente() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const cliente = {
        nome: nome,
        telefone: telefone,
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
    let premiosElegiveis = premios.filter(premio => cliente.pontos >= premio.pontos);

    if (premiosElegiveis.length > 0) {
        let opcoes = premiosElegiveis.map((premio, i) => `${i + 1}. ${premio.nome} (${premio.pontos} pontos)`).join('\n');
        let escolha = prompt(`Escolha um prêmio:\n${opcoes}`);
        let premioSelecionado = premiosElegiveis[parseInt(escolha) - 1];

        if (premioSelecionado) {
            alert(`${cliente.nome} resgatou o prêmio ${premioSelecionado.nome}!`);
            cliente.pontos -= premioSelecionado.pontos;
            localStorage.setItem('clientes', JSON.stringify(clientes));
            listarMembros();
        } else {
            alert('Escolha inválida.');
        }
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
    premios.forEach((premio, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${premio.nome}</td>
            <td>${premio.pontos}</td>
            <td>
                <button onclick="editarPremio(${index})">Editar</button>
                <button onclick="excluirPremio(${index})">Excluir</button>
            </td>
        `;
        premiosList.appendChild(tr);
    });
}

function editarPremio(index) {
    const novoNome = prompt('Novo nome do prêmio:', premios[index].nome);
    const novosPontos = prompt('Nova quantidade de pontos:', premios[index].pontos);
    
    if (novoNome && novosPontos && !isNaN(novosPontos)) {
        premios[index].nome = novoNome;
        premios[index].pontos = parseInt(novosPontos);
        localStorage.setItem('premios', JSON.stringify(premios));
        listarPremios();
    } else {
        alert('Por favor, insira valores válidos.');
    }
}

function excluirPremio(index) {
    if (confirm('Tem certeza que deseja excluir este prêmio?')) {
        premios.splice(index, 1);
        localStorage.setItem('premios', JSON.stringify(premios));
        listarPremios();
    }
}

function pesquisarCliente() {
    const input = document.getElementById('pesquisa').value.toLowerCase();
    const resultadoPesquisa = clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(input) || cliente.telefone.includes(input)
    );

    const membrosList = document.getElementById('membrosList');
    membrosList.innerHTML = '';

    resultadoPesquisa.forEach((cliente, index) => {
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

function atualizarDadosClientes() {
    document.querySelector('.clientes p:nth-child(2)').innerText = `${clientes.length} Cartões Cadastrados`;
    document.querySelector('.clientes p:nth-child(3)').innerText = `${clientes.filter(c => c.pontos > 0).length} Ativos`;
    document.querySelector('.clientes p:nth-child(4)').innerText = `${clientes.filter(c => c.pontos === 0).length} Cancelados`;

    const recorrentes = clientes.filter(c => c.pontos > 10).length;
    document.querySelector('.comportamento p:nth-child(2)').innerText = `${recorrentes} Clientes Recorrentes`;
    const ticketMedio = clientes.length > 0 ? (clientes.reduce((sum, cliente) => sum + cliente.pontos, 0) / clientes.length).toFixed(2) : 0;
    document.querySelector('.comportamento p:nth-child(3)').innerText = `R$ ${ticketMedio} Ticket Médio`;
}

function sair() {
    if (confirm('Tem certeza que deseja sair?')) {
        // Aqui você pode adicionar lógica para limpar dados da sessão, se necessário
        window.location.href = 'login.html'; // Redireciona para a página de login
    }
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

    document.getElementById('sairButton').addEventListener('click', sair);
});
