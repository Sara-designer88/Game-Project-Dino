class goodTarget {

constructor (yPosition){
   this.goodTargetNode = document.createElement("img")
  this.goodTargetNode.src = "./img/food.png"
  gameBoxNode.append(this.goodTargetNode)


  this.x = gameBoxNode.offsetWidth;
  this.y = yPosition
  this.width = 30
  this.height = 50
  this.moveSpeed = 5

  this.goodTargetNode.style.width =`${this.width}px`
  this.goodTargetNode.style.height =`${this.height}px`
  this.goodTargetNode.style.top =`${this.y}px`
  this.goodTargetNode.style.left =`${this.x}px`
  this.goodTargetNode.style.position = "absolute"
}
automaticMovement(){
    this.x -= this.moveSpeed;
    this.goodTargetNode.style.left = `${this.x}px`
}
}