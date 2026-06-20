import { pacman, foods } from "../state.js";
import { collision } from "../collision.js";

export function handleFoodCollision() {
  let foodEaten = false;
  let pointsEarned = 0;

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
    document.getElementById("score-val").innerText =
      (parseInt(document.getElementById("score-val").innerText) || 0) +
      pointsEarned;
  }

  return foodEaten;
}
