// Define the resource object
var resource = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  type: "wood",
  amount: 5
};

// Define the player object
var player = {
  x: 400,
  y: 300,
  width: 32,
  height: 64,
  speed: 5,
  inventory: {
    wood: 0
  }
};

// Define the game world
var world = {
  width: 800,
  height: 600,
  resources: []
};

// Define a function to generate resources in the world
function generateResources() {
  for (var i = 0; i < 10; i++) {
    var resourceX = Math.floor(Math.random() * world.width);
    var resourceY = Math.floor(Math.random() * world.height);
    var newResource = Object.assign({}, resource);
    newResource.x = resourceX;
    newResource.y = resourceY;
    world.resources.push(newResource);
  }
}

// Define a function to check for collisions between two objects
function checkCollision(obj1, obj2) {
  if (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y) {
    return true;
  } else {
    return false;
  }
}

// Define the game loop function
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the resources
  ctx.fillStyle = "brown";
  for (var i = 0; i < world.resources.length; i++) {
    var resource = world.resources[i];
    ctx.fillRect(resource.x, resource.y, resource.width, resource.height);
  }

  // Draw the player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Check for collisions between the player and the resources
  for (var i = 0; i < world.resources.length; i++) {
    var resource = world.resources[i];
    if (checkCollision(player, resource)) {
      // Add the resource to the player's inventory
      player.inventory[resource.type] += resource.amount;

      // Remove the resource from the game world
      world.resources.splice(i, 1);
      i--;
    }
  }

  // Move the player based on user input
  if (keys.left) {
    player.x -= player.speed;
  }
  if (keys.right) {
    player.x += player.speed;
  }
  if (keys.up) {
    player.y -= player.speed;
  }
  if (keys.down) {
    player.y += player.speed;
  }

  // Draw the player's inventory
  ctx.fillStyle = "black";
  ctx.fillText("Wood: " + player.inventory.wood, 10, 20);

  // Request another frame of animation
  requestAnimationFrame(gameLoop);
}

// Define the keydown and keyup event listeners
var keys = {};
document.addEventListener("keydown", function(event) {
  keys[event.key] = true;
});
document.addEventListener("keyup", function(event) {
  keys[event.key] = false;
});

// Generate resources in the game world
generateResources();

// Start the game loop
requestAnimationFrame(gameLoop);
