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

class LineQueue {
  q = [];

  constructor(lines) {
    this.q.push(...lines);
  }

  front() {
    return this.q.length > 0 ? this.q[0] : null;
  }

  push(line) {
    this.q.push(line);
  }

  pop() {
    return this.q.shift();
  }
}

function drawLine(ctx, from, to) {
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.moveTo(0, 0);
}

function drawKochFractal(level) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "white";

  const lines = new LineQueue([
    {
      from: { x: 0, y: h / 2 },
      to: { x: w, y: h / 2 },
      level,
    },
  ]);
  console.log(lines);

  // compute all lines contained in the fractal
  // while (lines.canCompute()) {
  //   lines.compute();
  // }
}

slider.addEventListener("change", (e) => drawKochFractal(e.target.value));

drawKochFractal(1);
