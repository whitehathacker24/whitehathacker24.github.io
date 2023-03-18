// Define the game canvas
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Define the game variables
let score = 0;
let lives = 10;
let wave = 1;
let enemies = [];
let towers = [];

// Define the game classes
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.health = 100;
    this.width = 20;
    this.height = 20;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
      score += 10;
    }
  }

  destroy() {
    enemies.splice(enemies.indexOf(this), 1);
  }
}

class Tower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.range = 100;
    this.damage = 10;
    this.fireRate = 1; // shots per second
    this.lastFired = Date.now();
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  fire() {
    if (Date.now() - this.lastFired >= 1000 / this.fireRate) {
      for (let i = 0; i < enemies.length; i++) {
        const distance = Math.sqrt(
          (enemies[i].x - this.x) ** 2 + (enemies[i].y - this.y) ** 2
        );
        if (distance <= this.range) {
          enemies[i].takeDamage(this.damage);
          break;
        }
      }
      this.lastFired = Date.now();
    }
  }
}

// Define the game functions
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    enemies[i].move();
  }

  // Draw the towers
  for (let i = 0; i < towers.length; i++) {
    towers[i].draw();
    towers[i].fire();
  }

  // Draw the game information
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
  ctx.fillText("Lives: " + lives, 10, 60);
  ctx.fillText("Wave: " + wave, 10, 90);
}

function update() {
  // Check for game over
  if (lives <= 0) {
    clearInterval(gameLoop);
    alert("Game over!");
    return;
  }

  // Check for end of wave
