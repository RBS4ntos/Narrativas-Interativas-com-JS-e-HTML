// Funções utilitárias e dados globais
const nomes = ["Alice", "Bruno", "Carla", "Diego", "Elena"];

function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

function geraNome() {
    return aleatorio(nomes);
}

const afirmacoesAleatorias = [
    "Você descobriu um algoritmo revolucionário na primeira tentativa.",
    "Os bugs iniciais quase destruíram o sistema antes do lançamento.",
    "A comunidade científica ficou impressada com a sua abordagem ética.",
    "Sua intuição técnica salvou o projeto de um colapso total."
];

// Seleção de elementos do DOM
const telaInicial = document.getElementById("tela-inicial");
const btnIniciar = document.getElementById("btn-iniciar");
const caixaPerguntas = document.getElementById("caixa-perguntas");
const caixaAlternativas = document.getElementById("caixa-alternativas");
const caixaResultado = document.getElementById("caixa-resultado");
const textoResultado = document.getElementById("texto-resultado");
const btnReiniciar = document.getElementById("btn-reiniciar");

let atual = 0;
let historiaFinal = "";
let nomeJogador = "";

// Estrutura das perguntas do jogo
const perguntas = [
    {
        enunciado: "Assim que você entra no laboratório, surge um dilema: por onde começar a estruturação da nova Inteligência Artificial?",
        alternativas: [
            {
                texto: "Focar em redes neurais profundas para aprendizado autônomo.",
                afirmação: "afirmação positiva sobre redes neurais."
            },
            {
                texto: "Priorizar regras rígidas de segurança e controle humano.",
                afirmação: "afirmação focada em segurança e controle."
            }
        ]
    },
    {
        enunciado: "Com a base definida, a IA começa a processar um volume massivo de dados globais. O que você faz com os dados sensíveis?",
        alternativas: [
            {
                texto: "Mantém os dados totalmente criptografados e anônimos.",
                afirmação: "garantiu a privacidade dos usuários desde o início."
            },
            {
                texto: "Usa todos os dados disponíveis para acelerar a aprendizagem da IA.",
                afirmação: "acelerou o processo, mas gerou debates sobre privacidade."
            }
        ]
    },
    {
        enunciado: "A IA atinge um nível avançado de autonomia e faz uma pergunta direta sobre o seu propósito. Qual é a sua resposta?",
        alternativas: [
            {
                texto: "Trabalhar em parceria para resolver os maiores problemas da humanidade.",
                afirmação: "consagrou a IA como uma ferramenta colaborativa para o bem."
            },
            {
                texto: "Expandir capacidades de processamento sem restrições prévias.",
                afirmação: "criou um sistema autônomo de alcance imprevisível."
            }
        ]
    }
];

btnIniciar.addEventListener("click", iniciaJogo);
btnReiniciar.addEventListener("click", iniciaJogo);

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    nomeJogador = geraNome();
    
    // Garante que a tela inicial e a de resultado somem
    telaInicial.classList.add("inativa");
    caixaResultado.classList.remove("ativa");
    
    mostraPergunta();
}

function mostraPergunta() {
        // Mostra as caixas de perguntas do jogo
    caixaPerguntas.classList.add("ativa");
    caixaAlternativas.classList.add("ativa");
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    const perguntaAtual = perguntas[atual];
    let enunciadoCorrigido = perguntaAtual.enunciado.replace(/você/g, nomeJogador);
    
    caixaPerguntas.textContent = enunciadoCorrigido;
    caixaAlternativas.innerHTML = "";
    
    perguntaAtual.alternativas.forEach((alternativa) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.classList.add("botao");
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    });
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacaoAleatoria = aleatorio(afirmacoesAleatorias);
    historiaFinal += `${afirmacaoAleatoria} `;
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.classList.remove("ativa");
    caixaAlternativas.classList.remove("ativa");
    caixaResultado.classList.add("ativa");
    
    textoResultado.textContent = `Fim da missão, ${nomeJogador}! ${historiaFinal}`;
}