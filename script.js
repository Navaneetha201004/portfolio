const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    stars.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 3 + 1,
      alpha: 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];

    ctx.fillStyle = `rgba(0, 255, 170, ${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();

    s.x += s.speedX;
    s.y += s.speedY;
    s.alpha -= 0.03;
    s.size *= 0.97;

    if (s.alpha <= 0) {
      stars.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

animate();

