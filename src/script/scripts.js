const board = document.getElementById('gameBoard');
let score = 0;
const scoreElement = document.getElementById('score');

// Lista de 14 pares
const cardsArray = [
    { name: 'pikachu', img: './src/ima/pikachu.png' },
    { name: 'charmander', img: './src/img/charmander.png' },
    { name: 'bulbasaur', img: './src/img/bulbasaur.png' },
    { name: 'squirtle', img: './src/img/squirtle.png' },
    { name: 'eevee', img: './src/img/eevee.png' },
    { name: 'meowth', img: './src/img/meowth.png' },
    { name: 'jigglypuff', img: './src/img/jigglypuff.png' },
    { name: 'psyduck', img: './src/img/psyduck.png' },
    { name: 'snorlax', img: './src/img/snorlax.png' },
    { name: 'gengar', img: './src/img/gengar.png' },
    { name: 'dragonite', img: './src/img/dragonite.png' },
    { name: 'mewtwo', img: './src/img/mewtwo.png' },
    { name: 'abra', img: './src/img/abra.png' },
    { name: 'pidgey', img: './src/img/pidgey.png' }
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

function updateScore(points) {
    score += points;
    if (score < 0) score = 0;
    scoreElement.textContent = score;
}

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

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        updateScore(10);
    } else {
        unflipCards();
        updateScore(-2);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1200);
}

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
