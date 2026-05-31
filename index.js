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
var tileSize = 64;
var keys = {};
let SpawnX = 0;
let SpawnY = 0;
let lastmove = "R";
let wantedric = "R";
let PlayerImage = new Image();

let PlayerImageR = new Image();
let PlayerImageL = new Image();
let PlayerImageU = new Image();
let PlayerImageD = new Image();

let redGost = new Image();
let yellowGost = new Image();
let blueGost = new Image();
let wallImage = new Image();
PlayerImage.src = "./assetes/pacmanLeft.png";

PlayerImageR.src = "./assetes/pacmanRight.png";
PlayerImageL.src = "./assetes/pacmanLeft.png";
PlayerImageU.src = "./assetes/pacmanUp.png";
PlayerImageD.src = "./assetes/pacmanDown.png";

wallImage.src = "./assetes/wall.png";

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

var player = {
  x: 0,
  y: 0,
  width: tileSize - 5,
  height: tileSize - 5,
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
      if (tile === 0) {
        ctx.drawImage(
          wallImage,
          j * tileSize,
          i * tileSize,
          tileSize,
          tileSize,
        );
      }
    }
  }
}

function drawPlayer() {
  ctx.drawImage(
    PlayerImage,
    player.x,
    player.y,
    player.width + 5,
    player.height + 5,
  );
}

function isWall(x, y) {
  const left = Math.floor(x / tileSize);
  const right = Math.floor((x + player.width - 1) / tileSize);
  const top = Math.floor(y / tileSize);
  const bottom = Math.floor((y + player.height - 1) / tileSize);
  console.log(
    map[top]?.[left] === 0 ||
      map[top]?.[right] === 0 ||
      map[bottom]?.[left] === 0 ||
      map[bottom]?.[right] === 0,
  );

  return (
    map[top]?.[left] === 0 ||
    map[top]?.[right] === 0 ||
    map[bottom]?.[left] === 0 ||
    map[bottom]?.[right] === 0
  );
}

function MovePlayer() {
  tryChangedirection();
  let nextX = player.x;
  let nextY = player.y;

  switch (lastmove) {
    case "U":
      PlayerImage = PlayerImageU;
      nextY -= player.speed;
      break;
    case "D":
      PlayerImage = PlayerImageD;
      nextY += player.speed;
      break;
    case "L":
      PlayerImage = PlayerImageL;
      nextX -= player.speed;
      break;
    case "R":
      PlayerImage = PlayerImageR;
      nextX += player.speed;
      break;
  }

  if (!isWall(nextX, nextY)) {
    player.x = nextX;
    player.y = nextY;
  }
}
function tryChangedirection() {
  let nextX = player.x;
  let nextY = player.y;
  if (keys["ArrowRight"]) {
    wantedric = "R";
  }
  if (keys["ArrowLeft"]) {
    wantedric = "L";
  }
  if (keys["ArrowUp"]) {
    wantedric = "U";
  }
  if (keys["ArrowDown"]) {
    wantedric = "D";
  }
  switch (wantedric) {
    case "U":
      nextY -= player.speed;
      break;
    case "D":
      nextY += player.speed;
      break;
    case "L":
      nextX -= player.speed;
      break;
    case "R":
      nextX += player.speed;
      break;
  }
  if (!isWall(nextX, nextY)) {
    lastmove = wantedric;
    return;
  }
  return;
}
