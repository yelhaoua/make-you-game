import { pacman, foods } from "../state.js";
import { collision } from "../collision.js";
export let allpoints

export function handleFoodCollision() {
  let pointsEarned = 0;
  let foodEaten = false;
  for (let food of foods) {
    if (collision(pacman, food)) {
      food.domElement.style.display = "none";
      foods.delete(food);
      pointsEarned = 10;
      foodEaten = true;
      break;
    }
  }

  if (foodEaten) {
    allpoints = (parseInt(document.getElementById("score-val").innerText) || 0) + pointsEarned;
    document.getElementById("score-val").innerText = allpoints
    }

  return foodEaten;
}
