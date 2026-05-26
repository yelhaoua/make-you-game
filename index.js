import BuildMap from "./buildeMap.js";

let canvas;
let ctx;

const player = {
  x: 50,
  y: 100,
  speed: 3,
};



function draw() {

  BuildMap(canvas, ctx);


}

function gameLoop() {


console.log("Hneaaaaaaaaaa");

  draw();
}

window.onload = () => {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");



  gameLoop(); 
};
