let root = document.documentElement;
var currentX = 40;
var currentY = 190;
var velocityX = 5;
var velocityY = 5;
var ballWidth = 20;
var ballHeight = 20;

var playerCurrentY = 0;
var playerVelocityY = 0;
var playerHeight = 60;

var borderRight = 600;
var borderLeft = 40;
var borderTop = 0;
var borderBottom = 400;

var gameRunning = false;
var refreshIntervalID = 0;

document.getElementById("status").innerHTML = "Press space to start";
root.style.setProperty('--positionX', currentX.toString() + 'px');
root.style.setProperty('--positionY', currentY.toString() + 'px');
root.style.setProperty('--playerPositionY', playerCurrentY.toString() + 'px');

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
    //check player position and update if possible
    if (playerCurrentY + playerVelocityY >= borderTop && playerCurrentY + playerVelocityY <= borderBottom - playerHeight) {
        playerCurrentY = playerCurrentY + playerVelocityY;
        root.style.setProperty('--playerPositionY', playerCurrentY.toString() + 'px');
    }
}