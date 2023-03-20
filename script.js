'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('.score--0');
const score1El = document.querySelector('.score--1');
const currentScr0El = document.querySelector('.current--0');
const currentScr1El = document.querySelector('.current--1');
const diceEl = document.querySelector('.dice-img');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let playing, activePlayer, curerntScore, scores;

// Starting conditions
const init = function () {
  // --Reset States--
  // Reset values:
  playing = true;
  activePlayer = 0;
  curerntScore = 0;
  scores = [0, 0];
  // Reset Content:
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScr0El.textContent = 0;
  currentScr1El.textContent = 0;
  // Reset Style:
  diceEl.classList.add('hidden');
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('active-player-style');
  player1El.classList.remove('active-player-style');
};
const switchPlayer = function () {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  curerntScore = 0;
  // if 0 turn it to 1 and vice versa
  activePlayer ? (activePlayer = 0) : (activePlayer = 1);
  // Toggle style
  player0El.classList.toggle('active-player-style');
  player1El.classList.toggle('active-player-style');
};

init();

// Rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceNo = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNo}.png`;
    // 3. Check for rolled != 1
    if (diceNo !== 1) {
      curerntScore += diceNo;
      activePlayer
        ? (currentScr1El.textContent = curerntScore)
        : (currentScr0El.textContent = curerntScore);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += curerntScore;
    activePlayer
      ? (score1El.textContent = scores[activePlayer])
      : (score0El.textContent = scores[activePlayer]);
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      activePlayer
        ? player1El.classList.add('player-winner')
        : player0El.classList.add('player-winner');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
