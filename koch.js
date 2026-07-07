console.log("koch.js loaded");

const canvas = document.getElementById("koch-canvas");

if (!canvas) {
  throw new Exception("Canvas not found");
}

const ctx = canvas.getContext("2d");
ctx.fillRect(0, 0, 100, 100);
