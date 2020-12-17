'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

/* // Method 1
// Variable players
let currentPlayer1 = 0;
let currentPlayer2 = 0;

let contentPlayer1 = 0;
let contentPlayer2 = 0;

let number = 0;
document.querySelector('img').style.display = 'none';

// Function current
const playerActiveID = function () {
  return document.querySelector('.player--active').querySelector('h2').id;
};

const playerActiveAttribute = function (value, element) {
  document
    .querySelector('.player--active')
    .querySelector('.' + element).textContent = value;
};

const endRound = function () {
  const players = document.querySelectorAll('.player');
  for (let player of players) {
    player.classList.toggle('player--active');
  }
  number = 0;
};

const isWin = function (content) {
  if (content >= 100) {
    document.querySelector('.player--active').classList.add('player--winner');
  }
};

const isEnd = function () {
  return contentPlayer1 >= 100 || contentPlayer2 >= 100;
};

const hold = function () {
  if (isEnd() == false) {
    if (playerActiveID() === 'name--0') {
      contentPlayer1 += currentPlayer1;
      currentPlayer1 = 0;
      playerActiveAttribute(currentPlayer1, 'current-score');
      playerActiveAttribute(contentPlayer1, 'score');
      isWin(contentPlayer1);
      endRound();
    } else {
      contentPlayer2 += currentPlayer2;
      currentPlayer2 = 0;
      playerActiveAttribute(currentPlayer2, 'current-score');
      playerActiveAttribute(contentPlayer2, 'score');
      isWin(contentPlayer2);
      endRound();
    }
  }
};

// Roll Dice
document.querySelector('.btn--roll').addEventListener('click', () => {
  if (isEnd() == false) {
    const valueRandom = Math.floor(Math.random() * 6) + 1;
    document.querySelector('img').src = 'dice-' + valueRandom + '.png';
    number = valueRandom;
    document.querySelector('img').style.display = 'block';

    if (playerActiveID() === 'name--0') {
      currentPlayer1 += number;
      if (number === 1) {
        currentPlayer1 = 0;
        playerActiveAttribute(currentPlayer1, 'current-score');
        endRound();
      }
      playerActiveAttribute(currentPlayer1, 'current-score');
    } else {
      currentPlayer2 += number;
      if (number === 1) {
        currentPlayer2 = 0;
        playerActiveAttribute(currentPlayer2, 'current-score');
        endRound();
      }
      playerActiveAttribute(currentPlayer2, 'current-score');
    }
  }
});

// Hold
document.querySelector('.btn--hold').addEventListener('click', hold);

// New game
document.querySelector('.btn--new').addEventListener('click', () => {
  currentPlayer1 = 0;
  currentPlayer2 = 0;
  contentPlayer1 = 0;
  contentPlayer2 = 0;
  for (let e of document.querySelectorAll('.current-score')) e.textContent = 0;
  for (let e of document.querySelectorAll('.score')) e.textContent = 0;
  document.querySelector('.player--winner').classList.remove('player--winner');
  if (
    document.querySelector('.player--active').querySelector('h2').id ===
    'name--1'
  ) {
    endRound();
  }
});
*/
