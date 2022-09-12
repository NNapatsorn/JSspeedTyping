const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const levelBtnEl = document.getElementById("level-btn");
const settingsEl = document.getElementById("settings");
const levelFormEl = document.getElementById("level-form");
const levelEl = document.getElementById("level");
const gameoverEl = document.getElementById("gameover");

const words = ["ตั๊กแตน", "แม่น้ำ", "ไก่ไข่", "มานีมานะ", "กล้ากับแก้ว"];
let randomText;
let score = 0;
let time = 10; // easy = 15, medium = 10, hard = 5

let level = 10;
const saveMode =
  localStorage.getItem("mode") !== null
    ? localStorage.getItem("mode")
    : "medium";

const timeInterval = setInterval(() => {
  updateTime();
}, 1000);

getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

displayWordToUI = () => {
  randomText = getRandomWord();
  wordEl.innerHTML = randomText;
  timeEl.innerHTML = time;
};

textEl.addEventListener("input", (e) => {
  const inputText = e.target.value;

  if (inputText === randomText) {
    if (saveMode == "easy") {
      time += 7;
    } else if (saveMode == "medium") {
      time += 5;
    } else {
      time += 3;
    }

    displayWordToUI();
    updateScore();
    e.target.value = "";
  }
});

updateScore = () => {
  score += 10;
  scoreEl.innerHTML = score;
};

updateTime = () => {
  time--;
  timeEl.innerHTML = time;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

gameOver = () => {
  gameoverEl.innerHTML = `<h1>Game over</h1>
    <p>Your score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
    `;
  gameoverEl.style.display = "flex";
};

levelBtnEl.addEventListener("click", () => {
  settingsEl.classList.toggle("hide");
});

levelEl.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("mode", level);
});

startGame = () => {
  levelEl.value = saveMode;
  if (saveMode == "easy") {
    time = 15;
  } else if (saveMode == "medium") {
    time = 10;
  } else {
    time = 5;
  }
  displayWordToUI();
};

startGame();
textEl.focus();
