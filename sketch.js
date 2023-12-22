//which level to put on
let level = 1;

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
let tileStart = false;
let numRows = 9;
let numColumns = 16;
let tileSize = 80;
let textures = [];
let tiles = [];
let player;
let playerSprites = {};
let playerSpeed = 3;

//level5
let showText = false;
let inpPaste = false;
let inpCopyText;
let ansPaste = "bradley said it only took 5 minutes to dream up the iconic combination";

//interaction counters
let noClick = 0;
let noMove = 0;
let noKeyPress = 0;
let noDelete = 0;

//sound effects
let clickedSound;
let movedSound;
let keySound;

//physical instructions
let texts = [

  "turn your mouse 180 degrees", 
  "turn your keyboard 180 degrees",
  "stand up",
  "turn your laptop around",
  "touch the floor",
  "sit down"

];
let textInstruc = false;
let displayedText;
let randomIndex;
let xPos;
let yPos;



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
    )

  };

  clickedSound = loadSound('assets/error.mp3');
  movedSound = loadSound('assets/startup.mp3');
  keySound = loadSound('assets/trash.mp3');

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
  player = new Player(playerSprites, 0, 0, tileSize, 4);
  
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

  }

  if (level == 5) {

    copyPaste();

    image(cursor, cursorX, cursorY, 10, 15);

  }

  if (level == 6) {

    instruction();

    image(cursor, cursorX, cursorY, 10, 15);

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

        level = 6;

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

    if (noCircles == 6) {

      level = 6;
      noCircles = 0;

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
    
    textOne = true;

  }

  //code for second textbox
  if (textTwo == false) {

    inpTwo = createInput('');
    inpTwo.size(200);
    inpTwo.id('inpTwoPos');

    textTwo = true;

  }

  //code for third textbox
  if (textThree == false) {

    inpThree = createInput('');
    inpThree.size(200);
    inpThree.id('inpThreePos');

    textThree = true;

  }

  //code for fourth textbox
  if (textFour == false) {

    inpFour = createInput('');
    inpFour.size(200);
    inpFour.id('inpFourPos');

    textFour = true;

  }

  //code for fifth textbox
  if (textFive == false) {

    inpFive = createInput('');
    inpFive.size(200);
    inpFive.id('inpFivePos');

    textFive = true;

  }

  //code for sixth textbox
  if (textSix == false) {

    inpSix = createInput('');
    inpSix.size(200);
    inpSix.id('inpSixPos');

    textSix = true;

  }

  //if all answers are correct, move to next level
  if (correctOne && 
    correctTwo && 
    correctThree && 
    correctFour &&
    correctFive &&
    correctSix == true) {

    level = 6; 

    //removing text box before next level
    inpOne.remove();
    inpTwo.remove();
    inpThree.remove();
    inpFour.remove();
    inpFive.remove();
    inpSix.remove();

  }

}

//functions for maze
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

  currentMap = map; 

  numRows = currentMap.textureMap.length;
  numColumns = currentMap.textureMap[0].length;

  for (let row = 0; row < numRows; row++) {

    tiles[row] = []; 

    for (let col = 0; col < numColumns; col++) {

      let tileID = currentMap.textureMap[row][col]; 
      tiles[row][col] = new Tile(textures[tileID], row, col, tileSize); 

    }

  }

}

function handleTransition() {

  if (player.returnTransitionIndex() == 1) {
    
    player.setPos(0, 0);
    level = 6;

  }

}
//end of function for maze

function copyPaste() {

  background (255, 0, 255);

  cursorX = mouseX;
  cursorY = mouseY;

  if (showText == false) {

    createElement('p', 'bradley said it only took 5 minutes to dream up the iconic combination').id('copyText');

    showText = true;

  }

  if (inpPaste == false) {

    //creating input and adjusting position
    inpCopyText = createInput('');
    inpCopyText.size(200);
    inpCopyText.id('inpTextPos');

    //checking if input is the correct answer
    inpCopyText.input(() => {

      if (inpCopyText.value() == ansPaste) {

        showText = false;
        inpPaste = false;

        level = 6;
        inpCopyText.remove();
        document.getElementById('copyText').remove();

      } 
      
    });

    inpPaste = true;

  }
  
}

function instruction() {

  background(r, g, b);

  cursorX = mouseX;
  cursorY = mouseY;

  textFont('Times New Roman');
  select('canvas').elt.style.letterSpacing = "1px";
  fill(255);
  textSize(32);
  noStroke();
  textAlign(LEFT, BOTTOM);

  if (textInstruc == false) {

    randomIndex = int(random(0, 6));

    xPos = random(20, width - 300);
    yPos = random(10, height);

    textInstruc = true;

  }

  displayedText = texts[randomIndex];
  text(displayedText, xPos, yPos);

}


