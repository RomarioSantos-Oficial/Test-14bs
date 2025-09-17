const board = document.getElementById('gameBoard'); 
let score = 100; // Pontuação inicial
const scoreElement = document.getElementById('score');
const audioWin = new Audio('./src/sons/01.mp3'); // Áudio de acerto

// Lista de 14 pares
const cardsArray = [
    { name: 'sandrewpendrive', img: './src/img/sandrewpendrive.png' },
    { name: 'chikorita', img: './src/img/chikorita.png' },
    { name: 'machop', img: './src/img/machop.png' },
    { name: 'pikachu', img: './src/img/pikachu.png' },
    { name: 'gengar', img: './src/img/gengar.png' },
    { name: 'clefa', img: './src/img/clefa.png' },
    { name: 'jigglypuff', img: './src/img/jigglypuff.png' },
    { name: 'dragonite', img: './src/img/dragonite.png' },
    { name: 'scizor', img: './src/img/scizor.png' },
    { name: 'totodile', img: './src/img/totodile.png' },
    { name: 'togepi', img: './src/img/togepi.png' },
    { name: 'electrod', img: './src/img/electrod.png' },
    { name: 'pikachucontrole', img: './src/img/pikachucontrole.png' },
    { name: 'articuno', img: './src/img/articuno.png' }
];

// Duplicar pares
let gameCards = [...cardsArray, ...cardsArray];

// Embaralhar
gameCards.sort(() => 0.5 - Math.random());

// Gerar cartas no tabuleiro
gameCards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card.name;

    cardElement.innerHTML = `
        <img src="${card.img}" alt="${card.name}" class="card-front">
        <img src="./src/img/costa-de-carta-pokemon.png" alt="verso da carta" class="card-back">
    `;

    board.appendChild(cardElement);
});

// ==================== LÓGICA DO JOGO ====================
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// Atualizar pontuação
function updateScore(points) {
    score += points;
    if (score < 0) score = 0;
    scoreElement.textContent = score;
}

// Virar carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

// Checar pares
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        updateScore(10); // +10 pontos
        audioWin.currentTime = 0;
        audioWin.play(); // tocar áudio ao acertar par
        checkWin(); // verifica se todas cartas foram encontradas
    } else {
        unflipCards();
        updateScore(-2); // -2 pontos
    }
}

// Desabilitar cartas acertadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Virar cartas erradas
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1200);
}

// Reset do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Ativar clique nas cartas
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', flipCard);
});

// Botão de reset
document.getElementById('reset').addEventListener('click', () => {
    location.reload();
});

// Verificar vitória
function checkWin() {
    const flippedCards = document.querySelectorAll('.card.flip');
    if (flippedCards.length === gameCards.length) {
        setTimeout(() => {
            alert(`Parabéns! Você completou o jogo com ${score} pontos!`);
        }, 500);
    }
}
// controle de voulume:

    const bgm = document.getElementById('bgm');
    bgm.volume = 0.1; // Defina o volume para 10%
    bgm.play();
