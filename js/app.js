/* Enemies*/
const Enemy = function (x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

/*
*Update the enemy's position, required method for game
* Parameter: dt, a time delta between ticks
*/
Enemy.prototype.update = function (dt) {
  /*Multiply the speed by the dt parameter*/
  this.x = (this.x + dt * this.speed);

  /*Enemies reappear when off borders of canvas with different speeds*/
  if (this.x > 500) {
    this.x = -50;
    this.speed = Math.floor(Math.random() * 300) + 100;
  };

  /*When enemy and player meet*/
  allEnemies.forEach(enemy => {
    if (player.x < this.x + 80 &&
      player.x + 80 > this.x &&
      player.y < this.y + 60 &&
      60 + player.y > this.y) {
      /*return to start*/
      player.x = 200;
      player.y = 400;
    };
  })
}

/* Draws enemy on screen*/
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Player*/
const Player = function (x, y) {
  this.player = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Player.prototype.update = function (dt) {

};
/*Renders player*/
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

/*How arrow keys will be moving*/
Player.prototype.handleInput = function (keyPress) {
  /*Set the borders of canvas and define how each key will move*/
  if (keyPress == 'left' && this.x > 0) {
    this.x -= 101;
  };

  if (keyPress == 'right' && this.x < 400) {
    this.x += 101;
  };

  if (keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  };

  if (keyPress == 'down' && this.y < 400) {
    this.y += 83;
  };

  /*the lake is the goal!*/
  if (this.y < 0) {
    setTimeout(() => {
      /*
      *not so cool addition for congratulations but i am way off course and *don't have the time needed to design something cooler
      */
      alert("You did it! The bugs didn't bite you! Bravo!");
      /*go to start*/
      this.x = 200;
      this.y = 400;
    }, 500);
  };
};

/*enemy's location*/
const allEnemies = [];
const enemyLocation = [60, 145, 230];
enemyLocation.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});
/*player's starting point*/
const player = new Player(200, 400);

/* This listens for key presses and sends the keys to your
*Player.handleInput() . 
*/
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };
  player.handleInput(allowedKeys[e.keyCode]);
});