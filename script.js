const pirateTerms = [
    "ahoy",
    "adventure",
    "anchor",
    "attack",
    "bounty",
    "prisoner",
    "captain",
    "cannon",
    "capture",
    "compass",
    "eyepatch",
    "gunpowder",
    "galley",
    "jewels",
    "treasure",
    "masthead",
    "shipmate",
    "floorboards",
    "lookout"
]

const resetbtn = document.getElementById('reset');

let answer = " ";
let answerArray = []; // new array for guessed answers
let maxWrong = 7;
let mistakes = 0;
// let wordStatus = null;

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

/* for (let i = 0; i < landmarks.length; i++){
    answerArray[i] = "_";
} */

// Shows the # of letters in randomly generated word using underscores
function guessedWord() {
    wordStatus = answer.split('').map(letter => (answerArray.indexOf(letter) >= 0 ? letter : " _ ")).join('');


    document.getElementById('randomWord').innerText = wordStatus;
}
guessedWord(); // if this is commented out, word underscored disappears

wordStatus2 = answer.split('').map(letter => (answerArray.indexOf(letter) >= 0 ? letter : " _ ")).join('');

// Clicked letters show up/push into randomly generated word
function handleGuess(clickedLetter) {
  answerArray.indexOf('clickedLetter') === -1 ? answerArray.push(clickedLetter) : null;
  document.getElementById(clickedLetter).setAttribute('disabled', true); // disables clickedLetter so you can't click on it more than once

  alert(answer)

  if(answer.indexOf(clickedLetter) >= 0) {
    guessedWord();
    increaseScoreboard(); // how to alternate between P1 and P2?
    gameWon();
    // increase mistake count by 1 if clickedLetter doesn't exist in the word
  } else if (answer.indexOf(clickedLetter) === -1) {
    mistakes += 1; 
    increaseMistakes();
    gameLost();
  }
}
// handleGuess();

const increaseScoreboard = () => {
  const score = document.querySelector('#p1-score-counter').innerText;
  const scoreHTML = document.querySelector('#p1-score-counter');
  let count = Number(score);
  scoreHTML.innerText = count + 1;
}

function increaseMistakes() {
  document.getElementById('mistakes').innerText = mistakes;
}

function gameWon() {
  if(wordStatus === answer) { // Or if player gets 10 points?
    document.getElementById('winlosetext').innerText = "Congrats you won! You saved the prisoner's life!"
  }
}

function gameLost() {
  if(mistakes === maxWrong) {
    document.getElementById('randomWord').innerText = "The answer was " + answer;
    document.getElementById('winlosetext').innerText = "Oh no!! You lost and the prisoner jumped off the plank into a pool of sharks"
  }
}

function resetGame() {
  mistakes = 0;
  answerArray = [];
  randomWord();
  guessedWord();
  increaseMistakes();
  generateButtons();
  document.getElementById('winlosetext').innerText = ''; // reset winlosetext
}
resetbtn.addEventListener('click', resetGame);

// Shows maximum # of wrong guesses
document.getElementById('maxWrong').innerText = maxWrong