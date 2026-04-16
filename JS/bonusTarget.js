class bonusTarget {

constructor (xposition, yPosition){
   this.bonusTargetNode = document.createElement("img")
  this.bonusTargetNode.src = "./img/bonusTarget.gif"
  gameBoxNode.append(this.bonusTargetNode)


  this.x = xposition
  this.y = yPosition
  this.width = 70
  this.height = 50


  this.bonusTargetNode.style.width =`${this.width}px`
  this.bonusTargetNode.style.height =`${this.height}px`
  this.bonusTargetNode.style.top =`${this.y}px`
  this.bonusTargetNode.style.left =`${this.x}px`
  this.bonusTargetNode.style.position = "absolute"
}
bonusTargetShow(){

  this.bonusTargetNode.style.display = "block"
}

bonusTargetHide(){

  this.bonusTargetNode.style.display = "none"
}


}