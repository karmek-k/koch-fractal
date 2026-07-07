/**
 * koch.js - generates a Koch fractal in a HTML canvas element
 * Copyright (C) 2026 Bartosz Gleń
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

console.log("koch.js loaded");

const canvas = document.getElementById("koch-canvas");
if (!canvas) {
  throw new Exception("Canvas not found");
}

const slider = document.getElementById("slider");
if (!slider) {
  throw new Exception("Slider not found");
}

const w = parseFloat(canvas.width);
const h = parseFloat(canvas.height);
const ctx = canvas.getContext("2d");

class LineQueue {
  q = [];

  front() {
    return this.q.length > 0 ? this.q[0] : null;
  }

  push(line) {
    this.q.push(line);
  }

  pop() {
    return this.q.shift();
  }

  *iter() {
    for (let line of this.q) {
      yield line;
    }
  }
}

class VecMath {
  static add(u, v) {
    return {
      x: u.x + v.x,
      y: u.y + v.y,
    };
  }

  static sub(u, v) {
    return {
      x: u.x - v.x,
      y: u.y - v.y,
    };
  }

  static scale(u, factor) {
    return {
      x: u.x * factor,
      y: u.y * factor,
    };
  }

  static transform(u, translation, angle) {
    const theta = (angle * Math.PI) / 180.0;

    return {
      x: u.x * Math.cos(theta) - u.y * Math.sin(theta) + translation.x,
      y: u.x * Math.sin(theta) + u.y * Math.cos(theta) + translation.y,
    };
  }

  static lerp(u, v, factor) {
    const scaled = VecMath.scale(VecMath.sub(v, u), factor);

    return VecMath.add(scaled, u);
  }
}

class KochFractalSolver {
  q = new LineQueue();

  solve(line) {
    this.q.push(line);

    const onethirdFactor = 1.0 / 3.0;
    const twothirdsFactor = 2.0 / 3.0;
    const peakAngle = -60.0;

    // solving the fractal until only primitive elements remain
    // i.e. elements with level = 0, which are straight lines
    while (this.q.front().level > 0) {
      // guaranteed that level > 0
      const line = this.q.pop();

      const onethird = VecMath.lerp(line.from, line.to, onethirdFactor);
      const twothirds = VecMath.lerp(line.from, line.to, twothirdsFactor);
      const peak = VecMath.transform(
        VecMath.sub(onethird, line.from),
        onethird,
        peakAngle,
      );

      // from -> onethird
      this.q.push({
        from: line.from,
        to: onethird,
        level: line.level - 1,
      });

      // onethird -> peak
      this.q.push({
        from: onethird,
        to: peak,
        level: line.level - 1,
      });

      // peak -> twothirds
      this.q.push({
        from: peak,
        to: twothirds,
        level: line.level - 1,
      });

      // twothirds -> to
      this.q.push({
        from: twothirds,
        to: line.to,
        level: line.level - 1,
      });
    }
  }

  getQueue() {
    return this.q;
  }
}

function drawLine(ctx, from, to) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

function drawKochFractal(level) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);

  const solver = new KochFractalSolver();

  solver.solve({
    from: { x: 0, y: h },
    to: { x: w, y: h },
    level,
  });

  for (let line of solver.getQueue().iter()) {
    drawLine(ctx, line.from, line.to);
  }
}

slider.addEventListener("change", (e) => drawKochFractal(e.target.value));

drawKochFractal(1);
