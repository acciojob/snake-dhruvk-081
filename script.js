// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("https://docs.google.com/uc?export=download&id=1RHI5BKCvLDzvJjsxLupXoxLlvODjzUlm");
const gameOverSound = new Audio("https://docs.google.com/uc?export=download&id=1t6LODtft25A5_qLdm-T9g-b_8ZSqtbSQ");
const moveSound = new Audio("https://docs.google.com/uc?export=download&id=12yLbAjru8MaCLXvXfcswo2rBcIzLhQ41");
const musicSound = new Audio("https://docs.google.com/uc?export=download&id=1YjHN0E4iH95IDdzyMXwNTDN1WImne8mZ");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 1, y: 20 }];

food = { x: 16, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (snake[0].x >= 40 || snake[0].x <= 0 || snake[0].y >= 40 || snake[0].y <= 0) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();                             //gameSound-play
    musicSound.pause();                              //musicSound-play
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 1, y: 20 }];
    musicSound.play();                                //musicSound-play
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();                                      //foodSound-play
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 5;
    let b = 38;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  gameContainer.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    gameContainer.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  gameContainer.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();                                   //musicSound-play_when_game_starts
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();                                     //moveSound-play
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

//Music playPauseBTN
let playPauseBTN = document.getElementById("playPauseBTN");
let countnum = 0;

function playPause() {
  console.log("playpause function called");
  if (countnum == 0) {
    countnum = 1;
    musicSound.play();
    console.log(countnum, "countnum on play");
    playPauseBTN.innerHTML = "Music Pause &#9208;";
  } else {
    countnum = 0;
    musicSound.pause();
    console.log(countnum, "countnum on pause");

    playPauseBTN.innerHTML = "Music Play &#9658;";
  }
}
