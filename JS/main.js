//screens
const gameScreen = document.querySelector("#game-screen");
const startScreen = document.querySelector("#start-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const scoreResultScreen = document.querySelector("#score-result-screen");
const restartGameBtn = document.querySelector("#restart-btn");
const restartGameBtn2 = document.querySelector("#restart-btn2");
const scoreBtn = document.querySelector("#score");
const scoreText = document.querySelector("#score-text");
const timerBtn = document.querySelector("#timer");
const soundIcon = document.querySelector("#sound-icon");
const soundBtn = document.querySelector("#sound-btn");
const instructionBtn = document.querySelector("#instructions-btn");
const popup = document.querySelector("#popup");
const popupBox = document.querySelector("#popup-box");
const bonus = document.querySelector("#bonus");
const bonus1 = document.querySelector("#bonus1");
const bonus2 = document.querySelector("#bonus2");
const bonus3 = document.querySelector("#bonus3");

const audio = document.createElement("audio");
audio.src = "./img/bgSound.mp3";
audio.loop = true;
audio.volume = 0.5;
const audio2 = document.createElement("audio");
audio2.src = "./img/goodTargetSound.mp3";
audio2.volume = 0.5;
const audio3 = document.createElement("audio");
audio3.src = "./img/badTargetSound.mp3";
audio3.volume = 0.5;
const audio4 = document.createElement("audio");
audio4.src = "./img/bonusTargetSound.mp3";
audio4.volume = 0.5;

//buttons
const startBtn = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//Golbal Variable
let dinoObj = null;
let goodTargetArr = [];
let badTargetArr = [];
let shootTargetArr = [];
let bonusTargetArr = [];
let timerIntervalId = null;
let gameIntervalId = null;
let goodTargetspawnIntervalId = null;
let badTargetspawnIntervalId = null;
let shootTargetspawnIntervalId = null;
let bonusTargetspawnIntervalId = null;
let keys = {};
let score = 0;
let timer = 30;
let lives = 3;

//Functions

function gameStart() {
  //hiding the start screen and show the game screen after click on start button
  startScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  scoreResultScreen.style.display = "none";
  gameScreen.style.display = "flex";

  //starting the timer
  startTimer();

  //starting the main game interval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60));

  //create obj from the class dino
  dinoObj = new dino();
  // Note : new goodTarget (); we will not create the object bcz we want to add it to the spawn

  // intialize the other interval for the good target
  goodTargetspawnIntervalId = setInterval(spawnGoodTarget, 2000);
  badTargetspawnIntervalId = setInterval(spawnBadTarget, 6000);
  shootTargetspawnIntervalId = setInterval(spawnShootTarget, 5000);
  bonusTargetspawnIntervalId = setInterval(spawnBonusTarget, 8000);
}

function gameLoop() {
  //ading audio for the whole game
  audio.play();

  // this will move the dino smoothly after creating the object and call the move function
  dinoObj.move({
    left: keys["ArrowLeft"],
    right: keys["ArrowRight"],
    up: keys["ArrowUp"],
    down: keys["ArrowDown"],
  });

  // check if dino go outside screens and prevent that
  preventDinoOutScreen();

  // loop inside the good target array to move it
  goodTargetArr.forEach((newgoodTargetObj) => {
    newgoodTargetObj.automaticMovement();
  });

  eatGoodTarget();

  // loop inside the bad target array to move it
  badTargetArr.forEach((newbadTargetObj) => {
    newbadTargetObj.automaticMovement();
  });

  eatBadTarget();

  // loop inside the shoot target array to move it
  shootTargetArr.forEach((newshootTargetObj) => {
    newshootTargetObj.automaticMovement();
  });

  eatShootTarget();

  // loop inside the bonus target array to show it
  bonusTargetArr.forEach((newbonusTargetObj) => {
    newbonusTargetObj.bonusTargetShow();
  });

  eatBonusTarget();
}

// This function will spawn a new good target with a random y position and add it to the array
function spawnGoodTarget() {
  let yPosition = Math.floor(Math.random() * (gameBoxNode.offsetHeight - 100));
  let newGoodTarget = new goodTarget(yPosition);
  goodTargetArr.push(newGoodTarget);
}

// This function will spawn a new good target with a random y position and add it to the array
function spawnBadTarget() {
  let yPosition = Math.floor(Math.random() * (gameBoxNode.offsetHeight - 200));
  let newBadTarget = new badTarget(yPosition);
  badTargetArr.push(newBadTarget);
}

// This function will spawn a new shoot target with a random x position and add it to the array
function spawnShootTarget() {
  let xPosition = Math.floor(Math.random() * (gameBoxNode.offsetWidth - 100));
  let newShootTarget = new shootTarget(xPosition);
  shootTargetArr.push(newShootTarget);
}

function spawnBonusTarget() {
  let xPosition = Math.floor(Math.random() * (gameBoxNode.offsetWidth - 100));
  let yPosition = Math.floor(Math.random() * (gameBoxNode.offsetHeight - 100));
  let newBonusTarget = new bonusTarget(xPosition, yPosition);
  bonusTargetArr.push(newBonusTarget);
  newBonusTarget.createdAt = Date.now();
  newBonusTarget.lifeTime = 4000;
}

function eatGoodTarget() {
  goodTargetArr.forEach((goodTargetObj, index) => {
    let isColliding = collectionCheck(dinoObj, goodTargetObj);
    if (isColliding === true) {
      // if good target touch the dino , will be destroyed
      goodTargetObj.goodTargetNode.remove();
      goodTargetArr.splice(index, 1);
      //console.log("item exist dino ")
      audio2.play();

      // maximize score by 1
      score += 1;
      scoreBtn.textContent = `Score: ${score}`;
      showScoreEffect(goodTargetObj.x, goodTargetObj.y, 1);
    } else if (goodTargetObj.x + goodTargetObj.width <= 0) {
      // if good target touch the screen , will be destroyed
      goodTargetObj.goodTargetNode.remove();
      goodTargetArr.splice(index, 1);
      //console.log("item exist screen ")
    }
  });
}

//this function will eat the bad target and destroy it and game over otherwize destroy it once it exist screen
function eatBadTarget() {
  badTargetArr.forEach((badTargetObj, index) => {
    let isColliding = collectionCheck(dinoObj, badTargetObj);
    if (isColliding === true) {
      // if bad target touch the dino , will be destroyed
      badTargetObj.badTargetNode.remove();
      badTargetArr.splice(index, 1);
      //console.log("item exist dino ")
      audio3.play();
      // will remove 1 bonus and if the 3 bonus is removed then game over

      // game over screen to finish game
      gameOver();
    } else if (badTargetObj.x + badTargetObj.width <= 0) {
      // if bad target touch the screen , will be destroyed
      badTargetObj.badTargetNode.remove();
      badTargetArr.splice(index, 1);
      //console.log("item exist screen ")
    }
  });
}

//this function will eat the shoot target and destroy it and game over otherwize destroy it once it exist screen
function eatShootTarget() {
  shootTargetArr.forEach((shootTargetObj, index) => {
    let isColliding = collectionCheck(dinoObj, shootTargetObj);
    if (isColliding === true) {
      // if shoot target touch the dino , will be destroyed
      shootTargetObj.shootTargetNode.remove();
      shootTargetArr.splice(index, 1);
      //console.log("item exist dino ")
      audio3.play();

      // will remove 1 bonus and if the 3 bonus is removed then game over

      lives--;

      if (lives === 2) {
        bonus3.style.display = "none";
      } else if (lives === 1) {
        bonus2.style.display = "none";
      } else if (lives === 0) {
        bonus1.style.display = "none";
      } else if (lives < 0) {
        // game over screen to finish game
        gameOver();
      }
    } else if (
      shootTargetObj.y + shootTargetObj.height >=
      gameBoxNode.offsetHeight
    ) {
      // if shoot target touch the screen , will be destroyed
      shootTargetObj.shootTargetNode.remove();
      shootTargetArr.splice(index, 1);
      //console.log("item exist screen ")
    }
  });
}

function eatBonusTarget() {
  bonusTargetArr.forEach((bonusTargetObj, index) => {
    let isColliding = collectionCheck(dinoObj, bonusTargetObj);
    if (isColliding === true) {
      // if good target touch the dino , will be destroyed
      bonusTargetObj.bonusTargetNode.remove();
      bonusTargetArr.splice(index, 1);
      audio4.play();
      // add one live if the 3 bonus is added then maximize score by 5 points
      if (lives < 3) {
        lives++;
        if (lives === 3) {
          bonus3.style.display = "flex";
        } else if (lives === 2) {
          bonus2.style.display = "flex";
        } else if (lives === 1) {
          bonus1.style.display = "flex";
        }
      } else if (lives >= 3) {
        // if you already have 3 libes then maximize score by 5
        score += 5;
        scoreBtn.textContent = `Score: ${score}`;
        showScoreEffect(bonusTargetObj.x, bonusTargetObj.y, 5);
      }
    } // else if not colllide with dino Object after x time , it will be destroyed, and dissapeared
    else if (Date.now() - bonusTargetObj.createdAt > bonusTargetObj.lifeTime) {
      bonusTargetObj.bonusTargetNode.remove();
      bonusTargetArr.splice(index, 1);
    }
  });
}

function gameOver() {
  // stop all interval
  clearInterval(gameIntervalId);
  clearInterval(goodTargetspawnIntervalId);
  clearInterval(badTargetspawnIntervalId);
  clearInterval(shootTargetspawnIntervalId);
  clearInterval(bonusTargetspawnIntervalId);
  clearInterval(timerIntervalId);
  // change state
  // retsart all game variables
  gameScreen.style.display = "none";
  // scoreResultScreen.style.display = "none";
  gameOverScreen.style.display = "flex";
  score = 0;
  scoreBtn.textContent = `Score: ${score}`;
  destroyAlltargets();
}

function restartGame() {
  // retsart all game variables
  gameScreen.style.display = "flex";

  if (dinoObj) {
    dinoObj.dinoNode.remove();
    dinoObj = null;
  }

  gameStart();
}

// This function will update the timer on screen
function updateDisplay() {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  // format like 03:00
  timerBtn.textContent = `Timer: ${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// This function will start the timer with setInterval and will call the updateDisplay function
function startTimer() {
  timer = 30;
  clearInterval(timerIntervalId); // prevent multiple timers

  timerIntervalId = setInterval(() => {
    if (timer > 0) {
      timer--;
      updateDisplay();
    } else {
      clearInterval(timerIntervalId);
      timerBtn.textContent = "Time's up!";
      scoreResult();
      destroyAlltargets();
    }
  }, 1000);
}

function scoreResult() {
  // stop all interval
  clearInterval(gameIntervalId);
  clearInterval(goodTargetspawnIntervalId);
  clearInterval(badTargetspawnIntervalId);
  clearInterval(shootTargetspawnIntervalId);
  clearInterval(bonusTargetspawnIntervalId);
  destroyAlltargets();
  // change state
  // retsart all game variables
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  scoreResultScreen.style.display = "flex";
  if (score === 0) {
    scoreText.textContent = `Try again! Your didn't catch any fish this time`;
  } else {
    scoreText.textContent = `Congratulations! Your Score is ${score} points`;
  }
  score = 0;
  scoreBtn.textContent = `Score: ${score}`;
}

