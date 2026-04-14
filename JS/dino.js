class dino {

constructor (){
    //create the dino element inside the gamebox
  this.dinoNode = document.createElement("img")
  this.dinoNode.src = "./img/dino.png"
  gameBoxNode.append(this.dinoNode)


  this.x = 100
  this.y = 200
  this.width = 120
  this.height = 150
  this.moveSpeed = 5

  this.dinoNode.style.width =`${this.width}px`
  this.dinoNode.style.height =`${this.height}px`
  this.dinoNode.style.top =`${this.y}px`
  this.dinoNode.style.left =`${this.x}px`
  this.dinoNode.style.position = "absolute"
}

move(keys) {
  if (keys.left) this.x -= this.moveSpeed;
  if (keys.right) this.x += this.moveSpeed;
  if (keys.up) this.y -= this.moveSpeed;
  if (keys.down) this.y += this.moveSpeed;

  this.dinoNode.style.left = `${this.x}px`;
  this.dinoNode.style.top = `${this.y}px`;
}


}