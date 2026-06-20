import { ghosts, pacman, walls } from "../state.js";
import { columnCount, tileSize, directions } from "../config.js";
import { collision } from "../collision.js";

export function handleGhostMovement() {
  const mapWidth = columnCount * tileSize;

  for (let ghost of ghosts) {
    const isAtTileCenter = ghost.x % tileSize === 0 && ghost.y % tileSize === 0;
    const isMoving = ghost.velocityX !== 0 || ghost.velocityY !== 0;

    if (isAtTileCenter && isMoving) {
      chooseBalancedDirection(ghost);
    }

    ghost.x += ghost.velocityX;
    ghost.y += ghost.velocityY;

    if (ghost.x + ghost.width < 0) {
      ghost.x = mapWidth - Math.abs(ghost.velocityX);
    } else if (ghost.x > mapWidth) {
      ghost.x = -ghost.width + Math.abs(ghost.velocityX);
    }

    for (let wall of walls) {
      if (collision(ghost, wall)) {
        ghost.x -= ghost.velocityX;
        ghost.y -= ghost.velocityY;
        ghost.changeDirection(directions[Math.floor(Math.random() * 4)]);
      }
    }
  }
}

export function checkGhostPacmanCollision() {
  for (let ghost of ghosts) {
    if (collision(pacman, ghost)) {
      return true;
    }
  }
  return false;
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
