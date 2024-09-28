let clientes = [];
let premios = [];

function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    const isHidden = section.classList.contains('hidden');

    // Esconde todas as seções dinâmicas
    document.querySelectorAll('.dynamic-section').forEach(s => {
        s.classList.add('hidden');
        s.style.display = 'none';
    });

    if (isHidden) {
        // Se a seção estava escondida, mostra ela
        section.style.display = 'block';
        section.classList.remove('hidden');

        const button = document.querySelector(`.button[data-section="${sectionId}"]`);
        const offsetTop = button ? button.offsetTop + button.offsetHeight + 10 : 0;
        section.style.top = `${offsetTop}px`;
    }
    // Se a seção não estava escondida, ela permanecerá escondida
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
        pontos: 0,
        historicoPontos: []
    };

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    alert('Cliente cadastrado com sucesso!');
    document.getElementById('cadastroForm').reset();
    atualizarDashboard();
    listarMembros();
}

function listarMembros() {
    const membrosList = document.getElementById('membrosList');
    membrosList.innerHTML = '';

    // Ordena os clientes por nome em ordem alfabética
    const clientesOrdenados = clientes.sort((a, b) => a.nome.localeCompare(b.nome));

    clientesOrdenados.forEach((cliente, index) => {
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

    pontos = parseInt(pontos);
    clientes[index].pontos += pontos;
    clientes[index].historicoPontos.push({
        data: new Date().toISOString(),
        pontos: pontos
    });
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listarMembros();
    atualizarDashboard();
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

    // Ordena os resultados da pesquisa por nome
    resultadoPesquisa.sort((a, b) => a.nome.localeCompare(b.nome));

    const resultadoDiv = document.getElementById('resultadoPesquisa');
    resultadoDiv.innerHTML = '';

    if (resultadoPesquisa.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum cliente encontrado.</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Pontos</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        resultadoPesquisa.forEach((cliente) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.pontos}</td>
                <td>
                    <button onclick="adicionarPontos(${clientes.indexOf(cliente)})">Adicionar Pontos</button>
                    <button onclick="resgatarPremio(${clientes.indexOf(cliente)})">Resgatar</button>
                </td>
            `;
            table.querySelector('tbody').appendChild(tr);
        });

        resultadoDiv.appendChild(table);
    }
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

function atualizarDadosVendas() {
    const agora = new Date();
    const ontem = new Date(agora.getTime() - 24 * 60 * 60 * 1000);
    
    // Calcular pontos adicionados nas últimas 24 horas
    const novasPontos = clientes.reduce((total, cliente) => {
        const ultimaPontuacao = cliente.historicoPontos ? cliente.historicoPontos.find(h => new Date(h.data) > ontem) : null;
        return total + (ultimaPontuacao ? ultimaPontuacao.pontos : 0);
    }, 0);

    // Calcular clientes que podem resgatar prêmios
    const premiadas = clientes.filter(cliente => 
        premios.some(premio => cliente.pontos >= premio.pontos)
    ).length;

    // Calcular clientes próximos a bonificar
    const proximoBonificar = clientes.filter(cliente => {
        const menorPremio = Math.min(...premios.map(p => p.pontos));
        return cliente.pontos > menorPremio - 10 && cliente.pontos < menorPremio;
    }).length;

    document.getElementById('novas-vendas').textContent = novasPontos;
    document.getElementById('premiadas').textContent = premiadas;
    document.getElementById('proximo-bonificar').textContent = proximoBonificar;
}

function atualizarPerfilCliente() {
    const total = clientes.length;
    const homens = clientes.filter(c => c.sexo === 'masculino').length;
    const mulheres = clientes.filter(c => c.sexo === 'feminino').length;
    const outros = total - homens - mulheres;

    const percentualHomens = ((homens / total) * 100).toFixed(2);
    const percentualMulheres = ((mulheres / total) * 100).toFixed(2);
    const percentualOutros = ((outros / total) * 100).toFixed(2);

    document.getElementById('percentual-homens').textContent = `${percentualHomens}%`;
    document.getElementById('percentual-mulheres').textContent = `${percentualMulheres}%`;
    document.getElementById('percentual-outros').textContent = `${percentualOutros}%`;
}

function atualizarDashboard() {
    atualizarDadosClientes();
    atualizarDadosVendas();
    atualizarPerfilCliente();
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
    atualizarDashboard();

    document.getElementById('sairButton').addEventListener('click', sair);

    // Adiciona event listeners para os botões das abas
    document.querySelectorAll('.dashboard-buttons .button').forEach(button => {
        button.addEventListener('click', (e) => {
            const sectionId = e.target.getAttribute('data-section');
            showSection(sectionId);
        });
    });
});