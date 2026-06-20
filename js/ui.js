import { stopGameLoop } from "./gameLoop.js";

export default function updateTimerDisplay() {
  const timeRemaining = window.gameState?.timeRemaining || 120;
  const mins = String(Math.floor(timeRemaining / 60)).padStart(2, "0");
  const secs = String(timeRemaining % 60).padStart(2, "0");
  document.getElementById("timer-val").innerText = `${mins}:${secs}`;
}

export function showGameOver() {
  window.gameState.gameOver = true;
  document.getElementById("game-over-screen").classList.remove("hidden");
  document.getElementById("final-score").innerText =
    window.gameState?.score || 0;
  document.getElementById("pause-menu").classList.add("hidden");
  stopGameLoop();
}
