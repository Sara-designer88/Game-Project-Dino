class dino {

constructor (){
    //create the dino element inside the gamebox
  this.dinoNode = document.createElement("img")
  this.dinoNode.src = "./img/dino.png"
  gameBoxNode.append(this.dinoNode)


  this.x = 50
  this.y = 170
  this.width = 120
  this.height = 150
  this.moveSpeed = 2

  this.dinoNode.style.width =`${this.width}px`
  this.dinoNode.style.height =`${this.height}px`
  this.dinoNode.style.top =`${this.y}px`
  this.dinoNode.style.left =`${this.x}px`
  this.dinoNode.style.position = "absolute"
}

move(){
    if (this.y >= 0){
     this.y -= this.moveSpeed;
    this.node.style.top = `${this.y}px`
    }
    if (this.x <=0){
        this.x += this.moveSpeed
        this.dinoNode.style.left = `${this.x}px`
    }
}

}