//board
let boardLayer;
const rowCount = 21;
const columnCount = 19;
const tileSize = 32;

// Buffered Intended Actions
let pacmanNextDirection = null;

// Performance Measurement & Loop Properties
let lastTime = 0;
let timeAccumulator = 0;
const physicsStep = 1000 / 60; // Locked to 60 FPS physics execution baseline

let fpsLastTime = 0;
let frameCount = 0;

// Game State Values
let score = 0;
let lives = 3;
let timeRemaining = 120; // 2 Minutes Countdown Clock metrics
let gameTimeAccumulator = 0;
let isPaused = false;
let gameOver = false;
let gameStarted = false;
let mapInitialized = false;
const allFoods = [];

// Entities Elements Management
const walls = new Set();
const foods = new Set();
const ghosts = new Set();
let pacman;

const tileMap = [
  "XXXXXXXXXXXXXXXXXXX",
  "X        X        X",
  "X XX XXX X XXX XX X",
  "X                 X",
  "X XX X XXXXX X XX X",
  "X    X       X    X",
  "X XX XXXX XXXX XX X",
  "X XX X       X XX X",
  "X XX X XXrXX X XX X",
  "X      XbpoX      X",
  "XX X X XXXXX X X XX",
  "XX X X       X X XX",
  "XX X X XXXXX X X XX",
  "X        X        X",
  "X XX XXX X XXX XX X",
  "X  X     P     X  X",
  "XX X X XXXXX X X XX",
  "X    X   X   X    X",
  "X XXXXXX X XXXXXX X",
  "X                 X",
  "XXXXXXXXXXXXXXXXXXX",
];

const directions = ["U", "D", "L", "R"];

const imageUrls = [
  "./assets/imgs/wall.png",
  "./assets/imgs/cherry.png",
  "./assets/imgs/pacmanRight.png",
  "./assets/imgs/pacmanLeft.png",
  "./assets/imgs/pacmanUp.png",
  "./assets/imgs/pacmanDown.png",
  "./assets/imgs/redGhost.png",
  "./assets/imgs/blueGhost.png",
  "./assets/imgs/orangeGhost.png",
  "./assets/imgs/pinkGhost.png"
];

function preloadImages() {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    if (img.decode) {
      img.decode().catch(err => console.log("Image decode failed", err));
    }
  });
}

window.onload = function () {
  boardLayer = document.getElementById("board-layer");

  preloadImages();
  setupMenuListeners();
  loadMap();

  document.addEventListener("keydown", handleKeyDown);

  lastTime = performance.now();
  fpsLastTime = lastTime;
  requestAnimationFrame(gameLoop);
};

function setupMenuListeners() {
  document.getElementById("btn-play").onclick = () => {
    gameStarted = true;
    document.getElementById("start-screen").classList.add("hidden");
    resetGameCompletely();
  };

  document.getElementById("btn-continue").onclick = () => togglePause(false);

  document.getElementById("btn-restart").onclick = () => {
    togglePause(false);
    resetGameCompletely();
  };

  document.getElementById("btn-gameover-restart").onclick = () => {
    document.getElementById("game-over-screen").classList.add("hidden");
    resetGameCompletely();
  };
}

