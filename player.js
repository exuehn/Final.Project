class Player {
    constructor(sprites, startRow, startColumn, playerSize) {
      this.sprites = sprites;
      this.currentSprite = sprites.down;
  
      this.row = startRow;
      this.column = startColumn;
  
      this.x = startColumn * tileSize;
      this.y = startRow * tileSize;
      this.tx = this.x; //target position on x axis
      this.ty = this.y; //target position on y axis
  
      this.playerSize = playerSize;
  
      this.playerSpeed = playerSpeed;
  
      this.isMoving = false;
      this.moveDirection = "NONE";
      this.isFacing = "DOWN;";
    }
  
    display() {
      image(this.currentSprite, this.x, this.y, this.playerSize, this.playerSize);
    }
  
    setDirection() {
      //only update the move direction if the player has arrived at the target tile
      if (this.moveDirection == "NONE") {
        if (key == "w" && this.row > 0) {
          this.currentSprite = this.sprites.up;
          this.isFacing = "UP";
  
          //check if the tile we want to move to is walkable
          if (currentMap.collisionMap[this.row - 1][this.column] == 1) {
            this.moveDirection = "UP";
            this.ty = this.y - tileSize; //sets new target to one tile above the player
          }
        }
  
        if (key == "s" && this.row < numRows - 1) {
          this.currentSprite = this.sprites.down;
          this.isFacing = "DOWN";
  
          if (currentMap.collisionMap[this.row + 1][this.column] == 1) {
            this.moveDirection = "DOWN";
            this.ty = this.y + tileSize; //moving down
          }
        }
  
        if (key == "a" && this.column > 0) {
          this.currentSprite = this.sprites.left;
          this.isFacing = "LEFT";
  
          if (currentMap.collisionMap[this.row][this.column - 1] == 1) {
            this.moveDirection = "LEFT";
            this.tx = this.x - tileSize; //moving left
          }
        }
  
        if (key == "d" && this.column < numColumns - 1) {
          this.currentSprite = this.sprites.right;
          this.isFacing = "RIGHT";
  
          if (currentMap.collisionMap[this.row][this.column + 1] == 1) {
            this.moveDirection = "RIGHT";
            this.tx = this.x + tileSize; //moving right
          }
        }
      }
    }
  
    move() {
      //floor - mathematical rounding function, rounds down all the time
      this.row = floor(this.y / tileSize);
      this.column = floor(this.x / tileSize);
  
      //debugging purpose
      //fill(255, 0, 0);
      //textSize(20);
      //text(this.column + "," + this.row, 10, 25);
  
      if (this.moveDirection == "UP") {
        this.y -= this.playerSpeed;
  
        //check if we've reached the target position
        if (this.y <= this.ty) {
          this.y = this.ty;
  
          //check we've reached the target, update move direction to none
          this.moveDirection = "NONE";
        }
      }
  
      if (this.moveDirection == "DOWN") {
        this.y += this.playerSpeed;
  
        if (this.y >= this.ty) {
          this.y = this.ty;
  
          this.moveDirection = "NONE";
        }
      }
  
      if (this.moveDirection == "LEFT") {
        this.x -= this.playerSpeed;
  
        if (this.x <= this.tx) {
          this.x = this.tx;
  
          this.moveDirection = "NONE";
        }
      }
  
      if (this.moveDirection == "RIGHT") {
        this.x += this.playerSpeed;
  
        if (this.x >= this.tx) {
          this.x = this.tx;
  
          this.moveDirection = "NONE";
        }
      }
    }
  
    returnDialogueIndex() {
      let dialogueIndex = null; //by default, set it to null
  
      if (key == "e") {
        let targetRow;
        let targetColumn;
  
        if (this.isFacing == "UP") {
          targetRow = this.row - 1;
          targetColumn = this.column;
        }
  
        if (this.isFacing == "DOWN") {
          targetRow = this.row + 1;
          targetColumn = this.column;
        }
  
        if (this.isFacing == "LEFT") {
          targetRow = this.row;
          targetColumn = this.column - 1;
        }
  
        if (this.isFacing == "RIGHT") {
          targetRow = this.row;
          targetColumn = this.column + 1;
        }
  
        dialogueIndex = currentMap.dialogueMap[targetRow][targetColumn]; //getting the index of the target tile from the dialogueMap
        
        //if the chest has no keys, swap to open chest sprite
        if (currentMap.dialogueMap[targetRow][targetColumn] == 1) {
          spriteTile[targetRow][targetColumn].texture = sprites[4];
        }
        //if the chest has a key, remove sprite to show key, allow player to walk on it
        if (currentMap.dialogueMap[targetRow][targetColumn] == 2) {
          spriteTile[targetRow][targetColumn].texture = sprites[0];
          currentMap.collisionMap[targetRow][targetColumn] = [1];
        }
        
        
      }
  
      return dialogueIndex; //return the numerical value
    }
    
    setPos(row, column){
      
      this.moveDirection = "NONE";
      this.row = row;
      this.column = column;
      this.x = this.column * tileSize;
      this.y = this.row * tileSize;
      
    }
    
    returnTransitionIndex(){
      
      let transitionIndex = 0; //no transition
      
      if(this.moveDirection == "UP"){
        
        transitionIndex = currentMap.transitionMap[this.row - 1][this.column];
        
      }
      if(this.moveDirection == "DOWN"){
        
        transitionIndex = currentMap.transitionMap[this.row + 1][this.column];
        
      }
      if(this.moveDirection == "LEFT"){
        
        transitionIndex = currentMap.transitionMap[this.row][this.column - 1];
        
      }
      if(this.moveDirection == "RIGHT"){
        
        transitionIndex = currentMap.transitionMap[this.row][this.column + 1];
        
      }
      
      return transitionIndex;
      
    }
    
  }
  