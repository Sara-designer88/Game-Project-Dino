class shootTarget {
  constructor(xPosition) {
    this.shootTargetNode = document.createElement("img");
    this.shootTargetNode.src = "./img/egg.png";
    gameBoxNode.append(this.shootTargetNode);

    this.x = xPosition;
    this.y = 0;
    this.width = 30;
    this.height = 50;
    this.moveSpeed = 2;

    this.shootTargetNode.style.width = `${this.width}px`;
    this.shootTargetNode.style.height = `${this.height}px`;
    this.shootTargetNode.style.top = `${this.y}px`;
    this.shootTargetNode.style.left = `${this.x}px`;
    this.shootTargetNode.style.position = "absolute";
  }
  automaticMovement() {
    this.y += this.moveSpeed;
    this.shootTargetNode.style.top = `${this.y}px`;
  }
}
