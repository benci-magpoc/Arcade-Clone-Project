let playerScore = 0;
let playerLives = 3;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if (this.x > 500) {
      this.x = -101;
      this.speed = 200 + (Math.ceil(Math.random() * 10) * 20);
    }

    let lives = document.getElementById('playerLives');

    // assigning variables for enemy boundary
    const enemyTopBoundary = this.y - 60,
          enemyBottomBoundary = this.y + 60,
          enemyLeftBoundary = this.x - 80,
          enemyRightBoundary = this.x + 80;

    if (player.y > enemyTopBoundary && player.y < enemyBottomBoundary &&
        player.x > enemyLeftBoundary && player.x < enemyRightBoundary) {
        // reset Player position
        playerLives--;
        lives.innerHTML = playerLives;
        player.resetPlayer();
      }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
  console.log(keyPressed);
  console.log(this.x);
  console.log(this.y);

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
        playerScore += 100;
        score.innerHTML = playerScore;
        this.resetPlayer();
      }
      else { this.y -= 83; }
      break;
    case 'down':
      this.y = (this.y === 404) ? 404 : this.y += 83;
      break;
    default:
  }
}

Player.prototype.resetPlayer = function() {
  this.x = 202;
  this.y = 404;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(0, 60, 300), new Enemy(0, 145, 200), new Enemy(0, 230, 400)];

// Place the player object in a variable called player
var player = new Player(202, 404);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
