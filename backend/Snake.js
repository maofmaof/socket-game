

module.exports = class Snake {

     constructor(xPosition, yPosition, body, clientID) {
          this.xPosition = xPosition;
          this.yPosition = yPosition;
          this.clientID = clientID
          this.direction = "e"
          this.blockSize = 20;
          this.body = body;
     }
     handleDirection(snakeDirection) {

          if (this.clientID == snakeDirection.clientID) {
               this.direction = snakeDirection.direction;
          }
     }
     checkBounds() {

          if (this.xPosition > canvasWidth || this.xPosition < 0) {

          }
          if (this.yPosition > canvasHeight || this.yPosition < 0) {

          }
     }
     checkCollision(allTakenPositions) {

          for (let i = 0; i < allTakenPositions.length; i++) {

               if (this.xPosition == allTakenPositions[i].x && this.yPosition == allTakenPositions[i].y) {
                    console.log(this.clientID + " is dead ")
               }
          }
     }
     updatePosition() {

          if (this.direction == "e") {
               this.xPosition = this.xPosition + this.blockSize;

          }
          if (this.direction == "w") {
               this.xPosition = this.xPosition - this.blockSize;

          }
          if (this.direction == "n") {
               this.yPosition = this.yPosition - this.blockSize;

          }
          if (this.direction == "s") {
               this.yPosition = this.yPosition + this.blockSize;

          }
          this.body.push({ x: this.xPosition, y: this.yPosition })
          //this.body.shift() för att inte ta bort


     }
}