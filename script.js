'use strict';

// selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// starting conditions
let currentPlayer, currentScore, scores, isPlaying;
function init() {
  currentPlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

function changePlayer() {
  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;
  // switch to next player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  const player = document.querySelector(`.player--${currentPlayer}`);
  player.classList.add('player--active');
}

btnRoll.addEventListener('click', function () {
  if (!isPlaying) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    changePlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!isPlaying) return;
  const currentScoreEl = document.getElementById(`score--${currentPlayer}`);
  scores[currentPlayer] += currentScore;
  currentScoreEl.textContent = scores[currentPlayer];
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  if (scores[currentPlayer] >= 100) {
    isPlaying = false;
    // player wins
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
  } else {
    changePlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});
