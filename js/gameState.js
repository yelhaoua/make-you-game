import {
  pacman,
  ghosts,
  pacmanNextDirection,
  setPacmanNextDirection,
} from "./state.js";
import { directions, tileSize } from "./config.js";

export function resetPositions() {
  pacman.resetPosition();
  setPacmanNextDirection(null);
  for (let ghost of ghosts) {
    ghost.resetPosition();
    ghost.changeDirection(directions[Math.floor(Math.random() * 4)]);
  }
}
