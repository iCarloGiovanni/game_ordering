let timer;
let maxTime = 0;
let timeInSeconds = 0;
let score = 0;

function toLeaderboard() {
  sessionStorage.setItem('SCORE', score);
  window.location.href = "leaderBoard.html";
}

function setMaxTime() {
  const selectedDifficulty = sessionStorage.getItem('DIFFICULTY');

  switch (selectedDifficulty) {
    case 'easy':
      maxTime = 30;
      break;
    case 'medium':
      maxTime = 20;
      break;
    case 'hard':
      maxTime = 15;
      break;
    default:
      throw new Error('Unknown difficulty');
  }
  timeInSeconds = maxTime;
}

function updateScore(points) {
  score += points;
  document.getElementById("displayScore").innerHTML = ` ${score}`;
}

function updateTimer() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const displayTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
  document.getElementById("timer").innerText = displayTime;

  const progressBar = document.getElementById("progress-bar");

  const percentage = (timeInSeconds / maxTime) * 100;
  progressBar.style.width = `${percentage}%`;
}

function addTime(time) {
  timeInSeconds = Math.min(timeInSeconds + time, maxTime);
  updateTimer();
}

function startTimer() {
  setMaxTime();
  timer = setInterval(() => {
    if (timeInSeconds > 0) {
      timeInSeconds--;
      updateTimer();
    } else {
      clearInterval(timer);
      toLeaderboard();
    }
  }, 1000);
}

window.addEventListener("load", () => {
  const user = sessionStorage.getItem("USER");
  document.getElementById("displayName").innerHTML = ` ${user}`;
  document.getElementById("displayScore").innerHTML = ` ${score}`;
  const endGameBtn = document.getElementById("btn-endGame");
  endGameBtn.addEventListener("click", toLeaderboard);

  startTimer();
});

export { updateScore, addTime };
