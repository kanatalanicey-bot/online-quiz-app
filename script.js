
const questions = [
  {
    question: "1. Which language is used to style web pages?",
    answers: ["HTML", "CSS", "Python", "Java"],
    correct: "CSS"
  },
  {
    question: "2. What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Home Text Markup Language"
    ],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "3. Which language makes web pages interactive?",
    answers: ["CSS", "HTML", "JavaScript", "SQL"],
    correct: "JavaScript"
  },
  {
    question: "4. Which symbol is used for comments in JavaScript?",
    answers: ["//", "##", "<!--", "**"],
    correct: "//"
  },
  {
    question: "5. Which one is a programming language?",
    answers: ["HTML", "CSS", "JavaScript", "All are the same"],
    correct: "JavaScript"
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

function showQuestion() {
  const q = questions[currentQuestion];

  questionElement.textContent = q.question;
  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreElement.textContent = `Score: ${score}`;

  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  answersElement.innerHTML = "";

  q.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.className = "answer-btn";

    button.addEventListener("click", () => selectAnswer(answer, button));

    answersElement.appendChild(button);
  });
}

function selectAnswer(answer, selectedButton) {
  const correctAnswer = questions[currentQuestion].correct;
  const buttons = answersElement.querySelectorAll("button");

  buttons.forEach(button => {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (answer === correctAnswer) {
    score++;
    scoreElement.textContent = `Score: ${score}`;
  } else {
    selectedButton.classList.add("wrong");
  }

  const nextButton = document.createElement("button");
  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See Results"
      : "Next Question";

  nextButton.className = "next-btn";
  nextButton.addEventListener("click", nextQuestion);

  answersElement.appendChild(nextButton);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.hidden = true;
  resultScreen.hidden = false;

  document.getElementById("final-score").textContent =
    `${score} / ${questions.length}`;

  document.getElementById("result-message").textContent =
    score === questions.length
      ? "Excellent! You got every question right!"
      : "Good effort! Keep practising to improve your score.";

  progressBar.style.width = "100%";
}

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;

  quizScreen.hidden = false;
  resultScreen.hidden = true;

  showQuestion();
});

showQuestion();
