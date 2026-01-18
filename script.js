/* =========================
   BANCO DE QUESTÕES (BASE)
   ========================= */

const bancoQuestoes = {
    portugues: [],
    matematica: [],
    raciocinio: [],
    quimica: [],
    operacao: [],
    seguranca: [],
    eletrotecnica: []
};

/* =========================
   CONFIGURAÇÃO DE SIMULADOS
   ========================= */

const configSimulados = {
    portugues: 20,
    matematica: 20,
    raciocinio: 40,
    quimica: 40,
    operacao: 50,
    seguranca: 40,
    eletrotecnica: 40
};

/* =========================
   VARIÁVEIS DE CONTROLE
   ========================= */

let disciplinaAtual = "";
let questaoAtual = 0;
let acertos = 0;
let respostasUsuario = [];

/* =========================
   INICIAR SIMULADO
   ========================= */

function iniciarSimulado(disciplina) {
    disciplinaAtual = disciplina;
    questaoAtual = 0;
    acertos = 0;
    respostasUsuario = [];

    const total = configSimulados[disciplina];
    alert(`Simulado iniciado: ${disciplina.toUpperCase()} | ${total} questões`);

    mostrarQuestao();
}

/* =========================
   MOSTRAR QUESTÃO
   ========================= */

function mostrarQuestao() {
    const questoes = bancoQuestoes[disciplinaAtual];
    const container = document.getElementById("simulado");

    if (!container) return;

    if (questaoAtual >= configSimulados[disciplinaAtual]) {
        finalizarSimulado();
        return;
    }

    const q = questoes[questaoAtual];

    container.innerHTML = `
        <h3>Questão ${questaoAtual + 1}</h3>
        <p>${q.pergunta}</p>

        ${q.alternativas.map((alt, i) => `
            <label>
                <input type="radio" name="resposta" value="${i}">
                ${alt}
            </label><br>
        `).join("")}

        <button onclick="responder()">Responder</button>
    `;
}

/* =========================
   RESPONDER QUESTÃO
   ========================= */

function responder() {
    const selecionada = document.querySelector('input[name="resposta"]:checked');
    if (!selecionada) {
        alert("Selecione uma alternativa.");
        return;
    }

    const resposta = parseInt(selecionada.value);
    const correta = bancoQuestoes[disciplinaAtual][questaoAtual].correta;

    respostasUsuario.push(resposta);

    if (resposta === correta) {
        acertos++;
    }

    questaoAtual++;
    mostrarQuestao();
}

/* =========================
   FINALIZAR SIMULADO
   ========================= */

function finalizarSimulado() {
    const total = configSimulados[disciplinaAtual];
    const nota = ((acertos / total) * 100).toFixed(1);

    salvarResultado(disciplinaAtual, nota);

    document.getElementById("simulado").innerHTML = `
        <h2>Simulado Finalizado</h2>
        <p>Disciplina: <strong>${disciplinaAtual.toUpperCase()}</strong></p>
        <p>Acertos: ${acertos} de ${total}</p>
        <p>Nota final: <strong>${nota}%</strong></p>
    `;
}

/* =========================
   SALVAR RESULTADO
   ========================= */

function salvarResultado(disciplina, nota) {
    let historico = JSON.parse(localStorage.getItem("resultados")) || [];
    historico.push({
        disciplina: disciplina,
        nota: nota,
        data: new Date().toLocaleDateString()
    });

    localStorage.setItem("resultados", JSON.stringify(historico));
}

/* =========================
   VER DESEMPENHO
   ========================= */

function verDesempenho() {
    const historico = JSON.parse(localStorage.getItem("resultados")) || [];
    let html = "<h2>Meu Desempenho</h2>";

    if (historico.length === 0) {
        html += "<p>Nenhum simulado realizado.</p>";
    } else {
        historico.forEach(r => {
            html += `<p>${r.data} - ${r.disciplina.toUpperCase()} : ${r.nota}%</p>`;
        });
    }

    document.getElementById("simulado").innerHTML = html;
}
{
    pergunta: "Texto claro e objetivo da questão",
    alternativas: [
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D",
        "Alternativa E"
    ],
    correta: 0 // índice da alternativa correta (0 a 4)
}