function loadMap() {
  if (mapInitialized) {
    foods.clear();
    for (let food of allFoods) {
      food.domElement.style.display = '';
      foods.add(food);
    }
    return;
  }

  boardLayer.innerHTML = "";
  walls.clear();
  foods.clear();
  ghosts.clear();
  allFoods.length = 0;

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const tileChar = tileMap[r][c];
      const x = c * tileSize;
      const y = r * tileSize;

      if (tileChar === "X") {
        const wall = new DOMBlock("wall", x, y, "./assets/imgs/wall.png");
        walls.add(wall);
      } else if (["b", "o", "p", "r"].includes(tileChar)) {
        let ghostImg = "./assets/imgs/redGhost.png";
        if (tileChar === "b") ghostImg = "./assets/imgs/blueGhost.png";
        if (tileChar === "o") ghostImg = "./assets/imgs/orangeGhost.png";
        if (tileChar === "p") ghostImg = "./assets/imgs/pinkGhost.png";

        const ghost = new DOMBlock(`ghost g-${tileChar}`, x, y, ghostImg);
        ghost.ghostType = tileChar;
        ghosts.add(ghost);
        ghost.changeDirection(directions[Math.floor(Math.random() * 4)]);
      } else if (tileChar === "P") {
        pacman = new DOMBlock("pacman", x, y, "./assets/imgs/pacmanRight.png");
      } else if (tileChar === " ") {
        const food = new DOMBlock("food", x + 10, y + 10, "./assets/imgs/cherry.png", 12, 12);
        foods.add(food);
        allFoods.push(food);
      }
    }
  }
  mapInitialized = true;
}

function gameLoop(currentTime) {
  let deltaTime = currentTime - lastTime;

  if (deltaTime > 100) deltaTime = 16.66;
  lastTime = currentTime;

  frameCount++;
  if (currentTime >= fpsLastTime + 1000) {
    document.getElementById("fps-val").innerText = frameCount;
    frameCount = 0;
    fpsLastTime = currentTime;
  }

  if (gameStarted && !isPaused && !gameOver) {
    timeAccumulator += deltaTime;
    gameTimeAccumulator += deltaTime;

    if (gameTimeAccumulator >= 1000) {
      timeRemaining--;
      gameTimeAccumulator -= 1000;
      updateTimerDisplay();
      if (timeRemaining <= 0) {
        showGameOver();
      }
    }

    if (timeAccumulator > physicsStep * 5) {
      timeAccumulator = physicsStep;
    }

    while (timeAccumulator >= physicsStep) {
      updatePhysics();
      timeAccumulator -= physicsStep;
    }

    // تشغيل الرندرة فقط إذا كانت اللعبة تعمل وغير متوقفة لحفظ الإطارات
    renderDOM();
  }

  requestAnimationFrame(gameLoop);
}

function handleGhostMovement() {
  const mapWidth = columnCount * tileSize;

  for (let ghost of ghosts) {
    // حل مشكلة الأداء: نتحقق أن الشبح يتحرك فعلياً وفي مركز البلاطة تماماً قبل حساب الذكاء الاصطناعي
    const isAtTileCenter = ghost.x % tileSize === 0 && ghost.y % tileSize === 0;
    const isMoving = ghost.velocityX !== 0 || ghost.velocityY !== 0;

    if (isAtTileCenter && isMoving) {
      chooseBalancedDirection(ghost);
    }

    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;

    if (ghost.x + ghost.width < 0) {
      ghost.x = mapWidth - checkSpeedFallbackOffset(ghost.velocityX);
    } else if (ghost.x > mapWidth) {
      ghost.x = -ghost.width + checkSpeedFallbackOffset(ghost.velocityX);
    }

    for (let wall of walls) {
      if (collision(ghost, wall)) {
        ghost.x -= ghost.velocityX;
        ghost.y -= ghost.velocityY;
        ghost.changeDirection(directions[Math.floor(Math.random() * 4)]);
      }
    }

    if (collision(pacman, ghost)) {
      lives--;
      document.getElementById("lives-val").innerText = lives;

      if (lives <= 0) {
        showGameOver();
      } else {
        resetPositions();
      }
      return;
    }
  }
}

function updatePhysics() {
  handlePacmanTurning();
  handlePacmanMovement();
  handleGhostMovement();
  handleFoodCollision();

  if (foods.size === 0) {
    loadMap();
    resetPositions();
  }
}

