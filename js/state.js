export let boardLayer;
export let wallsLayer;
export let foodsLayer;
export let pacmanLayer;
export let ghostsLayer;

export const walls = new Set();
export const foods = new Set();
export const ghosts = new Set();

export let pacman = null;
export let pacmanNextDirection = null;

export let score = 0;
export let lives = 3;
export let timeRemaining = 120;

export let gameStarted = false;
export let gameOver = false;
export let isPaused = false;

export function setBoardLayer(el) {
  boardLayer = el;
}

export function setWallsLayer(el) {
  wallsLayer = el;
}

export function setFoodsLayer(el) {
  foodsLayer = el;
}

export function setPacmanLayer(el) {
  pacmanLayer = el;
}

export function setGhostsLayer(el) {
  ghostsLayer = el;
}

export function setPacman(obj) {
  pacman = obj;
}

export function setPacmanNextDirection(dir) {
  pacmanNextDirection = dir;
}
