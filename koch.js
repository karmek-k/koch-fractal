console.log("koch.js loaded");

const canvas = document.getElementById("koch-canvas");
if (!canvas) {
  throw new Exception("Canvas not found");
}

const slider = document.getElementById("slider");
if (!slider) {
  throw new Exception("Slider not found");
}

const w = canvas.getAttribute("width");
const h = canvas.getAttribute("height");
const ctx = canvas.getContext("2d");

function drawLine(ctx, beginning, end) {
  ctx.moveTo(beginning.x, beginning.y);
  ctx.lineTo(end.x, end.y);
  ctx.moveTo(0, 0);
}

function drawKochFractal(level) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "white";
  console.log(`Draw koch fractal at level ${level}`);
  // ...
}

slider.addEventListener("change", (e) => {
  drawKochFractal(e.target.value);
});

drawKochFractal(1);
