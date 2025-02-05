document.addEventListener('DOMContentLoaded' , () => {

    const cards = document.querySelectorAll('.card-container');
    const resetBtn  = document.getElementById('reset-btn');
    const result = document.getElementById('result-container');
    const cardsOuterBox = document.querySelectorAll('.box-container');

    let hasFlipCard = false;
    let lockBoard = false;
    let trackMatching = 0,totalMoves = 0;
    let firstCard , secondCard;

    function flipCard () {
        if(lockBoard) return;

        if(this === firstCard) return;

        this.classList.add('flip');

        if(!hasFlipCard) {
            firstCard = this;
            hasFlipCard = true;
        }
        else {
            secondCard = this;
            hasFlipCard = false;

            checkForMatch();
        }
        totalMoves++;
    }

    function checkForMatch() {
        if(firstCard.dataset.emoji === secondCard.dataset.emoji) {
            trackMatching = (trackMatching < 7) ? trackMatching + 1 : showcaseResult();

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        }
        else {
            lockBoard = true;

            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                lockBoard = false;
            },1200)
        }
    }

    cards.forEach(card => card.addEventListener('click' , flipCard));
    
    function resetGame() {
        result.classList.add('hidden');
        cardsOuterBox.forEach(box => {
            box.classList.remove('hidden');
        })
        cards.forEach(card => {
            card.classList.remove('flip');

            card.removeEventListener('click' ,flipCard);

            card.addEventListener('click',flipCard);
        });

        [hasFlipCard,lockBoard] = [false,false];
        [firstCard,secondCard] = [null,null];
        [trackMatching,totalMoves] = [0,0];

    }

    (function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        });
    })();

    function showcaseResult() {
        setTimeout(() => {
            result.classList.remove('hidden');
            cardsOuterBox.forEach(box => {
                box.classList.add('hidden');
        });
            result.innerHTML = `<h3>🥳You win!🥳</h3> <p>Total Moves:${totalMoves}</p>`;
       },1500);
    }

    resetBtn.addEventListener('click' , resetGame);
});