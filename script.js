document.addEventListener("DOMContentLoaded", function () {});
const startButton = document.getElementById("start-btn");
const saveBtn = document.getElementById("saveBtn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonElement = document.getElementById("answer-buttons");
const leaderBoard = document.getElementById("leaderBoard");
const record = document.getElementById("record");
const endOfGame = document.querySelector("#endOfGame");
const container = document.querySelector(".container");
let gameClockId;
const correctAnswer = [];
let players = [];
let score = 0;
let sec = 30;

//timer
function timer() {
  gameClockId = setInterval(function () {
    document.getElementById("Countdown").textContent = "Time left: " + sec;
    sec--;
    if (sec < 0) {
      clearInterval(gameClockId);
      alert("Game Over");
    }
  }, 1000);
}

//questions
const questionsArray = [
  {
    question: "what is a data type used by JavaScript?",
    options: [
      {
        text: "Numbers",
        answer: false,
      },
      {
        text: "Arrays",
        answer: false,
      },
      {
        text: "Strings.",
        answer: false,
      },
      {
        text: "All of the above.",
        answer: true,
      },
    ],
  },
  {
    question: "What is the proper way to show an Array?",
    options: [
      {
        text: "[ ]",
        answer: true,
      },
      {
        text: "{ }",
        answer: false,
      },
      {
        text: "( )",
        answer: false,
      },
      {
        text: "None at all",
        answer: false,
      },
    ],
  },
  {
    question: "In a function, what goes inside the parenthesis, ( )?",
    options: [
      {
        text: "A Number",
        answer: false,
      },
      {
        text: "The parameter",
        answer: true,
      },
      {
        text: "A phone number",
        answer: false,
      },
      {
        text: "My name",
        answer: false,
      },
    ],
  },
  {
    question:
      "For an eventListener to be added to an object, what needs to be put in the parenthesis, .addEventListener(  ,  )?",
    options: [
      {
        text: "a phone number, address",
        answer: false,
      },
      {
        text: "a latitude, longitude",
        answer: false,
      },
      {
        text: "an event, instructions about what to do for the event",
        answer: true,
      },
      {
        text: "up up down down left right left right a b then press select, then which level you'd like to play",
        answer: false,
      },
    ],
  },
];

//randomizing the questions
let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener("click", startGame);

//starting the game
function startGame() {
  startButton.classList.add("hide");
  endOfGame.classList.add("hide");
  shuffledQuestions = questionsArray.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  timer();
  setNextQuestion();
}
//hiding the scoreboard and form for initials
function endGame() {
  container.classList.add("hide");
  endOfGame.classList.remove("hide");
  clearInterval(gameClockId);
  // handleSave();
  // console.log(handleSave);
}

// prompting the next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
//creating the buttons for answers
function showQuestion(questionsArray) {
  questionElement.innerText = questionsArray.question;
  questionsArray.options.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-buttons");
    button.dataset.answer = answer.answer;
    button.onclick = selectAnswer;
    answerButtonElement.appendChild(button);
  });
}
// clearing the previous question and setting the next
function resetState() {
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
// determining if the selected answer is correct
function selectAnswer(e) {
  const buttonElement = e.target;
  const answer = buttonElement.dataset.answer;
  setStatusClass(document.body, answer);
  // if else statement to subtract time.
  if (answer === "false") {
    sec = sec - 5;
    document.getElementById("Countdown").textContent = "Time left: " + sec;
  } else {
  }
  Array.from(answerButtonElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.answer);
  });
  //declaring end of the game. Still inside function.
  currentQuestionIndex++;
  if (currentQuestionIndex === questionsArray.length) {
    
    gameOver();
  } else {
    setNextQuestion();
  }
}
//changing the background color to show if the answer is correct or wrong
function setStatusClass(element, answer) {
  clearStatusClass(element);
  if (answer === "true") {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

// clearing the background color of correct or wrong
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// hiding the game over screen
function gameOver() {
  clearStatusClass(document.body);
endGame();
handleScore();
}
// ending the game due to out of time
function timeOver() {
  if (!sec === 0) {
    handleScore();
    // console.log(handleSave)
    gameOver();
    return (score = 0);
  }
}

const playersObject = {playersInitials:record, playersScore:score.value};

function handleSave() {
  const record = document.querySelector('#record').value; 
  let savedRecord = JSON.parse(localStorage.getItem(playersObject)) || [];
   savedRecord.push(playersObject)
  console.log(playersObject);
  console.log(savedRecord);
  localStorage.setItem(playersObject, JSON.stringify(savedRecord));
  displayRecord();
}

saveBtn.addEventListener('click', handleSave());

function displayRecord() {
  const retrievedRecord = JSON.parse(localStorage.getItem(playersObject)) || [];
  document.querySelector("#leaderBoard").innerText ="";
  console.log(displayRecord);
for (let i = 0; i < retrievedRecord.length; i++) {
  const element = retrievedRecord[i];
  let li = document.createElement('li');
  li.textContent = element.playersObject;
  document.querySelector('#leaderBoard').append(li);
  console.log(leaderBoard);
}
}
// save player names and scores under empty array called players and then set that to local storage and then retrieve that