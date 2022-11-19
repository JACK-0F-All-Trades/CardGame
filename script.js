const cards = document.querySelectorAll('.card');
let hasClicked = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasClicked) {
        hasClicked = true;
        firstCard = this;
        return;
    }
    hasClicked = false;
    secondCard = this;
    lockBoard = true;
    checkMatch();




}

function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        removeListner()
    } else {

        removeFlip()
    }
}

function removeListner() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    checkGameOver();
}

function removeFlip() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
        checkGameOver();
    }, 1000);
}
function resetBoard() {
    [hasClicked, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    })
})();
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    })
}

function removeFlipFromAll() {
    cards.forEach(card => {
        card.classList.remove('flip');
    })
}
function checkGameOver() {
    let checkArr = [];

    cards.forEach(card => {
        if (card.classList.contains('flip')) {
            checkArr.push(1);
        }
    })

    if (checkArr.length === 12) {
        setTimeout(() => {
            removeFlipFromAll();

            resetBoard();
            shuffle();
            cards.forEach(card => card.addEventListener('click', flipCard));
        }, 1500);

    }

}
cards.forEach(card => card.addEventListener('click', flipCard));



