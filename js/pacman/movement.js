import {
  pacman,
  pacmanNextDirection,
  setPacmanNextDirection,
  walls,
} from "../state.js";
import { columnCount, tileSize } from "../config.js";
import { collision } from "../collision.js";

export function handlePacmanTurning() {
  let currentTileX =
    Math.floor((pacman.x + tileSize / 2) / tileSize) * tileSize;
  let currentTileY =
    Math.floor((pacman.y + tileSize / 2) / tileSize) * tileSize;

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
        setPacmanNextDirection(null);
      }
    }
  }

  if (pacman.direction === "U")
    pacman.updateImage("./assets/imgs/pacmanUp.png");
  else if (pacman.direction === "D")
    pacman.updateImage("./assets/imgs/pacmanDown.png");
  else if (pacman.direction === "L")
    pacman.updateImage("./assets/imgs/pacmanLeft.png");
  else if (pacman.direction === "R")
    pacman.updateImage("./assets/imgs/pacmanRight.png");
}

export function handlePacmanMovement() {
  pacman.x += pacman.velocityX;
  pacman.y += pacman.velocityY;

  const mapWidth = columnCount * tileSize;
  if (pacman.x + pacman.width < 0) {
    pacman.x = mapWidth - Math.abs(pacman.velocityX);
  } else if (pacman.x > mapWidth) {
    pacman.x = -pacman.width + Math.abs(pacman.velocityX);
  }

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