bancoQuestoes.portugues.push(
    {
        pergunta: "Em textos técnicos, a linguagem predominante deve ser:",
        alternativas: [
            "Subjetiva e emocional",
            "Ambígua e figurada",
            "Clara e objetiva",
            "Informal e coloquial",
            "Poética e conotativa"
        ],
        correta: 2
    },
    {
        pergunta: "Assinale a frase com uso correto da crase:",
        alternativas: [
            "Entregou o relatório à gerente",
            "Chegou a à refinaria",
            "Dirigiu-se à à empresa",
            "Foi a à operação",
            "Saiu a noite"
        ],
        correta: 0
    }
)
bancoQuestoes.matematica.push(
    {
        pergunta: "Um operador trabalha 8 horas por dia. Em 5 dias, ele trabalha quantas horas?",
        alternativas: ["30", "35", "40", "45", "50"],
        correta: 2
    },
    {
        pergunta: "Se 25% de um valor é 50, o valor total é:",
        alternativas: ["150", "180", "200", "220", "250"],
        correta: 2
    }
)

bancoQuestoes.raciocinio.push(
    {
        pergunta: "Complete a sequência: 3, 6, 12, 24, ?",
        alternativas: ["30", "36", "42", "48", "60"],
        correta: 3
    },
    {
        pergunta: "Se todo técnico é treinado e Ana é técnica, então:",
        alternativas: [
            "Ana não é treinada",
            "Ana pode não ser treinada",
            "Ana é treinada",
            "Nenhum técnico é treinado",
            "Ana é supervisora"
        ],
        correta: 2
    }
)

bancoQuestoes.quimica.push(
    {
        pergunta: "Qual propriedade da matéria está relacionada à resistência à deformação?",
        alternativas: [
            "Elasticidade",
            "Dureza",
            "Densidade",
            "Condutividade",
            "Solubilidade"
        ],
        correta: 1
    },
    {
        pergunta: "O petróleo é classificado como:",
        alternativas: [
            "Substância pura",
            "Mistura homogênea",
            "Mistura heterogênea",
            "Composto químico",
            "Elemento químico"
        ],
        correta: 1
    }
)

bancoQuestoes.operacao.push(
    {
        pergunta: "A destilação fracionada do petróleo baseia-se na diferença de:",
        alternativas: [
            "Densidade",
            "Viscosidade",
            "Ponto de ebulição",
            "Cor",
            "Pressão"
        ],
        correta: 2
    },
    {
        pergunta: "O downstream da indústria do petróleo está relacionado a:",
        alternativas: [
            "Exploração",
            "Produção",
            "Refino e distribuição",
            "Perfuração",
            "Pesquisa sísmica"
        ],
        correta: 2
    }
)

bancoQuestoes.seguranca.push(
    {
        pergunta: "A NR-33 trata de:",
        alternativas: [
            "Trabalho em altura",
            "Espaços confinados",
            "Inflamáveis",
            "Eletricidade",
            "Máquinas"
        ],
        correta: 1
    },
    {
        pergunta: "O principal objetivo da análise de riscos é:",
        alternativas: [
            "Punir trabalhadores",
            "Aumentar custos",
            "Prevenir acidentes",
            "Eliminar EPIs",
            "Reduzir produtividade"
        ],
        correta: 2
    }
)
bancoQuestoes.eletrotecnica.push(
    {
        pergunta: "A unidade de medida da corrente elétrica é:",
        alternativas: ["Volt", "Ohm", "Ampère", "Watt", "Joule"],
        correta: 2
    },
    {
        pergunta: "Um dispositivo utilizado para proteção contra sobrecorrente é:",
        alternativas: [
            "Transformador",
            "Disjuntor",
            "Resistor",
            "Capacitor",
            "Motor"
        ],
        correta: 1
    }
);









