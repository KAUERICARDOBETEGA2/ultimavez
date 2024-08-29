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
        enunciado: "Quer Ler??",
        alternativas: [
            {
                texto: "Sim",
                afirmacao: " Olha, eu nunca fui muito bom com essas coisas sinceramente. Eu sempre te admirei muito. Você é uma pessoa incrível além de muito divertida, e te importunar diariamente é mais um modo de achar algo pra puxar papo do que te irritar(mesmo sendo estranhamente divertido). Nunca fui muito bom em conversar, então na maioria das vezes eu sempre fico meio quieto só olhando as outras pessoas conversando. Enfim, fiz esse site na verdade não como um presente de aniversário (o de verdade vou entregar semana que vem), e mais sim como uma declaração. Eu gosto muito de você. Não apenas como um amigo prócimo que eu gosto de irritar, e sim alguem que eu iria querer pra vida. Não precisa responder a isso, até porque se respondesse eu ia demorar muito pra conseguir olhar no seu rosto denovo. Eu tenho certeza disso porque eu gosto de você faz muito tempo, desde aquele tempo que eu usava meu cabelo no rosto. O ponto principal disso tudo é: Feliz aniversário atrasado. Gosto muito de você e espero que você não fique esquisito depois dessa vergonhera que eu fiz."
            },
            {
                texto: "Não.",
                afirmacao: "Seubosta"
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
    caixaPerguntas.textContent = "Feliz aniversário!";
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
