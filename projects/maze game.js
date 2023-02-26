
  // Set up canvas element
    const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');

// Set up maze dimensions
const mazeWidth = 400;
const mazeHeight = 400;
const cellSize = 20;
const mazeCols = mazeWidth / cellSize;
const mazeRows = mazeHeight / cellSize;

// Create maze data structure
let maze = new Array(mazeCols);
for (let i = 0; i < mazeCols; i++) {
  maze[i] = new Array(mazeRows);
}

// Initialize maze with walls
for (let i = 0; i < mazeCols; i++) {
  for (let j = 0; j < mazeRows; j++) {
    maze[i][j] = 1;
  }
}

// Define starting and ending positions
let startX = 1;
let startY = 1;
let endX = mazeCols - 2;
let endY = mazeRows - 2;

// Generate maze using recursive backtracking algorithm
function generateMaze(x, y) {
  maze[x][y] = 0;
  let directions = shuffleDirections(['north', 'south', 'east', 'west']);
  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i];
    let nextX = x;
    let nextY = y;
    if (direction === 'north') nextY -= 2;
    if (direction === 'south') nextY += 2;
    if (direction === 'east') nextX += 2;
    if (direction === 'west') nextX -= 2;
    if (nextX > 0 && nextY > 0 && nextX < mazeCols - 1 && nextY < mazeRows - 1 && maze[nextX][nextY]) {
      maze[(nextX + x) / 2][(nextY + y) / 2] = 0;
      generateMaze(nextX, nextY);
    }
  }
}

// Shuffle array of directions
function shuffleDirections(directions) {
  for (let i = directions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [directions[i], directions[j]] = [directions[j], directions[i]];
  }
  return directions;
}

// Draw maze on canvas
function drawMaze() {
  ctx.clearRect(0, 0, mazeWidth, mazeHeight);
  ctx.fillStyle = 'black';
  for (let i = 0; i < mazeCols; i++) {
    for (let j = 0; j < mazeRows; j++) {
      if (maze[i][j]) {
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }
  }
  ctx.fillStyle = 'green';
  ctx.fillRect(startX * cellSize, startY * cellSize, cellSize, cellSize);
  ctx.fillStyle = 'red';
  ctx.fillRect(endX * cellSize, endY * cellSize, cellSize, cellSize);
}

// Handle player movement
document.addEventListener('keydown', function(event) {
  let nextX = startX;
  let nextY = startY;
  if (event.key === 'ArrowUp') nextY--;
  if (event.key === 'ArrowDown') nextY++;
  if (event.key === 'ArrowLeft') nextX--;