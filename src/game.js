import { updateScore, addTime } from "./timer.js";

let totalNumbers = 4;
let currentNumber = 1;
let items = document.querySelectorAll(".item");
let selectedIndex = 0;
let numberOfSelectedItems = 0;
let itemsArray = [];
// // variables for hard mode
// let hardMode = false;
// let numA = 0;
// let numB = 0;
// let numAB = 0;

const selectedDifficulty = sessionStorage.getItem("DIFFICULTY");

const gameProperties = {
  extraTime: 0,
  subTime: 0,
  gainedPoints: 0,
  lostPoints: 0,
  pointsForFinishing: 0,
};

const backgroundMusic = document.getElementById('backgroundMusic');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const audioContext = new AudioContext();

function setDifficulty() {
  switch (selectedDifficulty) {
    case "easy":
      gameProperties.extraTime = 10;
      gameProperties.subTime = -1;
      gameProperties.gainedPoints = 100;
      gameProperties.lostPoints = -50;
      gameProperties.pointsForFinishing = 500;
      break;
    case "medium":
      gameProperties.extraTime = 8;
      gameProperties.subTime = -2;
      gameProperties.gainedPoints = 150;
      gameProperties.lostPoints = -75;
      gameProperties.pointsForFinishing = 600;
      break;
    case "hard":
      gameProperties.extraTime = 6;
      gameProperties.subTime = -3;
      gameProperties.gainedPoints = 200;
      gameProperties.lostPoints = -100;
      gameProperties.pointsForFinishing = 700;
      // setHardMode();
      break;
    default:
      throw new Error("Unknown difficulty");
  }
}

// function setHardMode() {
//   hardMode = true;
//   const instructions = document.getElementById("instructions");
//   const operation = document.getElementById("operation");
//   instructions.textContent = 'Click the number that completes the following operation';
//   operation.textContent = `____ + ${numB} = ${numAB}`;
// }

function generateRandomArray(n) {
  const randomArray = [];

  while (randomArray.length < n) {
    const randomNumber = Math.floor(Math.random() * 99) + 1;

    if (randomArray.indexOf(randomNumber) === -1) {
      randomArray.push(randomNumber);
    }
  }

  randomArray.sort((a, b) => a - b);

  return randomArray;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function handleItemClick(event) {
  handleInteraction(event);
  audioContext.resume();
}

function handleInteraction(input) {
  const targetItem = input instanceof Event ? input.target : input;

  const clickedNumber = parseInt(targetItem.textContent, 10);
  if (clickedNumber === currentNumber) {
    correctSound.play();
    targetItem.classList.add("completed");
    numberOfSelectedItems++;
    currentNumber = itemsArray[numberOfSelectedItems];
    updateScore(gameProperties.gainedPoints);
    if (numberOfSelectedItems === totalNumbers) {
      updateScore(gameProperties.pointsForFinishing);
      addTime(gameProperties.extraTime);
      repaintGameContainer();
    }
  } else {
    wrongSound.play();
    targetItem.classList.add("wrong");
    updateScore(gameProperties.lostPoints);
    addTime(gameProperties.subTime);
    setTimeout(() => {
      targetItem.classList.remove("wrong");
    }, 300);
  }
}

function generateitems(numberOfItems) {
  const container = document.getElementById("itemContainer");

  switch (selectedDifficulty) {
    case "easy":
      itemsArray = Array.from(Array(numberOfItems).keys()).map((i) => i + 1);
      break;
    case "medium":
      itemsArray = generateRandomArray(numberOfItems);
      break;
    default: break;
  }
  const definitiveArray = shuffleArray(itemsArray);

  for (let i = 1; i <= numberOfItems; i++) {
    const item = document.createElement("div");
    item.textContent = definitiveArray[i - 1];
    item.className = "item";
    item.id = `item-${definitiveArray[i - 1]}`;
    item.addEventListener("click", handleItemClick);
    container.appendChild(item);
  }

  document.body.appendChild(container);
}

function repaintGameContainer() {
  totalNumbers++;
  numberOfSelectedItems = 0;
  document.getElementById("itemContainer").innerHTML = "";
  generateitems(totalNumbers);
  items = document.querySelectorAll(".item");
  selectedIndex = -1;
  [currentNumber] = itemsArray;
}

function highlightSelected() {
  items.forEach((item, index) => {
    if (index === selectedIndex) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}

function handleKeyPress(event) {
  if (event.key === "ArrowLeft") {
    selectedIndex = Math.max(0, selectedIndex - 1);
  } else if (event.key === "ArrowRight") {
    selectedIndex = Math.min(items.length - 1, selectedIndex + 1);
  } else if (event.key === "Enter") {
    const selectedItem = items[selectedIndex];
    handleInteraction(selectedItem);
  }

  highlightSelected();
}

window.addEventListener("load", () => {
  setDifficulty();
  repaintGameContainer();
  document.addEventListener("keydown", handleKeyPress);
  highlightSelected();
  backgroundMusic.play();
});
