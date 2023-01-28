let root = document.documentElement;

//generate random values - first for the Y position of the opponent paddle (and ball)
//and second to determine the direction the ball goes at first
var random1 =  Math.floor(Math.random() * 340);
var random2 = Math.random();

//set ball properties
var currentX = 580;
//assign ball height to center of opponent's paddle
var currentY = random1 + 20;
var velocityX = -5;
var velocityY = 0;
//use random2 to pick whether the ball goes up or down first
if (random2 < 0.5) {
    velocityY = 5;
}
else {
    velocityY = -5;
}
var ballWidth = 20;
var ballHeight = 20;

//set player location and height
var playerCurrentY = 0;
var playerVelocityY = 0;
var playerHeight = 60;

//set opponent location and heeight
var opponentCurrentY = random1;
var opponentHeight = 60;
var opponentVelocity = 4;
var opponentMoving = false;

//define borders
var borderRight = 600;
var borderLeft = 40;
var borderTop = 0;
var borderBottom = 400;
var centerX = 320;

var gameRunning = false;
var refreshIntervalID = 0;

document.getElementById("status").innerHTML = "Press space to start";
root.style.setProperty('--positionX', currentX.toString() + 'px');
root.style.setProperty('--positionY', currentY.toString() + 'px');
root.style.setProperty('--playerPositionY', playerCurrentY.toString() + 'px');
root.style.setProperty('--opponentPositionY', opponentCurrentY.toString() + 'px');

//check key presses
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        if (gameRunning === false) {
            document.getElementById("status").innerHTML = "";
            gameRunning = true;
            runGame();
        }
        else {
            clearInterval(refreshIntervalID);
            gameRunning = false;
            playerVelocityY = 0;
            document.getElementById("status").innerHTML = "Paused";
        }
    }
    if (event.code == 'ArrowDown') {
        if (gameRunning === true) {
            playerVelocityY = 4;
        }
    }
    if (event.code == 'ArrowUp') {
        if (gameRunning === true) {
            playerVelocityY = -4;
        }
    }
  });

  //check key releases
document.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowDown') {
        if (gameRunning === true) {
            playerVelocityY = 0;
        }
    }
    if (event.code == 'ArrowUp') {
        if (gameRunning === true) {
            playerVelocityY = 0;
        }
    }
  });

//main game loop
function runGame() {
    refreshIntervalID = setInterval(gameUpdate, 30)
}

//updates game
function gameUpdate() {
    //update ball position (both and and Y)
    currentX = currentX + velocityX;
    root.style.setProperty('--positionX', currentX.toString() + 'px');
    currentY = currentY + velocityY;
    root.style.setProperty('--positionY', currentY.toString() + 'px');
    //check collisions with walls
    if (currentX >= borderRight - ballWidth && velocityX > 0) {
        velocityX = velocityX * -1;
        opponentMoving = false;
    }
    else if (currentX <= borderLeft && velocityX < 0) {
        velocityX = velocityX * -1;
    }
    if (currentY >= borderBottom - ballHeight && velocityY > 0) {
        velocityY = velocityY * -1;
    }
    else if (currentY <= borderTop && velocityY < 0) {
        velocityY = velocityY * -1;
    }
    //check if ball should be moving
    if (currentX >= centerX && velocityX > 0) {
            opponentMoving = true;
    }
    //check player position and update if possible
    if (playerCurrentY + playerVelocityY >= borderTop && playerCurrentY + playerVelocityY <= borderBottom - playerHeight) {
        playerCurrentY = playerCurrentY + playerVelocityY;
        root.style.setProperty('--playerPositionY', playerCurrentY.toString() + 'px');
    }
    //check opponent position and update if possible
    if (opponentMoving === true) {
        if (opponentCurrentY + opponentHeight / 2 > currentY + ballHeight / 2 && opponentCurrentY - opponentVelocity >= borderTop) {
            console.log("Move up");
            opponentCurrentY = opponentCurrentY - opponentVelocity;
            root.style.setProperty('--opponentPositionY', opponentCurrentY.toString() + 'px');
        }
        else if (opponentCurrentY + opponentHeight / 2 < currentY + ballHeight / 2 && opponentCurrentY + opponentVelocity <= borderBottom) {
            console.log("Move down");
            opponentCurrentY = opponentCurrentY + opponentVelocity;
            root.style.setProperty('--opponentPositionY', opponentCurrentY.toString() + 'px');
        }
    }
}