function collectionCheck(elem1, elem2) {
  // this will return boolean
  return (
    elem1.x < elem2.x + elem2.width &&
    elem1.x + elem1.width > elem2.x &&
    elem1.y < elem2.y + elem2.height &&
    elem1.y + elem1.height > elem2.y
  );
}

function destroyAlltargets() {
  goodTargetArr.forEach((goodTargetObj, index) => {
    goodTargetObj.goodTargetNode.remove();
    goodTargetArr.splice(index, 1);
  });

  badTargetArr.forEach((badTargetObj, index) => {
    badTargetObj.badTargetNode.remove();
    badTargetArr.splice(index, 1);
  });

  shootTargetArr.forEach((shootTargetObj, index) => {
    shootTargetObj.shootTargetNode.remove();
    shootTargetArr.splice(index, 1);
  });

  bonusTargetArr.forEach((bonusTargetObj, index) => {
    bonusTargetObj.bonusTargetNode.remove();
    bonusTargetArr.splice(index, 1);
  });
}

function preventDinoOutScreen() {
  if (dinoObj.x < 0) {
    dinoObj.x = 0;
  }
  if (dinoObj.x + dinoObj.width > gameBoxNode.offsetWidth) {
    dinoObj.x = gameBoxNode.offsetWidth - dinoObj.width;
  }
  if (dinoObj.y < 0) {
    dinoObj.y = 0;
  }
  if (dinoObj.y + dinoObj.height > gameBoxNode.offsetHeight) {
    dinoObj.y = gameBoxNode.offsetHeight - dinoObj.height;
  }
}

