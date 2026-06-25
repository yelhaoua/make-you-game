import { pacman, foods } from "../state.js";
import { collision } from "../collision.js";
import { renderFoods } from "../map.js";

export function handleFoodCollision() {
  let pointsEarned = 0;
  let foodEaten = false;
  for (let food of foods) {
    if (collision(pacman, food)) {
      foods.delete(food);
      renderFoods();
      pointsEarned = 10;
      foodEaten = true;
      break;
    }
  }

  if (foodEaten) {
    window.updateScore(pointsEarned);
  }

  return foodEaten;
}
