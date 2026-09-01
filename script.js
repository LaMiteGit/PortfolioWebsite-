// ============================================================
// Menu mobile
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// Année dans le footer
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Animation du hero : un champ de particules reliées par des
// segments, comme un debug view de physique (vecteurs de
// vélocité). C'est le seul moment animé "non déclenché" du
// site — tout le reste ne bouge qu'au survol/clic.
// ============================================================
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let particles = [];
let width, height;

function resize() {
  width = canvas.width = canvas.offsetWidth * devicePixelRatio;
  height = canvas.height = canvas.offsetHeight * devicePixelRatio;
}

function initParticles() {
  const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 18000);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
    vy: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
  }));
}

function step() {
  ctx.clearRect(0, 0, width, height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  const linkDist = 140 * devicePixelRatio;

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];

    // point
    ctx.beginPath();
    ctx.arc(a.x, a.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(77, 225, 198, 0.7)';
    ctx.fill();

    // petit vecteur de vélocité, comme un gizmo de debug
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(a.x + a.vx * 14, a.y + a.vy * 14);
    ctx.strokeStyle = 'rgba(77, 225, 198, 0.35)';
    ctx.lineWidth = 1 * devicePixelRatio;
    ctx.stroke();

    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < linkDist) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(139, 147, 161, ${0.12 * (1 - dist / linkDist)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}

if (canvas) {
  resize();
  initParticles();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  if (!prefersReducedMotion) {
    requestAnimationFrame(step);
  } else {
    step(); // dessine une seule frame statique
  }
}
