const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const heartContainer = document.querySelector('.heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

const perguntas = [
    {
        enunciado: "Você me ama?",
        alternativas: [
            {
                texto: "Muito",
                afirmacao: "Você me perguntou uma vez o por que eu te amava. Na hora eu não consegui dar uma resposta certa, então decidi colocar aqui. Eu te amo por tantos motivos, que vão de sua incrível personalidade, até seu lindo sorriso. Mas o motivo do qual você me fez me apaixonar, foi seu carinho, suas piadas e sua habilidade nata de me deixar envergonhado ou bobo sem se esforçar. Você é a pessoa da qual eu pretendo passar minha vida e a pessoa que abriu meus olhos. A pessoa que me mostrou um novo caminho e um novo motivo pra seguir em frente. Eu te amo muito, meu amor, e sempre vou amar."
            },
            {
                texto: "Não.",
                afirmacao: "Mor?"
            }
        ]
    },
];


let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;

        // Adicionar evento apenas para a alternativa "Não"
        if (alternativa.texto === "Não.") {
            botaoAlternativas.addEventListener("click", () => moveCaixaResposta(botaoAlternativas));
        } else {
            botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        }

        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.textContent = "Em um dia de inverno agitado, onde meu coração estava dividido... você me apareceu.";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
}

function moveCaixaResposta(caixaResposta) {
    const newPositionX = Math.random() * (window.innerWidth - caixaResposta.clientWidth);
    const newPositionY = Math.random() * (window.innerHeight - caixaResposta.clientHeight);

    caixaResposta.style.position = 'absolute';
    caixaResposta.style.left = newPositionX + 'px';
    caixaResposta.style.top = newPositionY + 'px';
}

mostraPergunta();