//functions for the counters
function mousePressed() {

  noClick ++;

  if (!clickedSound.isPlaying()) {

    clickedSound.play();

  }

  if (level == 6) {

    level = int(random(1, 6));

    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);

    textInstruc = false;

  }

}

function mouseMoved() {

  noMove ++;

  if (!movedSound.isPlaying()) {
    
    movedSound.play();

  }

}

function keyPressed() {

  noKeyPress ++;

  if (!keySound.isPlaying()) {

    keySound.play();

  }

  if (keyCode === 8) {

    noDelete ++;

  }

  if (level == 3) {

    //Define key replacements
    const keyReplacements = {
      'q': 'a',
      'w': 'b',
      'e': 'c',
      'r': 'd',
      't': 'e',
      'y': 'f',
      'u': 'g',
      'i': 'h',
      'o': 'i',
      'p': 'j',
      'a': 'k',
      's': 'l',
      'd': 'm',
      'f': 'n',
      'g': 'o',
      'h': 'p',
      'j': 'q',
      'k': 'r',
      'l': 's',
      'z': 't',
      'x': 'u',
      'c': 'v',
      'v': 'w',
      'b': 'x',
      'n': 'y',
      'm': 'z'
    };

    //Store original input values
    let originalInputOneValue = inpOne.value();
    let originalInputTwoValue = inpTwo.value();
    let originalInputThreeValue = inpThree.value();
    let originalInputFourValue = inpFour.value();
    let originalInputFiveValue = inpFive.value();
    let originalInputSixValue = inpSix.value();

    //First input box
    inpOne.input(() => {
      if (keyCode === BACKSPACE) {

        inpOne.value(originalInputOneValue.slice(0, -1));

      } else {

        inpOne.value(originalInputOneValue + (keyReplacements[key] || key));

      }

      originalInputOneValue = inpOne.value();

      if (inpOne.value() == ansOne) {

        correctOne = true;

      } else {

        correctOne = false;

      }

    });

    //Second input box
    inpTwo.input(() => {

      if (keyCode === BACKSPACE) {

        inpTwo.value(originalInputTwoValue.slice(0, -1));

      } else {

        inpTwo.value(originalInputTwoValue + (keyReplacements[key] || key));

      }

      originalInputTwoValue = inpTwo.value();

      if (inpTwo.value() == ansTwo) {

        correctTwo = true;

      } else {

        correctTwo = false;

      }

    });

    // Third input box
    inpThree.input(() => {

      if (keyCode === BACKSPACE) {

        inpThree.value(originalInputThreeValue.slice(0, -1));

      } else {

        inpThree.value(originalInputThreeValue + (keyReplacements[key] || key));

      }

      originalInputThreeValue = inpThree.value();

      if (inpThree.value() == ansThree) {

        correctThree = true;

      } else {

        correctThree = false;

      }

    });

    // Fourth input box
    inpFour.input(() => {

      if (keyCode === BACKSPACE) {

        inpFour.value(originalInputFourValue.slice(0, -1));

      } else {

        inpFour.value(originalInputFourValue + (keyReplacements[key] || key));

      }

      originalInputFourValue = inpFour.value();

      if (inpFour.value() == ansFour) {

        correctFour = true;

      } else {

        correctFour = false;

      }

    });

    // Fifth input box
    inpFive.input(() => {

      if (keyCode === BACKSPACE) {

        inpFive.value(originalInputFiveValue.slice(0, -1));

      } else {

        inpFive.value(originalInputFiveValue + (keyReplacements[key] || key));

      }

      originalInputFiveValue = inpFive.value();

      if (inpFive.value() == ansFive) {

        correctFive = true;

      } else {

        correctFive = false;

      }

    });

    // Sixth input box
    inpSix.input(() => {

      if (keyCode === BACKSPACE) {

        inpSix.value(originalInputSixValue.slice(0, -1));

      } else {

        inpSix.value(originalInputSixValue + (keyReplacements[key] || key));

      }

      originalInputSixValue = inpSix.value();

      if (inpSix.value() == ansSix) {

        correctSix = true;

      } else {

        correctSix = false;

      }

    });

  }
  
  //for tilemap level
  player.setDirection(key); 
  handleTransition();

  if (level == 5) {

    if (document.activeElement === inpCopyText.elt) {
      
      return false;

    }

  }
  
}


