let canvas;
let ctx;
const map = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
  [
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    "g",
    "g",
    "g",
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
  ],
  [
    0,
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    "g",
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
  ],
  [
    0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1,
    0,
  ],
  [
    0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0,
    0,
  ],
  [
    1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1,
    1,
  ],
  [
    0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
    0,
  ],
  [
    0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1,
    0,
  ],
  [
    0,
    1,
    0,
    0,
    1,
    1,
    1,
    0,
    "p",
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    0,
  ],
  [
    0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    0,
  ],
  [
    0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
    0,
  ],
  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
];
var playerSpawned = true;
var tileSize = 35;
var keys = {};
let SpawnX = 0;
let SpawnY = 0;

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

var player = {
  x: 0,
  y: 0,
  width: tileSize,
  height: tileSize,
  speed: 5,
  dx: 0,
  dy: 0,
};

function draw() {
  BuildMap(canvas, ctx);
}
console.log(player);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  BuildMap(canvas, ctx);
  MovePlayer(player);
  drawPlayer();

  requestAnimationFrame(gameLoop);
}
window.onload = () => {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  findSpawn();
  player.x = SpawnX;
  player.y = SpawnY;

  gameLoop();
};

function findSpawn() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "p") {
        SpawnX = j * tileSize;
        SpawnY = i * tileSize;
      }
    }
  }
}

function BuildMap(canvas, ctx) {
  canvas.width = map[0].length * tileSize;
  canvas.height = map.length * tileSize;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const tile = map[i][j];

      if (tile === 0) ctx.fillStyle = "blue";
      else ctx.fillStyle = "black";

      ctx.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "green";

  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function isWall(x, y) {
  const left = Math.floor(x / tileSize);
  const right = Math.floor((x + player.width - 1) / tileSize);
  const top = Math.floor(y / tileSize);
  const bottom = Math.floor((y + player.height - 1) / tileSize);

  return (
    map[top]?.[left] === 0 ||
    map[top]?.[right] === 0 ||
    map[bottom]?.[left] === 0 ||
    map[bottom]?.[right] === 0
  );
}

function MovePlayer() {
  let nextX = player.x;
  let nextY = player.y;

  if (keys["ArrowRight"]) {
    nextX += player.speed;
  }

  if (keys["ArrowLeft"]) {
    nextX -= player.speed;
  }

  if (keys["ArrowUp"]) {
    nextY -= player.speed;
  }

  if (keys["ArrowDown"]) {
    nextY += player.speed;
  }

 
  if (!isWall(nextX, player.y)) {
    player.x = nextX;
  }
  if (!isWall(player.x, nextY )) {
    player.y = nextY;
  }
}
