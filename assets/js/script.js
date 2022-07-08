//#region Variables

// Array of question objects
var questionList = [
    {
        question: "",
        choices: [],
        answer: "",
    },
    {
        question: "",
        choices: [],
        answer: "",
    },
    {
        question: "",
        choices: [],
        answer: "",
    },
    {
        question: "",
        choices: [],
        answer: "",
    },
    {
        question: "",
        choices: [],
        answer: "",
    },
    {
        question: "",
        choices: [],
        answer: "",
    }
]

// Screens
var startScreen = querySelector("#start-screen");
var quizScreen = querySelector("#quiz-screen");
var resultsScreen = querySelector("#results-screen");
var highscoresScreen = querySelector("#highscores-screen");

// Elements
var timer = querySelector("#timer");
var timeLeft = querySelector("#timeLeft");
var highscoresLink = querySelector("#highscores-link");

var startButton = querySelector("#start-button");

var activeQuestion = querySelector("#question");
var activeAnswers = querySelector("#answers");
// <li><button></button></li>
var answerResult = querySelector("#answer-result");

var finalScore = querySelector("#final-score");
var initialsInput = querySelector("#initials-input");
var initialsButton = querySelector("#initials-button");

var highscores = querySelector("#highscores");
var backButton = querySelector("#back-button");
var clearHighscoresBtn = querySelector("#clear-highscores-button");

//#endregion

//#region Functions

// Starts quiz, switching screens and starting timer
function startQuiz() {

}

// Starts timer countdown
function startTimer(time) {

}

// Switches screens (display: none on rest of screens)
function switchScreen(screen) {

}

// Checks answer given and handles result
function checkAnswer(answer) {

}

// Dynamically generates the answer buttons based off how many choices are defined for a question
// Adds event listener for each button (and clears after an answer is given)
function generateAnswers(question) {

}

// Renders highscores if any are saved in local storage
function renderHighscores() {

}

//#endregion

//#region Event listeners

document.addEventListener("DOMContentLoaded", renderHighscores);

// Start quiz button

// Highscores link

// Go back button

// Clear highscores

//#endregion

