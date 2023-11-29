let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0, 
};
scoreUpdate();

let isAutoPLaying = false;
let intervalId;

function autoPlay() {
    const autoPlayElem = document.querySelector('.autoplay-button');

    if (!isAutoPLaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPLaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPLaying = false
    }
    if (autoPlayElem.innerText === 'Auto Play') {
        autoPlayElem.innerHTML = 'Stop Playing';
        autoPlayElem.classList.add('is-autoplay');
    } else {
        autoPlayElem.innerHTML = 'Auto Play'
        autoPlayElem.classList.remove('is-autoplay');
    };
}

document.querySelector('.js-rock-butt').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-butt').addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-butt').addEventListener('click', () => {
    playGame('scissors');
});

function resetScore() {
    document.querySelector('.reset-button').addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        scoreUpdate();
    });
}

resetScore()

document.querySelector('.autoplay-button').addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('Scissors');
    } else if (event.key === 'spacebar') {
        resetScore();
    } else if (event.key === 'a') {
        autoPlay()
    }
});

function playGame(playerMove) {

    const comperMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
        if (comperMove === 'rock') {
            result = 'You lose';
        } else if (comperMove === 'paper') {
            result = 'You win';
        } else if (comperMove === 'scissors') {
            result = 'Tie';
        }

    } else if (playerMove === 'paper') {
        if (comperMove === 'rock') {
            result = 'You win';
        } else if (comperMove === 'paper') {
            result = 'Tie';
        } else if (comperMove === 'scissors') {
            result = 'You lose';
        }
        
    } else if (playerMove === 'rock') {
        if (comperMove === 'rock') {
            result = 'Tie';
        } else if (comperMove === 'paper') {
            result = 'You lose';
        } else if (comperMove === 'scissors') {
            result = 'You win';
        }
    }

    if (result === 'You win') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    scoreUpdate();

    document.querySelector('.result').innerHTML = result;

    document.querySelector('.moves').innerHTML = `You <img src="images/${playerMove} emoji.png" alt="" class="move-emoji">  <img src="images/${comperMove} emoji.png" alt="" class="move-emoji"> Computer`;
}

function scoreUpdate() {
    document.querySelector('.score-board').innerHTML = `Win: ${score.wins} losses: ${score.losses} Ties: ${score.ties}`;
};

function pickComputerMove() {
    const randomNumber = Math.random();

    let comperMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        comperMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        comperMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
        comperMove = 'scissors'
    }

    return comperMove; 
}