function handlePacmanTurning() {
  let currentTileX =
    Math.floor((pacman.x + tileSize / 2) / tileSize) * tileSize;
  let currentTileY =
    Math.floor((pacman.y + tileSize / 2) / tileSize) * tileSize;

  // Check if we are approaching a tile center close enough to execute a buffered turn
  if (
    Math.abs(pacman.x - currentTileX) <= 4 &&
    Math.abs(pacman.y - currentTileY) <= 4
  ) {
    if (pacmanNextDirection !== null) {
      let targetX = currentTileX;
      let targetY = currentTileY;
      let checkSpeed = tileSize / 16;

      if (pacmanNextDirection === "U") targetY -= checkSpeed;
      else if (pacmanNextDirection === "D") targetY += checkSpeed;
      else if (pacmanNextDirection === "L") targetX -= checkSpeed;
      else if (pacmanNextDirection === "R") targetX += checkSpeed;

      let futureBlock = {
        x: targetX,
        y: targetY,
        width: pacman.width,
        height: pacman.height,
      };
      let wallHit = false;
      for (let wall of walls) {
        if (collision(futureBlock, wall)) {
          wallHit = true;
          break;
        }
      }

      if (!wallHit) {
        pacman.x = currentTileX;
        pacman.y = currentTileY;
        pacman.changeDirection(pacmanNextDirection);
        pacmanNextDirection = null;
      }
    }
  }

  // Update sprite animation orientations cleanly
  if (pacman.direction === "U")
    pacman.updateImage("./assets/imgs/pacmanUp.png");
  else if (pacman.direction === "D")
    pacman.updateImage("./assets/imgs/pacmanDown.png");
  else if (pacman.direction === "L")
    pacman.updateImage("./assets/imgs/pacmanLeft.png");
  else if (pacman.direction === "R")
    pacman.updateImage("./assets/imgs/pacmanRight.png");
}

function handlePacmanMovement() {
  pacman.x += pacman.velocityX;
  pacman.y += pacman.velocityY;

  // --- TELEPORT WARPING SYSTEM FOR PACMAN ---
  const mapWidth = columnCount * tileSize;
  if (pacman.x + pacman.width < 0) {
    pacman.x = mapWidth - checkSpeedFallbackOffset(pacman.velocityX);
  } else if (pacman.x > mapWidth) {
    pacman.x = -pacman.width + checkSpeedFallbackOffset(pacman.velocityX);
  }

  // Standard wall correction fallback
  for (let wall of walls) {
    if (collision(pacman, wall)) {
      pacman.x -= pacman.velocityX;
      pacman.y -= pacman.velocityY;
      pacman.velocityX = 0;
      pacman.velocityY = 0;
      break;
    }
  }
}

function handleFoodCollision() {
  for (let food of foods) {
    if (collision(pacman, food)) {
      score += 10;
      document.getElementById("score-val").innerText = score;
      food.domElement.style.display = 'none';
      foods.delete(food);
      break;
    }
  }
}

function checkSpeedFallbackOffset(vel) {
  return vel !== 0 ? Math.abs(vel) : 2;
}

function chooseBalancedDirection(ghost) {
  let validMoves = [];
  const opposites = { U: "D", D: "U", L: "R", R: "L" };
  const backwardDir = opposites[ghost.direction];

  let actDumb = false;
  const rand = Math.random();

  if (ghost.ghostType === "o") {
    actDumb = true;
  } else if (ghost.ghostType === "b" && rand < 0.5) {
    actDumb = true;
  } else if (ghost.ghostType === "p" && rand < 0.2) {
    actDumb = true;
  }

  for (let dir of directions) {
    if (dir === backwardDir) continue;

    let nextX = ghost.x;
    let nextY = ghost.y;
    let speed = tileSize / 16;

    if (dir === "U") nextY -= speed;
    else if (dir === "D") nextY += speed;
    else if (dir === "L") nextX -= speed;
    else if (dir === "R") nextX += speed;

    let futureBlock = {
      x: nextX,
      y: nextY,
      width: ghost.width,
      height: ghost.height,
    };

    let hitsWall = false;
    for (let wall of walls) {
      if (collision(futureBlock, wall)) {
        hitsWall = true;
        break;
      }
    }

    if (!hitsWall) {
      let distance = 0;
      if (!actDumb) {
        let dx = nextX - pacman.x;
        let dy = nextY - pacman.y;
        distance = Math.sqrt(dx * dx + dy * dy);
      } else {
        distance = Math.random() * 1000;
      }
      validMoves.push({ direction: dir, distance: distance });
    }
  }

  if (validMoves.length === 0 && backwardDir) {
    validMoves.push({ direction: backwardDir, distance: 99999 });
  }

  if (validMoves.length > 0) {
    validMoves.sort((a, b) => a.distance - b.distance);
    ghost.changeDirection(validMoves[0].direction);
  }
}

