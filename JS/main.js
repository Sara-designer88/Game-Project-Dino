//screens
const gameScreen = document.querySelector("#game-screen");
const startScreen = document.querySelector("#start-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const scoreResultScreen = document.querySelector("#score-result-screen");

//buttons
const startBtn = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//Golbal Variable
let dinoObj = null;
let goodTargetArr = [];
let badTargetArr = [];
let gameIntervalId = null;
let goodTargetspawnIntervalId = null;

//Functions

function gameStart() {
  //hiding the start screen and show the game screen after click on start button
  startScreen.style.display = "none";
  gameScreen.style.display = "flex";

  //starting the main game interval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60));

  //create obj from the class dino
  dinoObj = new dino();
  // new goodTarget (); we will not create the object bcz we want to add it to the spawn 
  // intialize the other interval 
  goodTargetspawnIntervalId = setInterval(spawnGoodTarget,2000)
}

function gameLoop() {

}

function spawnGoodTarget (){

}
//Event listener
startBtn.addEventListener("click", gameStart);

// Planning

/*
- when clicking the start button with the addEventListener [Done]
  - change the screen to the game
  - starting the interval 
  - start with a dino
- creating the background [ done]
- creating the dino [ done]
  - create the class (x, y, width, height,Move speed)
  - mmove when the user click on arrow keyboard
- creating the target [ done]
  - create the class (x, y, width, height, speed)
  - targets will move automatically vertically

- collision between the dino and the targets (4 types)
- spawn targets as the game progresses
  - random y
  - three different target at a time with differente images and y
- despawn the tubes once they exit the screen


BONUS
- Score
- timer
- sound
*/
