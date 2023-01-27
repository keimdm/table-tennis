let root = document.documentElement;
var currentX = 40;
var currentY = 190;
var velocityX = 5;
var velocityY = 5;
var borderRight = 600;
var borderLeft = 40;
var borderTop = 0;
var borderBottom = 400;
var ballWidth = 20;
var ballHeight = 20;
var gameRunning = false;
var refreshIntervalID = 0;

document.getElementById("status").innerHTML = "Press space to start";
root.style.setProperty('--positionX', currentX.toString() + 'px');
root.style.setProperty('--positionY', currentY.toString() + 'px');

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
            document.getElementById("status").innerHTML = "Paused";
        }
    }
  });

function runGame() {
    refreshIntervalID = setInterval(gameUpdate, 30)
}

function gameUpdate() {
    currentX = currentX + velocityX;
    root.style.setProperty('--positionX', currentX.toString() + 'px');
    currentY = currentY + velocityY;
    root.style.setProperty('--positionY', currentY.toString() + 'px');
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
}