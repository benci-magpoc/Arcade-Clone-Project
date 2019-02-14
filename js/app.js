// playerScore variable, adds 100 for successfule passing, deduct 50 if enemy hit
let playerScore = 0;

// playerLives variable starts with 3
let playerLives = 3;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {

  //enemy coordinates
  this.x = x;
  this.y = y;

  //enemy speed
  this.speed = speed;

  //enemy sprites
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    //multiply speed with time delta
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

  // checks if enemy is out of bounds
  if (this.x > 500) {

    // sets enemy position to the other side of the screen
    this.x = -101;

    // randomize enemy speed by increments of 20
    this.speed = 200 + (Math.ceil(Math.random() * 10) * 20);
  }

  //lives variable to update how many lives the player has
  let lives = document.getElementById('playerLives');

  // assigning variables for enemy boundary
  const enemyTopBoundary = this.y - 60,
        enemyBottomBoundary = this.y + 60,
        enemyLeftBoundary = this.x - 80,
        enemyRightBoundary = this.x + 80;

  //collision logic
  if (player.y > enemyTopBoundary && player.y < enemyBottomBoundary &&
      player.x > enemyLeftBoundary && player.x < enemyRightBoundary) {
      // reset Player position
      playerLives--;
      lives.innerHTML = playerLives;

      if(playerLives === 0) {

        alert('You have run out of lives. Please try again');

        //reloads the game
        location.reload();
      }
      player.resetPlayer();
    }

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}; // end enemy render method

// player constructor
var Player = function(x, y) {

  // player position on the tileset
  this.x = x;
  this.y = y;

  // player sprite definition
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {

  // updates the player position
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {

  // score updates the player score
  let score = document.getElementById('playerScore');

  switch (keyPressed) {
    case 'left':
      this.x = (this.x === 0) ? 0 : this.x -= 101;
      break;
    case 'right':
      this.x = (this.x === 404) ? 404 : this.x += 101;
      break;
    case 'up':
      if (this.y === 72) {

        // adds 100 pts to score if character crosses the river
        playerScore += 100;
        score.innerHTML = playerScore;

        // check if player gets 500 points
        if (Number(playerScore) >= 500) {

          // gets player lives remaining
          let lives = document.getElementById('playerLives');

          // call gameFinish function to ask player for another game
          gameFinish(lives.innerHTML, playerScore);
        }

        // reset player position
        this.resetPlayer();
      }
      else { this.y -= 83; }
      break;
    case 'down':
      this.y = (this.y === 404) ? 404 : this.y += 83;
      break;
    default:
  }
//touchHold = false;
}

// resets player if enemy is hit or passed the river
Player.prototype.resetPlayer = function() {
  this.x = 202;
  this.y = 404;
};

// instantiating enemies
var allEnemies = [new Enemy(0, 60, 300), new Enemy(0, 145, 200), new Enemy(0, 230, 400)];

// instantiating player object
var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {

  // sets up keyboard hit values
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

//touchHold = false;

function gameFinish(lives, score) {
  var gameReset = confirm("Congratulations!\nYou have beat the game. " +
                          "\nYour score is: " + score + " Remaining lives: " + lives +
                          "\nPress OK to play again!!!");

  if (gameReset) location.reload();
}

// event listener for touch events
document.addEventListener('touchstart', function(e) {

  // moveX and moveY tracks where the touches are
  let moveX = e.targetTouches[0].clientX;
  let moveY = e.targetTouches[0].clientY;

  // playerX and playerY is where the player is located
  let playerX = 250 + player.x;
  let playerY = 115 + player.y;

  // deltaX and deltaY tracks the change of touch directions
  let deltaX = moveX - playerX;
  let deltaY = moveY - playerY;

  allowedKeys = '';
  //touchHold = true;

  // checks if player intends to change directions
  if(deltaX > 0 && deltaY < 500 && deltaY > -500){
    if(deltaY > 100) {
      allowedKeys = 'down';
      player.handleInput(allowedKeys);
    }
    else if(deltaY < 0) {
      allowedKeys = 'up';
      player.handleInput(allowedKeys);

    }
    else {
      allowedKeys = 'right';
      player.handleInput(allowedKeys);
    }
  }
  else if(deltaX < 0) {
    if(deltaY > 100) {
      allowedKeys = 'down';
      player.handleInput(allowedKeys);
    }
    else if(deltaY < 0){
      allowedKeys = 'up';
      player.handleInput(allowedKeys);
    }
    else {
      console.log('move left');
      allowedKeys = 'left';
      player.handleInput(allowedKeys);
    }
  }

e.stopImmediatePropagation();

});
