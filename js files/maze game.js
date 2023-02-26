const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set up game variables
let gameRunning = false;
let gameTime = 0;
let score = 0;
let lives = 3;
let wave = 0;

// Set up tower variables
const towerWidth = 32;
const towerHeight = 32;
let selectedTowerType = 0; // 0 = basic tower, 1 = sniper tower
let towerTypes = [
  { cost: 50, range: 100, fireRate: 1, damage: 10, color: 'blue' },
  { cost: 100, range: 200, fireRate: 0.5, damage: 20, color: 'purple' }
];
let towers = [];

// Set up enemy variables
const enemyWidth = 32;
const enemyHeight = 32;
let enemyTypes = [
  { speed: 1, health: 20, reward: 10 },
  { speed: 2, health: 30, reward: 20 },
  { speed: 3, health: 40, reward: 30 }
];
let enemies = [];

// Set up path variables
let path = [
  { x: 0, y: 160 },
  { x: 160, y: 160 },
  { x: 160, y: 320 },
  { x: 320, y: 320 },
  { x: 320, y: 160 },
  { x: 480, y: 160 }
];

// Draw the game board
function drawBoard() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the path
  ctx.strokeStyle = 'gray';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(path[0].x, path[0].y);
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.stroke();

  // Draw the towers
  towers.forEach(function(tower) {
    ctx.fillStyle = towerTypes[tower.type].color;
    ctx.fillRect(tower.x - towerWidth / 2, tower.y - towerHeight / 2, towerWidth, towerHeight);
  });

  // Draw the enemies
  enemies.forEach(function(enemy) {
    ctx.fillStyle = 'red';
    ctx.fillRect(enemy.x - enemyWidth / 2, enemy.y - enemyHeight / 2, enemyWidth, enemyHeight);
  });

  // Draw the game info
  ctx.fillStyle = 'black';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('Lives: ' + lives, canvas.width - 110, 30);
  ctx.fillText('Wave: ' + wave, 10, canvas.height - 10);
  ctx.fillText('Time: ' + Math.floor(gameTime / 60), canvas.width - 110, canvas.height - 10);
}
function updateGame() {
  // Spawn enemies
  if (gameTime % 120 === 0) {
    wave++;
    let enemyCount = wave * 3;
    for (let i = 0; i < enemyCount; i++) {
      let enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      let pathPosition = Math.floor(Math.random() * path.length);
      let enemy = {
        x: path[pathPosition].x,
        y: path[pathPosition].y,
        health: enemyType.health,
        speed: enemyType.speed,
        reward: enemyType.reward,
        pathPosition: pathPosition,
        distanceTraveled: 0
      };
      enemies.push(enemy);
    }
  }

  // Move enemies
  enemies.forEach(function(enemy, enemyIndex) {
    // Calculate distance to next path position
    let nextPosition = path[enemy.pathPosition + 1];
    let distanceToNext = Math.sqrt(Math.pow(nextPosition.x - enemy.x, 2) + Math.pow(nextPosition.y - enemy.y, 2));

    // Calculate time to next path position
    let timeToNext = distanceToNext / enemy.speed;

    // Move enemy if not at end of path
    if (enemy.pathPosition < path.length - 1) {
      enemy.x += (nextPosition.x - enemy.x) / distanceToNext * enemy.speed;
      enemy.y += (nextPosition.y - enemy.y) / distanceToNext * enemy.speed;
      enemy.distanceTraveled += enemy.speed;
    }

    // Move enemy to next path position if close enough
    if (enemy.distanceTraveled >= distanceToNext) {
      enemy.pathPosition++;
      enemy.distanceTraveled = 0;
    }

    // Remove enemy if at end of path
    if (enemy.pathPosition === path.length - 1) {
      lives--;
      enemies.splice(enemyIndex, 1);
    }
  });

  // Fire towers
  towers.forEach(function(tower) {
    // Find target enemy
    let target = null;
    enemies.forEach(function(enemy) {
      let distance = Math.sqrt(Math.pow(enemy.x - tower.x, 2) + Math.pow(enemy.y - tower.y, 2));
      if (distance <= towerTypes[tower.type].range) {
        if (target === null || enemy.health < target.health) {
          target = enemy;
        }
      }
    });

    // Fire at target enemy
    if (target !== null) {
      tower.fireTime--;
      if (tower.fireTime <= 0) {
        target.health -= towerTypes[tower.type].damage;
        if (target.health <= 0) {
          score += target.reward;
          enemies.splice(enemies.indexOf(target), 1);
        }
        tower.fireTime = Math.round(towerTypes[tower.type].fireRate * 60);
      }
    }
  });

  // Update game time
  gameTime++;

  // Check for game over
  if (lives <= 0) {
    gameRunning = false;
    alert('Game over! You reached wave ' + wave + ' with a score of ' + score);
  }

  // Draw the game board
  drawBoard();
}
