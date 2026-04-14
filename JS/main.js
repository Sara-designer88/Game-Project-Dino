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
let keys= {};

//Functions

function gameStart() {
  //hiding the start screen and show the game screen after click on start button
  startScreen.style.display = "none";
  gameScreen.style.display = "flex";

  //starting the main game interval
  gameIntervalId = setInterval(gameLoop, Math.floor(1000 / 60));

  //create obj from the class dino
  dinoObj = new dino();
  // Note : new goodTarget (); we will not create the object bcz we want to add it to the spawn 
  
  // intialize the other interval for the good target
  goodTargetspawnIntervalId = setInterval(spawnGoodTarget,2000)
}

function gameLoop() {
 
  // this will move the dino smoothly after creating the object and call the move function
  dinoObj.move({ 
      left: keys["ArrowLeft"],
    right: keys["ArrowRight"],
    up: keys["ArrowUp"],
    down: keys["ArrowDown"]
  });

 // loop inside the good target array to move it 
  goodTargetArr.forEach((newgoodTargetObj)=> {
  newgoodTargetObj.automaticMovement();
 })

 eatGoodTarget()



}

function spawnGoodTarget (){
  let yPosition = Math.floor(Math.random()* (gameBoxNode.offsetHeight - 100))
  let newGoodTarget = new goodTarget (yPosition)
  goodTargetArr.push(newGoodTarget)

}


function eatGoodTarget (){
  goodTargetArr.forEach((goodTargetObj,index)=> {
    let isColliding = collectionCheck(dinoObj,goodTargetObj)
        if (isColliding === true){ // if good target touch the dino , will be destroyed
      goodTargetObj.goodTargetNode.remove();
      goodTargetArr.splice(index,1)
      //console.log("item exist dino ")
     
      // maximize score by 1 
    }
    else if(goodTargetObj.x + goodTargetObj.width <= 0){ // if good target touch the screen , will be destroyed 
      goodTargetObj.goodTargetNode.remove();
      goodTargetArr.splice(index,1)
      //console.log("item exist screen ")
    }
  })

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



//Event listener
startBtn.addEventListener("click", gameStart);

document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.key] = false;
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

/*
jasminetest : 
Describe (){


}




*/