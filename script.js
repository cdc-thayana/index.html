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
