import DOMBlock from "./domBlock.js";
import { walls, foods, ghosts, setBoardLayer, setPacman, wallsLayer, foodsLayer, pacmanLayer, ghostsLayer } from "./state.js";
import { rowCount, columnCount, tileSize, directions } from "./config.js";

let mapInitialized = false;
const allFoods = [];

export function initMapData(boardLayer) {
  setBoardLayer(boardLayer);
}

export function renderWalls() {
  if (!wallsLayer) return;
  const bgImages = [];
  const bgPositions = [];
  const bgSizes = [];
  for (let wall of walls) {
    bgImages.push(`url('${wall.imageSrc}')`);
    bgPositions.push(`${wall.x}px ${wall.y}px`);
    bgSizes.push(`${wall.width}px ${wall.height}px`);
  }
  wallsLayer.style.backgroundImage = bgImages.join(", ");
  wallsLayer.style.backgroundPosition = bgPositions.join(", ");
  wallsLayer.style.backgroundSize = bgSizes.join(", ");
  wallsLayer.style.backgroundRepeat = "no-repeat";
}

export function renderFoods() {
  if (!foodsLayer) return;
  const bgImages = [];
  const bgPositions = [];
  const bgSizes = [];
  for (let food of foods) {
    bgImages.push(`url('${food.imageSrc}')`);
    bgPositions.push(`${food.x}px ${food.y}px`);
    bgSizes.push(`${food.width}px ${food.height}px`);
  }
  foodsLayer.style.backgroundImage = bgImages.join(", ");
  foodsLayer.style.backgroundPosition = bgPositions.join(", ");
  foodsLayer.style.backgroundSize = bgSizes.join(", ");
  foodsLayer.style.backgroundRepeat = "no-repeat";
}

export default function loadMap() {
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

  if (mapInitialized) {
    foods.clear();
    for (let food of allFoods) {
      foods.add(food);
    }
    renderFoods();
    return;
  }

  const boardLayer = document.getElementById("board-layer");
  if (wallsLayer) wallsLayer.style.backgroundImage = "";
  if (foodsLayer) foodsLayer.style.backgroundImage = "";
  pacmanLayer.innerHTML = "";
  ghostsLayer.innerHTML = "";
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
        const wall = new DOMBlock("wall", x, y, "./assets/imgs/wall.png", tileSize, tileSize, wallsLayer);
        walls.add(wall);
      } else if (["b", "o", "p", "r"].includes(tileChar)) {
        let ghostImg = "./assets/imgs/redGhost.png";
        if (tileChar === "b") ghostImg = "./assets/imgs/blueGhost.png";
        if (tileChar === "o") ghostImg = "./assets/imgs/orangeGhost.png";
        if (tileChar === "p") ghostImg = "./assets/imgs/pinkGhost.png";

        const ghost = new DOMBlock(`ghost g-${tileChar}`, x, y, ghostImg, tileSize, tileSize, ghostsLayer);
        ghost.ghostType = tileChar;
        ghosts.add(ghost);
        ghost.changeDirection(directions[Math.floor(Math.random() * 4)]);
      } else if (tileChar === "P") {
        const pacman = new DOMBlock(
          "pacman",
          x,
          y,
          "./assets/imgs/pacmanRight.png",
          tileSize,
          tileSize,
          pacmanLayer,
        );
        setPacman(pacman);
      } else if (tileChar === " ") {
        const food = new DOMBlock(
          "food",
          x + 10,
          y + 10,
          "./assets/imgs/cherry.png",
          12,
          12,
          foodsLayer,
        );
        foods.add(food);
        allFoods.push(food);
      }
    }
  }
  renderWalls();
  renderFoods();
  mapInitialized = true;
}
