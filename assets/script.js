let root = document.documentElement;

//generate random values - first for the Y position of the opponent paddle (and ball)
//and second to determine the direction the ball goes at first
var random1 = Math.floor(Math.random() * 340 / 4) * 4;
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
var playerCurrentY = 172;
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

var playerScore = 0;
var computerScore = 0;

var gameOver = false;
var gameRunning = false;
var refreshIntervalID = 0;

var hitClip = new Audio('./assets/biu.mp3');
var playerPointClip = new Audio('./assets/playerPoint.mp3');
var playerWinClip = new Audio('./assets/playerWin.mp3');
var computerPointClip = new Audio('./assets/computerPoint.mp3');
var computerWinClip = new Audio('./assets/computerWin.mp3');

document.getElementById("status").innerHTML = "Press space to start";
document.getElementById("playerScore").innerHTML = playerScore;
document.getElementById("computerScore").innerHTML = computerScore;

root.style.setProperty('--positionX', currentX.toString() + 'px');
root.style.setProperty('--positionY', currentY.toString() + 'px');
root.style.setProperty('--playerPositionY', playerCurrentY.toString() + 'px');
root.style.setProperty('--opponentPositionY', opponentCurrentY.toString() + 'px');

//check key presses
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        if (gameOver == false) {
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
        else {
            //reset game
            random1 = Math.floor(Math.random() * 340 / 4) * 4;
            random2 = Math.random();

            currentX = 580;
            currentY = random1 + 20;
            velocityX = -5;
            velocityY = 0;
            if (random2 < 0.5) {
                velocityY = 5;
            }
            else {
                velocityY = -5;
            }

            playerCurrentY = 172;
            playerVelocityY = 0;
            playerHeight = 60;

            opponentCurrentY = random1;
            opponentHeight = 60;
            opponentVelocity = 4;
            opponentMoving = false;

            playerScore = 0;
            computerScore = 0;

            gameOver = false;
            gameRunning = false;
            refreshIntervalID = 0;

            document.getElementById("status").innerHTML = "Press space to start";
            document.getElementById("playerScore").innerHTML = playerScore;
            document.getElementById("computerScore").innerHTML = computerScore; 
            
            root.style.setProperty('--positionX', currentX.toString() + 'px');
            root.style.setProperty('--positionY', currentY.toString() + 'px');
            root.style.setProperty('--playerPositionY', playerCurrentY.toString() + 'px');
            root.style.setProperty('--opponentPositionY', opponentCurrentY.toString() + 'px');
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
    //check it's not out of bounds
    if (currentY < borderTop) {
        currentY = borderTop;
    }
    else if (currentY + ballHeight > borderBottom) {
        currentY = borderBottom - ballHeight;
    }
    //check collisions with walls
    if (currentX >= borderRight - ballWidth && velocityX > 0) {
        velocityX = velocityX * -1;
        opponentMoving = false;
        //check collision with opponent paddle
        if (currentY < opponentCurrentY - ballHeight + 1 || currentY > opponentCurrentY + opponentHeight + ballHeight - 1) {
            clearInterval(refreshIntervalID);
            playerScore = playerScore + 1;
            document.getElementById("playerScore").innerHTML = playerScore;
            document.getElementById("status").innerHTML = "You scored! Press space to continue";
            gameRunning = false;
            playerVelocityY = 0;
            currentY = opponentCurrentY + 20;
            if (playerScore >= 3) {
                gameOver = true;
                document.getElementById("status").innerHTML = "You win! Press space to play again";
                playerWinClip.play();
            }
            else {
                playerPointClip.play();
            }
        }
        else {
            hitClip.play();
        }
    }
    else if (currentX <= borderLeft && velocityX < 0) {
        velocityX = velocityX * -1;
        //check collision with player paddle
        if (currentY < playerCurrentY - ballHeight + 1 || currentY > playerCurrentY + playerHeight + ballHeight - 1) {
            clearInterval(refreshIntervalID);
            computerScore = computerScore + 1;
            document.getElementById("computerScore").innerHTML = computerScore;
            document.getElementById("status").innerHTML = "The computer scored! Press space to continue";
            gameRunning = false;
            playerVelocityY = 0;
            currentY = playerCurrentY + 20;
            if (computerScore >= 3) {
                gameOver = true;
                document.getElementById("status").innerHTML = "The computer wins! Press space to play again";
                computerWinClip.play();
            }
            else {
                computerPointClip.play();
            }
        }
        else {
            hitClip.play();
        }
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