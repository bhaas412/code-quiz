//#region Variables

// Array of question objects
var questionList = [
    {
        question: "Which HTML element is used to embed client-side JavaScript?",
        choices: ["<javascript>", "<code>", "<script>", "<js>"],
        answer: "<script>",
    },
    {
        question: "Which is not a valid way to create a JavaScript function?",
        choices: ["function myFunction()", "const myFunction = function()", "function = myFunction()"],
        answer: "function = myFunction()",
    },
    {
        question: "JavaScript is ________ language.",
        choices: ["a client-side", "a server-side", "both a client-side and server-side", "neither a client-side nor server-side"],
        answer: "both a client-side and server-side",
    },
    {
        question: "What is the value of the variable x after executing the following JavaScript code? var x = ((2 < 1) || (3 <= 3));",
        choices: ["True", "False", "Undefined", "The code will error and not execute"],
        answer: "True",
    },
    {
        question: "The Event.preventDefault() method in JavaScript is used to help prevent what?",
        choices: ["Trickling", "Default function parameters", "Bubbling"],
        answer: "Bubbling",
    },
    {
        question: "Is JavaScript cool?",
        choices: ["Yes (correct answer)", "No", "Meh"],
        answer: "Yes (correct answer)",
    }
]

// Global variables
var questionIdx = 0;
var currentScore = 0;
var time = 50;
var activeTimer;

// Screens
var startScreen = document.querySelector("#start-screen");
var quizScreen = document.querySelector("#quiz-screen");
var resultsScreen = document.querySelector("#results-screen");
var highScoresScreen = document.querySelector("#high-scores-screen");

// Elements
var timer = document.querySelector("#timer");
var timeLeft = document.querySelector("#time-left");
var highScoresLink = document.querySelector("#high-scores-link");

var startButton = document.querySelector("#start-button");

var activeQuestion = document.querySelector("#question");
var activeAnswers = document.querySelector("#answers");
var answerResult = document.querySelector("#answer-result");

var score = document.querySelector("#score");
var initialsInput = document.querySelector("#initials-input");
var initialsButton = document.querySelector("#initials-button");

var highScores = document.querySelector("#high-scores");
var backButton = document.querySelector("#back-button");
var clearHighScoresBtn = document.querySelector("#clear-high-scores-button");

//#endregion

//#region Functions

// Starts quiz, switching screens and starting timer
function startQuiz(event) {
    event.preventDefault();

    // Reset global variables to defaults upon starting quiz
    questionIdx = 0;
    currentScore = 0;
    time = 50;

    switchScreen(quizScreen);

    startTimer();

    // The next question is generated recursively in checkAnswer (which is event-driven when you choose an answer)
    generateQuestion(questionIdx);
}

// Starts timer countdown and generates questions
function startTimer() {
    activeTimer = setInterval(function () {
        time--;
        timeLeft.textContent = time;

        if ((time <= 0) || (questionIdx >= questionList.length)) {
            // Game over
            clearInterval(activeTimer);
            switchScreen(resultsScreen);
            score.innerHTML = "Your final score is <b>" + currentScore + "</b>!";
        }

    }, 1000);
}

// Switches screens (display: none on rest of screens)
function switchScreen(screen) {
    startScreen.style.display = "none";
    quizScreen.style.display = "none";
    resultsScreen.style.display = "none";
    highScoresScreen.style.display = "none";

    screen.style.display = "block";
}

// Generate question
function generateQuestion(index) {
    // Clear previous question/answer choices if they exist
    activeQuestion.innerHTML = "";
    activeAnswers.innerHTML = "";
    answerResult.textContent = "";


    // Generate question and corresponding answer choices
    activeQuestion.textContent = "(" + (index+1) + "/" + questionList.length + ") " + questionList[index].question;
    generateChoices();
}

// Dynamically generates the answer buttons based off how many choices are defined for a question
// Adds event listener for each button (with event delegation to parent) and clears after an answer is given
function generateChoices() {
    for (let i = 0; i < questionList[questionIdx].choices.length; i++) {
        var li = document.createElement("li");
        li.textContent = (i+1) + ". ";
        var button = document.createElement("button");
        button.setAttribute("data-answer", i);
        button.textContent = questionList[questionIdx].choices[i];
        li.appendChild(button);
        activeAnswers.appendChild(li);
    }
}

// Checks answer given and handles result
function checkAnswer(event) {
    event.preventDefault();

    var answer = event.target.textContent;
    if (questionList[questionIdx].answer == answer) {
        answerResult.innerHTML = "<hr>Correct!";
        currentScore++;
    } else {
        answerResult.innerHTML = "<hr>Incorrect! 10 seconds have been subtracted from the clock!";
        time = time - 10;
    }

    setTimeout(function() {
        questionIdx++;
        generateQuestion(questionIdx);
    }, 1000)
}

// Renders high scores if any are saved in local storage
function renderHighScores() {
    // Go to high scores screen and clear the previously rendered high scores list
    highScores.innerHTML = "";

    var savedHighScores = localStorage.getItem("highScores");

    if (savedHighScores) {
        highScoreList = JSON.parse(savedHighScores);

        for (let i = 0; i < highScoreList.length; i++) {
            var highScoreEntry = document.createElement("p");
            highScoreEntry.innerHTML = (i+1) + ". " + highScoreList[i].initials + " - " + highScoreList[i].highScore;
            highScores.appendChild(highScoreEntry);
        }
    } else {
        // No high scores
    }
}

// Saves high score in local storage
function storeHighScore() {
    var myHighScore = {
        initials: initialsInput.value,
        highScore: currentScore
    };
    var savedHighScores = localStorage.getItem("highScores");
    var highScoreList = [];
    
    if (savedHighScores) {
        highScoreList = JSON.parse(savedHighScores);
    }

    highScoreList.push(myHighScore);

    localStorage.setItem("highScores", JSON.stringify(highScoreList));

    renderHighScores();
}

// Deletes high scores from local storage
function clearHighScores() {
    localStorage.removeItem("highScores");
    highScores.innerHTML = "";
}

//#endregion

//#region Event listeners

// Go to start screen when DOM content is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();

    switchScreen(startScreen);
});

// Render high scores when DOM content is loaded
document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();

    renderHighScores();
});

// Start quiz button
startButton.addEventListener("click", startQuiz);

// Answer buttons (event delegated from child to parent)
document.querySelector("#answers").addEventListener("click", checkAnswer);

// High scores link
highScoresLink.addEventListener("click", function(event) {
    event.preventDefault();

    // Clear timer when going to high scores screen (if you click link during quiz)
    clearInterval(activeTimer);
    switchScreen(highScoresScreen);
});

// Go back button
backButton.addEventListener("click", function(event) {
    event.preventDefault();

    // Clear timer and reset time to 0 upon going back to start screen
    clearInterval(activeTimer);
    time = 0;
    timeLeft.textContent = time;
    switchScreen(startScreen);
});

// Store high scores
initialsButton.addEventListener("click", function(event) {
    event.preventDefault();

    storeHighScore();
    switchScreen(highScoresScreen);
});

// Clear high scores
clearHighScoresBtn.addEventListener("click", function(event) {
    event.preventDefault();

    clearHighScores();
})

//#endregion

