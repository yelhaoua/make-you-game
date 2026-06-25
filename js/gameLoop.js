import { updatePhysics } from "./physics.js";
import { renderDOM } from "./renderer.js";

let gameLoopRunning = false;
let lastTime = 0;
let gameTimeAccumulator = 0;

export function startGameLoop() {
  if (gameLoopRunning) return;
  gameLoopRunning = true;
  lastTime = performance.now();
  gameTimeAccumulator = 0;
  requestAnimationFrame(gameLoop);
}

export function stopGameLoop() {
  gameLoopRunning = false;
}

let frameCount = 0;
let lastFpsUpdateTime = 0;

function gameLoop(currentTime) {
  if (!gameLoopRunning) return;

  let deltaTime = currentTime - lastTime;
  if (deltaTime > 100) deltaTime = 16.66;
  lastTime = currentTime;

  frameCount++;
  if (currentTime - lastFpsUpdateTime >= 500) {
    const actualFps = Math.round((frameCount * 1000) / (currentTime - lastFpsUpdateTime));
    const fpsVal = document.getElementById("fps-val");
    if (fpsVal) {
      fpsVal.innerText = actualFps;
    }
    frameCount = 0;
    lastFpsUpdateTime = currentTime;
  }

  if (
    window.gameState &&
    !window.gameState.isPaused &&
    window.gameState.gameStarted &&
    !window.gameState.gameOver
  ) {
    gameTimeAccumulator += deltaTime;
    if (gameTimeAccumulator >= 1000) {
      window.gameState.timeRemaining--;
      gameTimeAccumulator = 0;
      window.updateTimerDisplay();
      if (window.gameState.timeRemaining <= 0) {
        window.showGameOver();
        return;
      }
    }

    const result = updatePhysics();
    if (result.ghostCollided) {
      window.handleGhostCollision();
    }
    if (result.mapReloaded) {
      window.resetGamePositions();
    }
    renderDOM();
  }

  requestAnimationFrame(gameLoop);
}
