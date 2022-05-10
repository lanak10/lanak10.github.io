const pirateTerms = [
  "ahoy",
  "parrot",
  "adventure",
  "anchor",
  "sail",
  "plank",
  "attack",
  "telescope",
  "port",
  "bounty",
  "prisoner",
  "captain",
  "cannon",
  "nautical",
  "coins",
  "pegleg",
  "capture",
  "sword",
  "compass",
  "loot",
  "eyepatch",
  "gunpowder",
  "galley",
  "jewels",
  "conquest",
  "treasure",
  "masthead",
  "shipmate",
  "overboard",
  "floorboards",
  "lookout"
]

const resetbtn = document.getElementById('reset');
const newroundbtn = document.getElementById('newRound');const newGamebtn = document.getElementById('newGame');

let answer = " ";
let answerArray = []; // new array for guessed answers
let maxWrong = 5;
let mistakes = 0;
let wordStatus = null;
let player1 = 1;


// Pick a random word from the pirateTerms array
function randomWord() {
  answer = pirateTerms[Math.floor(Math.random() * pirateTerms.length)]
}
randomWord();

// Generate alphabet keyboard
function generateButtons() {
  let btnAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn-primary"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('alphabetKeyboard').innerHTML = btnAlphabet;
}
generateButtons();

document.getElementById('alphabetKeyboard').style.fontSize = "xx-large"



// Shows the # of letters in randomly generated word using underscores
function guessWord() {
  wordStatus = answer.split('').map(letter => (answerArray.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('randomWord').innerText = wordStatus;
}
guessWord(); // if this is commented out, word underscores disappear


// Clicked letters show up/push into randomly generated word
function handleGuess(clickedLetter) {
  answerArray.indexOf('clickedLetter') === -1 ? answerArray.push(clickedLetter) : null;
  document.getElementById(clickedLetter).setAttribute('disabled', true); // disables clicked button so you can't click on it more than once

  // alert(answer) // === delete later ====

  if (answer.indexOf(clickedLetter) >= 0) {
    guessWord();
    increaseScoreboard();
    winRound();
    gameWon();
    // increase mistake count by 1 if clickedLetter doesn't exist in the word
  } else if (answer.indexOf(clickedLetter) === -1) {
    mistakes += 1;
    displayMistakes();
    gameLost();
  }
}
// handleGuess();

const increaseScoreboard = () => {
  // const scoreHTML = document.querySelector(`#p${player1}-score-counter`);
  // console.dir(score);
  const score = document.querySelector(`#p${player1}-score-counter`);
  let count = Number(score.innerText);
  score.innerText = count + 1;
  // return score;
}


function swapPlayer() {
  document.querySelector(`.wrongScore${player1}`).classList.remove('newClass'); // shows whose turn it is using newClass CSS
  mistakes = 0;
  if (player1 < 2) {
    player1++;
  } else {
    player1--;
  }
  document.querySelector(`.wrongScore${player1}`).classList.add('newClass'); // shows whose turn it is using newClass CSS
}


function displayMistakes() {
  document.querySelector(`#mistakes${player1}`).innerText = mistakes;
  movePrisonerLeft()
}

function winRound() {
  if (wordStatus === answer) {
    document.getElementById('winlosetext').innerText = "Congrats you won this round!"
  }
}


function gameWon() {
  if (document.getElementById('p1-score-counter').innerText == 15) {
    document.getElementById('winlosetext').innerText = "Player 1, You win! You saved the prisoner's life!";
    // resetScoreboard();
  } else if (document.getElementById('p2-score-counter').innerText == 15) {
    document.getElementById('winlosetext').innerText = "Player 2, You win! You saved the prisoner's life!";
    // resetScoreboard();
  } 
}

// if Player 1 or Player 2 wins, new game button should return scoreboard to 0
function completeReset() {
  mistakes = 0;
  player1 = 2;
  document.querySelector(`#mistakes${player1}`).innerText = mistakes;
  resetGame();
  resetScoreboard();
  document.querySelector(`#mistakes${player1}`).innerText = mistakes;
}

function resetScoreboard() {
  document.getElementById('p1-score-counter').innerText = '0';
  document.getElementById('p2-score-counter').innerText = '0';
}
newGamebtn.addEventListener('click', completeReset);



function gameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('randomWord').innerText = "The answer was " + answer;
    document.getElementById('winlosetext').innerText = "Oh no!! You lost and the prisoner jumped off the plank into a pool of sharks"

  }
}

// Reset game using reset button
function resetGame() {
  answerArray = [];
  // randomWord(); // commenting out allows player 2 to attempt the same word
  guessWord();
  displayMistakes();
  mistakes = 0;
  generateButtons();
  document.getElementById('winlosetext').innerText = ''; 
  swapPlayer();
  displayMistakes(); // refresh current player's display
}
resetbtn.addEventListener('click', resetGame);


// New round using new word button
function newRound() {
  answerArray = [];
  randomWord();
  guessWord();
  mistakes = 0;
  displayMistakes(); 
  generateButtons();
  document.getElementById('winlosetext').innerText = ''; 
}
newroundbtn.addEventListener('click', newRound);

// Moving the prisoner left on the plank
const prisonerImg = document.getElementById('prisoner')

function movePrisonerLeft() {
  prisonerImg.style.right = `${10 * mistakes + 35}%`;
}


/* Position of Prisoner
35% - 0 mistakes (start)
45% - 1 
55% - 2
65% - 3
75% - 4
85% - 5 mistakes (edge of plank) */


// ===== EXTRA STUFF ATTEMPTED ===== //
// HOW TO INCORPORATE PLAYER 2??? 
/* const p2_increaseScoreboard = () => {
  const score = document.querySelector('#p2-score-counter').innerText;
  const scoreHTML = document.querySelector('#p2-score-counter');
  let count = Number(score);
  scoreHTML.innerText = count + 1;
} */

// trying to alternate players after 1 full round and maintain score on scoreboard. This just switches +1 point per correctly clicked letter
/* function increaseScore() {
  if (player1) {
    p1_increaseScoreboard()
    player1 = false;
  } else {
    p2_increaseScoreboard()
    player1 = true;
  }
} */

/* for (let i = 0; i < pirateTerms.length; i++){
  answerArray[i] = "_";
} */