//function to show score animation with +1 or +5 points
function showScoreEffect(x, y, score) {
  const effect = document.createElement("div");

  effect.textContent = `+${score}`;

  effect.style.position = "absolute";
  effect.style.left = x + "px";
  effect.style.top = y + "px";
  effect.style.fontWeight = "bold";
  effect.style.fontSize = "20px";
  effect.style.pointerEvents = "none";
  // simple animation setup
  effect.style.transition = "all 1s ease";
  effect.style.opacity = "1";

  gameBoxNode.appendChild(effect);

  // trigger animation
  setTimeout(() => {
    effect.style.top = y - 50 + "px"; // move up
    effect.style.opacity = "0"; // fade out
  }, 10);

  // remove element
  setTimeout(() => {
    effect.remove();
  }, 1000);
}

//Event listener
startBtn.addEventListener("click", gameStart);
restartGameBtn.addEventListener("click", restartGame);
restartGameBtn2.addEventListener("click", restartGame);

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

soundBtn.addEventListener("click", () => {
  console.log("clicked", audio.muted);
  if (audio.muted) {
    audio.muted = false;
    audio2.muted = false;
    audio3.muted = false;
    soundIcon.src = "./img/unmuteSound.png";
  } else {
    audio.muted = true;
    audio2.muted = true;
    audio3.muted = true;
    soundIcon.src = "./img/muteSound.png";
  }
});

