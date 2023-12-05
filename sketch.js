//which level to put on
let level = 4;

//x & y coordinates
let x;
let y;

//cursor
let cursor;
let cursorX;
let cursorY;

//level2 buttons
let d;
let cirX;
let cirY;
let r;
let g;
let b;
let noCircles = 0;

//level3 inputs
  //first text box
let textOne = false;
let inpOne;
let ansOne = "world wide web";
let correctOne = false;
  //second text box
let textTwo = false;
let inpTwo;
let ansTwo = "hypermedia";
let correctTwo = false;
  //third text box
let textThree = false;
let inpThree;
let ansThree = "information";
let correctThree = false;
  //fourth text box
let textFour = false;
let inpFour;
let ansFour = "universal";
let correctFour = false;
  //fifth text box
let textFive = false;
let inpFive;
let ansFive = "access";
let correctFive = false;
  //sixth text box
let textSix = false;
let inpSix;
let ansSix = "documents";
let correctSix = false;


//level4 tilemap
let numRows = 9;
let numColumns = 16;
let tileSize = 80;
let textures = [];

let tiles = [];

let player; //to refer to the Player class
let playerSprites = {}; //for luna's left right front and back images
let playerSpeed = 3;


//interaction counters
let noClick = 0;
let noMove = 0;
let noKeyPress = 0;
let noDelete = 0;

function preload() {

  cursor = loadImage("assets/cursor.png");

  textures[0] = loadImage(
    "assets/floor.png"
  );
  textures[1] = loadImage(
    "assets/wallup.png"
  );
  textures[2] = loadImage(
    "assets/wallside.png"
  );

  playerSprites = {
    up: loadImage(
      "assets/mouseup.png"
    ),
    down: loadImage(
      "assets/mousedown.png"
    ),
    left: loadImage(
      "assets/mouseleft.png"
    ),
    right: loadImage(
      "assets/mouseright.png"
    ),
  };

}

function setup() {

  createCanvas(1280, 720);


  x = width/2;
  y = height/2;

  cursorX = mouseX;
  cursorY = mouseY;

  d = int(random(10, 200));
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  cirX = int(random(0 + d/2, 1280 - d/2));
  cirY = int(random(0 + d/2, 720 - d/2));

  buildMap (map);
  
}

function draw() {

  background(200);

  //summoning the levels
  if (level == 1) {

    startButton();

    //summoning the cursor
    image(cursor, cursorX, cursorY, 10, 15);

  }

  if (level == 2) {

    pressButtons();

    image(cursor, cursorX, cursorY, 10, 15);

    //show counter data on screen
    noStroke();
    textSize(80);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0, 100);
    text(noClick, cirX, y);
    fill(0, 255, 0, 100);
    text(noMove, x, cirY);
    fill(255, 0, 255, 100);
    text(noKeyPress, cirX/2, y);
    fill(255, 255, 0, 100);
    text(noDelete, x, cirY/2);

  }

  if (level == 3) {

    typeWords();

    image(cursor, cursorX, cursorY, 10, 15);

    noStroke();
    textSize(80);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0, 100);
    text(noClick, cursorX, cursorY/2.1);
    fill(0, 255, 0, 100);
    text(noMove, cursorX/0.7, cursorY);
    fill(0, 0, 255, 100);
    text(noKeyPress, cursorX/2.4, cursorY);
    fill(255, 0, 255, 100);
    text(noDelete, cursorX, cursorY/0.5);

  }

  if (level == 4) {

    tileMaze();

    image(cursor, cursorX, cursorY, 10, 15);

    player = new Player(playerSprites, 0, 0, tileSize, 4);
    

  }

  

}

function startButton() {

  background(200);

  //inverting cursor
  cursorX = width - mouseX;
  cursorY = height - mouseY;

  //when clicked on the button, itll bring up the next level
  if (mouseIsPressed == true) {
    
    if (mouseX > x - 100
      && mouseX < x + 100
      && mouseY > y - 25
      && mouseY < y + 25){

        level = 2;

      }
    
  }

  //start button
  rectMode(CENTER);
  stroke(100);
  strokeWeight(4);
  fill(150);
  rect(x, y, 200, 50);

  if (mouseX > x){

    textFont('Times New Roman');
    select('canvas').elt.style.letterSpacing = "8px";
    textSize(32);
    noStroke();

    textAlign(RIGHT, BOTTOM);
    fill(255, 0, 0);
    text('START', x, y);

    textAlign(LEFT, TOP);
    fill(0, 255, 0);
    text('START', x, y);

  } else {

    textFont('Times New Roman');
    select('canvas').elt.style.letterSpacing = "8px";
    textSize(32);
    noStroke();

    textAlign(RIGHT, BOTTOM);
    fill(0, 255, 0);
    text('START', x, y);

    textAlign(LEFT, TOP);
    fill(255, 0, 0);
    text('START', x, y);

  } 

}

