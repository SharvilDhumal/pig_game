'use strict';

// Selecting elements-->
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
// # is use to select an id. instead use getElementById because it is faster..
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// score0EL.textContent = 0;
// score1EL.textContent = 0;
// diceEL.classList.add('hidden');

// const scores = [0, 0];
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true;

// Declared Variables outside the function (global Declaration ) to use in the function.
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];  // Removed const here
    currentScore = 0;
    activePlayer = 0;//Initially active player is player 1..
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');

    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};

init();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //  swith to next player!.
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}




// Rolling Dice functionality-->

btnRoll.addEventListener('click', function () {

    if (playing) {
        // 1. Generating a random dice roll.
        const dice = Math.trunc(Math.random() * 6) + 1;
        // console.log(dice);

        // 2. Display dice.
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        // 3. check for rolled === 1 .
        if (dice !== 1) {
            // Add the dice to current score.
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // switch to next player -->
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player score.
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // finish the game
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // switch to next player 
            switchPlayer();
        }
    }
});


btnNew.addEventListener('click', init);

