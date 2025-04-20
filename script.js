let ball1, ball2;
let vx1 = 0, vy1 = 0, vx2 = 0, vy2 = 0;
let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
let r1, r2, m1, m2, e;
let animationId;

function createBall1() {
  r1 = parseFloat(document.getElementById("r1").value);
  m1 = parseFloat(document.getElementById("m1").value);
  vx1 = parseFloat(document.getElementById("vx1").value);
  vy1 = parseFloat(document.getElementById("vy1").value);
  if (isNaN(r1) || isNaN(m1)) return alert("Enter valid Ball 1 values");

  const box = document.getElementById("box-wrapper");
  if (ball1) ball1.remove();

  ball1 = document.createElement("div");
  ball1.className = "ball";
ball1.style.width = ball1.style.height = `${r1 * 2}px`;
  ball1.style.background = "blue";
  ball1.style.left = "50px";
  ball1.style.top = "200px";
  box.appendChild(ball1);
  x1 = 50; y1 = 200;
}

function createBall2() {
  r2 = parseFloat(document.getElementById("r2").value);
  m2 = parseFloat(document.getElementById("m2").value);
  vx2 = parseFloat(document.getElementById("vx2").value);
  vy2 = parseFloat(document.getElementById("vy2").value);
  if (isNaN(r2) || isNaN(m2)) return alert("Enter valid Ball 2 values");

  const box = document.getElementById("box-wrapper");
  if (ball2) ball2.remove();

  ball2 = document.createElement("div");
  ball2.className = "ball";
  ball2.style.width = ball2.style.height = `${r2 * 2}px`;
  ball2.style.background = "red";
  ball2.style.left = "600px";
  ball2.style.top = "200px";
  box.appendChild(ball2);
  x2 = 600; y2 = 200;
}

function startSimulation() {
  if (!ball1 || !ball2) return alert("Create both balls first");
  e = parseFloat(document.getElementById("e").value);
  if (isNaN(e)) return alert("Enter valid value for e");

  if (animationId) cancelAnimationFrame(animationId);
  animate();
}

function animate() {
  x1 += vx1;
  y1 += vy1;
  x2 += vx2;
  y2 += vy2;

  ball1.style.left = `${x1}px`;
ball1.style.top = `${y1}px`;
ball2.style.left = `${x2}px`;
  ball2.style.top = `${y2}px`;
  const boxWidth = 700, boxHeight = 500;
  if (x1 <= 0 || x1 + r1 * 2 >= boxWidth) vx1 = -vx1;
  if (y1 <= 0 || y1 + r1 * 2 >= boxHeight) vy1 = -vy1;
  if (x2 <= 0 || x2 + r2 * 2 >= boxWidth) vx2 = -vx2;
  if (y2 <= 0 || y2 + r2 * 2 >= boxHeight) vy2 = -vy2;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist <= r1 + r2) {

     const nx = dx / dist;
    const ny = dy / dist;
    const p = (2 * (vx1 * nx + vy1 * ny - vx2 * nx - vy2 * ny)) / (m1 + m2);
    vx1 = vx1 - p * m2 * nx * e;
   vy1 = vy1 - p * m2 * ny * e;
    vx2 = vx2 + p * m1 * nx * e;
    vy2 = vy2 + p * m1 * ny * e;
  }

  animationId = requestAnimationFrame(animate);
}