function pressButtons() {

  background(0, 0, 255);
  
  cursorX = width - mouseX;
  cursorY = height - mouseY;

  fill(r, g, b);
  noStroke();
  ellipse(cirX, cirY, d, d);

  let distance = dist(cursorX, cursorY, cirX, cirY);

  if(distance < d/2) {

    if (noCircles == 1) {

      level = 3;

    } else {

      noCircles ++;

      d = int(random(10, 200));

      cirX = int(random(0 + d/2, 1280 - d/2));
      cirY = int(random(0 + d/2, 720 - d/2));
      
      r = random(0, 255);
      g = random(0, 255);
      b = random(0, 255);
      
      fill(r, g, b);

    }
    
  }

}

function typeWords() {

  background(255, 255, 0);

  cursorX = mouseX;
  cursorY = mouseY;

  textFont('Times New Roman');
  select('canvas').elt.style.letterSpacing = "3px";
  textSize(32);
  noStroke();
  textAlign(TOP, BOTTOM);

  fill(255, 0, 0);
  text('world wide web', x - 400, y - 200);

  fill(0, 0, 255);
  text('hypermedia', x + 320, y - 280);

  fill(0, 255, 0);
  text('information', x + 25, y - 100);

  fill(0, 0, 255);
  text('universal', x - 300, y + 75);

  fill(255, 0, 0);
  text('access', x + 350, y + 25);

  fill(0, 255, 0);
  text('documents', x + 150, y + 250);

  //code for first textbox
  if (textOne == false) {

    //creating input and adjusting position
    inpOne = createInput('');
    inpOne.size(200);
    inpOne.id('inpOnePos');

    //checking if input is the correct answer
    inpOne.input(() => {

      if (inpOne.value() == ansOne) {

        correctOne = true;

      } else {

        correctOne = false;
      }
      
    });

    textOne = true;

  }

  //code for second textbox
  if (textTwo == false) {

    inpTwo = createInput('');
    inpTwo.size(200);
    inpTwo.id('inpTwoPos');

    inpTwo.input(() => {

      if (inpTwo.value() == ansTwo) {

        correctTwo = true;

      } else {

        correctTwo = false;
      }
      
    });

    textTwo = true;

  }

  //code for third textbox
  if (textThree == false) {

    inpThree = createInput('');
    inpThree.size(200);
    inpThree.id('inpThreePos');

    inpThree.input(() => {

      if (inpThree.value() == ansThree) {

        correctThree = true;

      } else {

        correctThree = false;
      }
      
    });

    textThree = true;

  }

  //code for fourth textbox
  if (textFour == false) {

    inpFour = createInput('');
    inpFour.size(200);
    inpFour.id('inpFourPos');

    inpFour.input(() => {

      if (inpFour.value() == ansFour) {

        correctFour = true;

      } else {

        correctFour = false;
      }
      
    });

    textFour = true;

  }

  //code for fifth textbox
  if (textFive == false) {

    inpFive = createInput('');
    inpFive.size(200);
    inpFive.id('inpFivePos');

    inpFive.input(() => {

      if (inpFive.value() == ansFive) {

        correctFive = true;

      } else {

        correctFive = false;
      }
      
    });

    textFive = true;

  }

  //code for sixth textbox
  if (textSix == false) {

    inpSix = createInput('');
    inpSix.size(200);
    inpSix.id('inpSixPos');

    inpSix.input(() => {

      if (inpSix.value() == ansSix) {

        correctSix = true;

      } else {

        correctSix = false;
      }
      
    });

    textSix = true;

  }
  


  //if all answers are correct, move to next level
  if (correctOne && 
    correctTwo && 
    correctThree && 
    correctFour &&
    correctFive &&
    correctSix == true) {

    level = 4;

    //removing text box before next level
    inpOne.remove();
    inpTwo.remove();
    inpThree.remove();
    inpFour.remove();
    inpFive.remove();
    inpSix.remove();

  }

}

function tileMaze() {

  background(130);

  cursorX = mouseX;
  cursorY = mouseY;

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      tiles[row][col].display();
    }
  }

  player.move();
  player.display();


}

function buildMap(map) {
  currentMap = map; //set the currently displayed map

  numRows = currentMap.textureMap.length;
  numColumns = currentMap.textureMap[0].length;

  for (let row = 0; row < numRows; row++) {
    tiles[row] = []; //initialise a new array for every row--this will refer to each column of tiles in our current row
    //spriteTile[row] = [];

    for (let col = 0; col < numColumns; col++) {
      let tileID = currentMap.textureMap[row][col]; //get the ID of the current texture from our tileMap
      tiles[row][col] = new Tile(textures[tileID], row, col, tileSize); //initialise a new tile at the current row and column

      //let spriteID = currentMap.spriteMap[row][col];
      //spriteTile[row][col] = new Tile(sprites[spriteID], row, col, tileSize);
    }
  }
}








//functions for the counters
function mousePressed() {

  noClick ++;

}
function mouseMoved() {

  noMove ++;

}
function keyPressed() {

  noKeyPress ++;

  if (keyCode === 8) {

    noDelete ++;

  }

  

}
