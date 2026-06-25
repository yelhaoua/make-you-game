import {
  handlePacmanTurning,
  handlePacmanMovement,
} from "./pacman/movement.js";
import {
  handleGhostMovement,
  checkGhostPacmanCollision,
} from "./ghost/movement.js";
import { handleFoodCollision } from "./collision/foodCollision.js";
import { foods } from "./state.js";
import loadMap from "./map.js";

export function updatePhysics() {
  handlePacmanTurning();
  handlePacmanMovement();
  handleGhostMovement();

  const foodEaten = handleFoodCollision();
  
  const ghostCollided = checkGhostPacmanCollision();

  if (foods.size === 0) {
    window.showWinScreen();
    return { mapReloaded: false, ghostCollided: false };
  }

  return { ghostCollided, mapReloaded: false };
}
