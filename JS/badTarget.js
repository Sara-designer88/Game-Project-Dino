class badTarget {

constructor (){
    this.badTargetNode = document.createElement("img")
  this.badTargetNode.src = "./img/enemy.png"
  gameBoxNode.append(this.badTargetNode)


  this.x = 550
  this.y = randomPosition
  this.width = 30
  this.height = 50
  this.moveSpeed = 2

  this.badTargetNode.style.width =`${this.width}px`
  this.badTargetNode.style.height =`${this.height}px`
  this.badTargetNode.style.top =`${this.y}px`
  this.badTargetNode.style.left =`${this.x}px`
  this.badTargetNode.style.position = "absolute"
}

automaticMovement(){
    this.x -= this.moveSpeed;
    this.badTargetNode.style.left = `${this.x}px`
}


}