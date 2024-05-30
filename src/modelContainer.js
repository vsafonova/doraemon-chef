let width, height, halfX, halfY;

let lines = [];

let linessNumber = 4;

let vertices = 100;

let color = "#ff0429";

for (let i = 0; i < vertices; i++) {
  let pooint = {
    x: Math.cos((i / vertices) * Math.PI * 2),
    y: Math.sin((i / vertices) * Math.PI * 2),
  };
}

let containerEl = document.getElementById("container");
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

containerEl.appendChild(canvas);

Sizing();

function update() {}

function render() {
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = "#FF0000";
}

function raf() {
  update();
  render();
  window.requestAnimationFrame(raf);
}

raf();

function Sizing() {
  width = window.innerWidth;
  height = 400;

  halfX = width / 2;
  halfY = height / 2;

  canvas.width = width;
  canvas.height = height;
}