function renderDOM() {
  pacman.render();
  for (let ghost of ghosts) ghost.render();
}

function handleKeyDown(e) {
  if (!gameStarted || gameOver) return;

  if (e.code === "Escape" || e.code === "KeyP") {
    togglePause(!isPaused);
    return;
  }

  if (e.code === "ArrowUp" || e.code === "KeyW") pacmanNextDirection = "U";
  else if (e.code === "ArrowDown" || e.code == "KeyS")
    pacmanNextDirection = "D";
  else if (e.code === "ArrowLeft" || e.code == "KeyA")
    pacmanNextDirection = "L";
  else if (e.code === "ArrowRight" || e.code == "KeyD")
    pacmanNextDirection = "R";
}

function togglePause(pauseState) {
  isPaused = pauseState;
  document.getElementById("pause-menu").classList.toggle("hidden", !isPaused);
}

function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function updateTimerDisplay() {
  const mins = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
  const secs = String(timeRemaining % 60).padStart(2, "0");
  document.getElementById("timer-val").innerText = `${mins}:${secs}`;
}

function showGameOver() {
  gameOver = true;
  document.getElementById("game-over-screen").classList.remove("hidden");
  document.getElementById("final-score").innerText = score;
  document.getElementById("pause-menu").classList.add("hidden");
}


function resetPositions() {
  pacman.resetPosition();
  pacmanNextDirection = null;
  for (let ghost of ghosts) {
    ghost.resetPosition();
    ghost.changeDirection(directions[Math.floor(Math.random() * 4)]);
  }
}

function resetGameCompletely() {
  score = 0;
  lives = 3;
  timeRemaining = 120;
  gameOver = false;
  isPaused = false;
  document.getElementById("score-val").innerText = score;
  document.getElementById("lives-val").innerText = lives;
  updateTimerDisplay();
  loadMap();
  resetPositions();
}


class DOMBlock {
  constructor(
    className,
    x,
    y,
    imageSrc = null,
    width = tileSize,
    height = tileSize,
  ) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.direction = "R";
    this.velocityX = 0;
    this.velocityY = 0;
    this.ghostType = "";

    this.domElement = document.createElement("div");
    this.domElement.className = `element ${className}`;
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.height = `${this.height}px`;

    if (imageSrc) {
      this.updateImage(imageSrc);
    }

    this.render();
    boardLayer.appendChild(this.domElement);
  }

  updateImage(src) {
    this.domElement.style.backgroundImage = `url('${src}')`;
    this.domElement.style.backgroundSize = "contain";
    this.domElement.style.backgroundRepeat = "no-repeat";
  }

  changeDirection(dir) {
    this.direction = dir;
    if (dir === "U") {
      this.velocityX = 0;
      this.velocityY = -tileSize / 16;
    } else if (dir === "D") {
      this.velocityX = 0;
      this.velocityY = tileSize / 16;
    } else if (dir === "L") {
      this.velocityX = -tileSize / 16;
      this.velocityY = 0;
    } else if (dir === "R") {
      this.velocityX = tileSize / 16;
      this.velocityY = 0;
    }
  }

  render() {
    this.domElement.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }

  resetPosition() {
    this.x = this.startX;
    this.y = this.startY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.render();
  }
}
