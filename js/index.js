import { startGameLoop, stopGameLoop } from "./gameLoop.js";
import loadMap from "./map.js";
import { resetPositions } from "./gameState.js";
import handleKeyDown from "./controls.js";
import updateTimerDisplay, { showGameOver, showWinScreen } from "./ui.js";
import { setBoardLayer, setWallsLayer, setFoodsLayer, setPacmanLayer, setGhostsLayer } from "./state.js";

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
  "./assets/imgs/pinkGhost.png",
];

// Initialize game state in window
window.gameState = {
  score: 0,
  lives: 3,
  timeRemaining: 120,
  isPaused: false,
  gameStarted: false,
  gameOver: false,
};

function preloadImages() {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    if (img.decode) {
      img.decode().catch((err) => console.log("Image preload failed", err));
    }
  });
}

function updateScore(amount) {
  window.gameState.score += amount;
  document.getElementById("score-val").innerText = window.gameState.score;
}

function updateLives(newLives) {
  window.gameState.lives = newLives;
  document.getElementById("lives-val").innerText = window.gameState.lives;
}

function resetGameCompletely() {
  window.gameState.score = 0;
  window.gameState.lives = 3;
  window.gameState.timeRemaining = 120;
  window.gameState.gameOver = false;
  window.gameState.isPaused = false;
  document.getElementById("score-val").innerText = window.gameState.score;
  document.getElementById("lives-val").innerText = window.gameState.lives;
  updateTimerDisplay();
  loadMap();
  resetPositions();
}
setWallsLayer(document.getElementById("walls-layer"));
setFoodsLayer(document.getElementById("foods-layer"));
setPacmanLayer(document.getElementById("pacman-layer"));
setGhostsLayer(document.getElementById("ghosts-layer"));


window.onload = function () {
  const boardLayer = document.getElementById("board-layer");
  setBoardLayer(boardLayer);
  setWallsLayer(document.getElementById("walls-layer"));
  setFoodsLayer(document.getElementById("foods-layer"));
  setPacmanLayer(document.getElementById("pacman-layer"));
  setGhostsLayer(document.getElementById("ghosts-layer"));

  preloadImages();
  setupMenuListeners();
  loadMap();

  document.addEventListener("keydown", handleKeyDown);
};

function setupMenuListeners() {
  document.getElementById("btn-play").onclick = () => {
    window.gameState.gameStarted = true;
    document.getElementById("start-screen").classList.add("hidden");
    resetGameCompletely();
    startGameLoop();
  };

  document.getElementById("btn-continue").onclick = () => togglePause(false);

  document.getElementById("btn-restart").onclick = () => {
    togglePause(false);
    resetGameCompletely();
  };

  document.getElementById("btn-gameover-restart").onclick = () => {
    document.getElementById("game-over-screen").classList.add("hidden");
    resetGameCompletely();
    startGameLoop();
  };

  document.getElementById("btn-win-restart").onclick = () => {
    document.getElementById("win-screen").classList.add("hidden");
    resetGameCompletely();
    startGameLoop();
  };
}

function togglePause(pauseState) {
  window.gameState.isPaused = pauseState;
  document.getElementById("pause-menu").classList.toggle("hidden", !pauseState);
}

// Handle ghost collision with pacman
window.handleGhostCollision = function () {
  window.gameState.lives--;
  document.getElementById("lives-val").innerText = window.gameState.lives;

  if (window.gameState.lives <= 0) {
    showGameOver();
  } else {
    resetPositions();
  }
};

// Handle resetting positions when all food is eaten
window.resetGamePositions = function () {
  resetPositions();
};

// Expose functions for modules to use
window.updateTimerDisplay = updateTimerDisplay;
window.showGameOver = showGameOver;
window.showWinScreen = showWinScreen;
window.togglePause = togglePause;
window.updateScore = updateScore;
window.updateLives = updateLives;
