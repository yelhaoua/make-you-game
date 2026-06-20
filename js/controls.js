import { setPacmanNextDirection } from "./state.js";

export default function handleKeyDown(e) {
  if (!window.gameState?.gameStarted || window.gameState?.gameOver) return;

  if (e.code === "Escape" || e.code === "KeyP") {
    window.togglePause(!window.gameState?.isPaused);
    return;
  }

  if (e.code === "ArrowUp" || e.code === "KeyW") setPacmanNextDirection("U");
  else if (e.code === "ArrowDown" || e.code == "KeyS")
    setPacmanNextDirection("D");
  else if (e.code === "ArrowLeft" || e.code == "KeyA")
    setPacmanNextDirection("L");
  else if (e.code === "ArrowRight" || e.code == "KeyD")
    setPacmanNextDirection("R");
}