//add instruction popup when click on ? button
instructionBtn.addEventListener("click", () => {
  if (popup.classList.contains("hidden")) {
    popup.classList.remove("hidden");
    popupBox.classList.remove("hidden");
  }
});

popup.addEventListener("click", () => {
  popup.classList.add("hidden");
  popupBox.classList.add("hidden");
});

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

- collision between the dino and the good targets [ done ]
- spawn gppd targets as the game progresses [ done]
  - random y position [ done]
- despawn the tubes once they exit the screen [ done]

[done]
- adding enemy Target class
- interval for the enemy target
- spawn the enemy target
 --- random y position
- collision between the dino and the enemy target
- game over screen
- despawn the enemy target
- - restart button


- collision dino with the screens edge [done]

- adding result with score [ done]
--- restart button [done]

BONUS
- Score // get score from eating the good target [ Done]
- timer // get score result screen  [ Done]
- sound [ done]
- enhance in css and design [done]
- adding function : shooting target come from the top [done]
- adding function : bonus target appear randommly in screen and dissapear after x time [done]
- adding function : instruction button [done]

- adding function : will have 3 lives <3  [done]
  ---will increase when he eat bonus // after 3 full lives , score will increase with 10 points
  ---will decrease when he eat shotting target // after 3 empty lives , game over


- enhance code structure with claude AI prompt //!todo
- enhance design to be responsive //!todo
- change background and objects color //!todo
- enhance instruction popup //!todo




ISSUES to be fixed
- 2 targets overlap each other 
- after creating collision check of dino and screen edge , 
the space between targets should be the same as the dino height to not have 2 target at sme time at screen edge 
*/

//restart not working [done]
// the score screen appear after game over [done]
