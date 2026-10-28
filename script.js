
const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correct: 0
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["Python", "CSS", "C", "Java"],
    correct: 1
  },
  {
    question: "Which language makes web pages interactive?",
    answers: ["HTML", "CSS", "JavaScript", "SQL"],
    correct: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript (single line)?",
    answers: ["##", "//", "<!--", "**"],
    correct: 1
  },
  {
    question: "Which keyword declares a variable in JavaScript?",
    answers: ["let", "print", "echo", "input"],
    correct: 0
  },
  {
    question: "Which one is a Python data type?",
    answers: ["integer", "numberline", "characterline", "decimaltext"],
    correct: 0
  },
  {
    question: "What is the correct extension for a JavaScript file?",
    answers: [".html", ".css", ".js", ".java"],
    correct: 2
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1
  },
  {
    question: "Which tag is used for the largest HTML heading?",
    answers: ["<h6>", "<head>", "<h1>", "<heading>"],
    correct: 2
  },
  {
    question: "Which operator checks strict equality in JavaScript?",
    answers: ["=", "==", "===", "!="],
    correct: 2
  },
  {
    question: "Which function displays a message in the browser console?",
    answers: ["console.log()", "printscreen()", "show()", "display()"],
    correct: 0
  },
  {
    question: "Which language is commonly used for database queries?",
    answers: ["CSS", "SQL", "HTML", "XML"],
    correct: 1
  },
  {
    question: "What does CPU stand for?",
    answers: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"],
    correct: 0
  },
  {
    question: "Which data structure follows FIFO?",
    answers: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
  },
  {
    question: "Which data structure follows LIFO?",
    answers: ["Queue", "Array", "Stack", "Linked list"],
    correct: 2
  },
  {
    question: "Which loop checks a condition before each iteration?",
    answers: ["while loop", "do-while only", "switch", "if only"],
    correct: 0
  },
  {
    question: "Which of these is a programming language?",
    answers: ["HTTP", "Python", "HTML only", "CSS"],
    correct: 1
  },
  {
    question: "What does RAM stand for?",
    answers: ["Random Access Memory", "Read Access Machine", "Run Active Memory", "Rapid Action Module"],
    correct: 0
  },
  {
    question: "Which HTML tag inserts an image?",
    answers: ["<picturefile>", "<img>", "<image>", "<src>"],
    correct: 1
  },
  {
    question: "Which method adds an item to the end of a JavaScript array?",
    answers: ["push()", "pop()", "shift()", "remove()"],
    correct: 0
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreElement = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 120;
let timerInterval;
let quizFinished = false;

function showQuestion() {
  if (currentQuestion >= questions.length) {
    finishQuiz();
    return;
  }

  const current = questions[currentQuestion];
  questionElement.textContent = current.question;
  questionNumberElement.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;
  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  answersElement.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.className = "answer-btn";

    button.addEventListener("click", () => {
      if (quizFinished) return;

      if (index === current.correct) {
        score++;
      }

      currentQuestion++;
      showQuestion();
    });

    answersElement.appendChild(button);
  });
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  if (timerElement) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent =
      `Time Left: ${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  if (timeLeft <= 0) {
    finishQuiz();
    return;
  }

  timeLeft--;
}

function startTimer() {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function finishQuiz() {
  if (quizFinished) return;
  quizFinished = true;

  clearInterval(timerInterval);
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  finalScoreElement.textContent = `${score} / ${questions.length}`;
  progressBar.style.width = "100%";

  if (score >= 16) {
    resultMessage.textContent = "Excellent! 🎉";
  } else if (score >= 10) {
    resultMessage.textContent = "Good job! Keep learning! 👏";
  } else {
    resultMessage.textContent = "Keep practising. You can do it! 💪";
  }

  saveScore();
  showLeaderboard();
}

function saveScore() {
  const nameInput = document.getElementById("player-name");
  const name = nameInput?.value.trim() || "Player";

  const leaderboard = JSON.parse(
    localStorage.getItem("quizLeaderboard") || "[]"
  );

  leaderboard.push({
    name: name.slice(0, 20),
    score: score,
    total: questions.length
  });

  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem(
    "quizLeaderboard",
    JSON.stringify(leaderboard.slice(0, 5))
  );
}

function showLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  const leaderboard = JSON.parse(
    localStorage.getItem("quizLeaderboard") || "[]"
  );

  list.innerHTML = "";

  leaderboard.forEach((entry, index) => {
    const item = document.createElement("li");
    item.textContent =
      `${index + 1}. ${entry.name} — ${entry.score}/${entry.total}`;
    list.appendChild(item);
  });
}

function restartQuiz() {
  clearInterval(timerInterval);
  currentQuestion = 0;
  score = 0;
  timeLeft = 120;
  quizFinished = false;

  quizScreen.style.display = "block";
  resultScreen.style.display = "none";

  showQuestion();
  startTimer();
}

if (restartButton) {
  restartButton.addEventListener("click", restartQuiz);
}

showQuestion();
startTimer();
