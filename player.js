class Player {

    constructor (sprites, startRow, startColumn, playerSize) {

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
  
    display () {

      image(this.currentSprite, this.x, this.y, this.playerSize, this.playerSize);

    }
  
    setDirection (mykey) {

        let key = mykey; 
        
        if (this.moveDirection == "NONE") {

            if (key == "j" && this.row > 0) {
                
                this.currentSprite = this.sprites.up;
                this.isFacing = "UP";
        
                if (currentMap.collisionMap[this.row - 1][this.column] == 1) {

                    this.moveDirection = "UP";
                    this.ty = this.y - tileSize; 

                }

            }
    
            if (key == "v" && this.row < numRows - 1) {

                this.currentSprite = this.sprites.down;
                this.isFacing = "DOWN";
        
                if (currentMap.collisionMap[this.row + 1][this.column] == 1) {

                    this.moveDirection = "DOWN";
                    this.ty = this.y + tileSize; 

                }

            }
    
            if (key == "w" && this.column > 0) {

                this.currentSprite = this.sprites.left;
                this.isFacing = "LEFT";
        
                if (currentMap.collisionMap[this.row][this.column - 1] == 1) {

                    this.moveDirection = "LEFT";
                    this.tx = this.x - tileSize;

                }

            }
    
            if (key == "n" && this.column < numColumns - 1) {

                this.currentSprite = this.sprites.right;
                this.isFacing = "RIGHT";
        
                if (currentMap.collisionMap[this.row][this.column + 1] == 1) {

                    this.moveDirection = "RIGHT";
                    this.tx = this.x + tileSize; 

                }

            }

        }

    }
  
    move() {

        this.row = floor(this.y / tileSize);
        this.column = floor(this.x / tileSize);
    
        if (this.moveDirection == "UP") {

            this.y -= this.playerSpeed;

            if (this.y <= this.ty) {

                this.y = this.ty;
    
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
    
    setPos (row, column) {

        this.moveDirection = "NONE";
        this.row = row;
        this.column = column;
        this.x = this.column * tileSize;
        this.y = this.row * tileSize;

    }
    
    returnTransitionIndex () {
      
        let transitionIndex = 0; //no transition
        
        if (this.moveDirection == "UP") {
            
            transitionIndex = currentMap.transitionMap[this.row - 1][this.column];
            
        }

        if (this.moveDirection == "DOWN") {
            
            transitionIndex = currentMap.transitionMap[this.row + 1][this.column];
            
        }

        if (this.moveDirection == "LEFT") {
            
            transitionIndex = currentMap.transitionMap[this.row][this.column - 1];
            
        }

        if (this.moveDirection == "RIGHT") {
            
            transitionIndex = currentMap.transitionMap[this.row][this.column + 1];
            
        }
        
        return transitionIndex;
      
    }
    
  }
  