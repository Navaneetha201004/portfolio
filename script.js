
const galaxyStars = [];

for (let i = 0; i < 200; i++) {
  galaxyStars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5,
    speed: Math.random() * 0.2 + 0.05,
    alpha: Math.random()
  });
}

/* ================= STAR CANVAS ================= */


const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const stars = [];

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

function animateStars() {
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

  // 🌌 Galaxy background stars
for (const g of galaxyStars) {
  ctx.fillStyle = `rgba(0,255,170,${g.alpha})`;
  ctx.beginPath();
  ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
  ctx.fill();

  g.y += g.speed;
  if (g.y > canvas.height) {
    g.y = 0;
    g.x = Math.random() * canvas.width;
  }
}


  requestAnimationFrame(animateStars);
}

animateStars();

/* ================= EMAIL JS ================= */

// ⚠️ ITHA MATTUM NEE CHANGE PANNANUM
emailjs.init("YOUR_PUBLIC_KEY");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      this
    ).then(
      () => {
        alert("Message sent successfully 🚀");
        this.reset();
      },
      (error) => {
        alert("Failed to send message ❌");
        console.log(error);
      }
    );
  });
