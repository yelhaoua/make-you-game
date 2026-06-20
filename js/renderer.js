import { pacman, ghosts } from "./state.js";

export function renderDOM() {
  pacman.render();
  for (let ghost of ghosts) ghost.render();
}
