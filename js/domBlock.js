import { tileSize } from "./config.js";
import { boardLayer } from "./state.js";
export default class DOMBlock {
  constructor(
    className,
    x,
    y,
    imageSrc = null,
    width = tileSize,
    height = tileSize,
  ) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.direction = "R";
    this.velocityX = 0;
    this.velocityY = 0;
    this.ghostType = "";

    this.domElement = document.createElement("div");
    this.domElement.className = `element ${className}`;
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.height = `${this.height}px`;

    if (imageSrc) {
      this.updateImage(imageSrc);
    }

    this.render();
    boardLayer.appendChild(this.domElement);
  }

  updateImage(src) {
    this.domElement.style.backgroundImage = `url('${src}')`;
    this.domElement.style.backgroundSize = "contain";
    this.domElement.style.backgroundRepeat = "no-repeat";
  }

  changeDirection(dir) {
    this.direction = dir;
    let speed = tileSize / 16;
    if (dir === "U") {
      this.velocityX = 0;
      this.velocityY = -speed;
    } else if (dir === "D") {
      this.velocityX = 0;
      this.velocityY = speed;
    } else if (dir === "L") {
      this.velocityX = -speed;
      this.velocityY = 0;
    } else if (dir === "R") {
      this.velocityX = speed;
      this.velocityY = 0;
    }
  }

  render() {
    this.domElement.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
  }

  resetPosition() {
    this.x = this.startX;
    this.y = this.startY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.render();
  }
}
