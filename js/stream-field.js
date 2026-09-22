/**
 * Stream Convergence / Flow Field
 * Inspired by ThreeUI's Portal Field & Stream Convergence collection.
 * Pure, high-performance Canvas2D/WebGL-grade procedural vector field.
 *
 * Simulates two organic thought streams:
 *   - Amber stream (Person side, left)
 *   - Teal stream (Work side, right)
 * Converging at the center with multi-octave harmonic fluid physics
 * and soft magnetic cursor repulsion/vortex.
 */

(() => {
  'use strict';

  const canvas = document.getElementById('hero-flow-canvas');
  if (!canvas) return;

  const stage = canvas.closest('.stage--hero');
  if (!stage) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches) {
    drawStaticField();
    return;
  }

  /* ---------- Configuration ---------- */
  const CONFIG = {
    particleCount: 160,
    trailLength: 8,
    speedBase: 0.9,
    mouseRadius: 110,
    mouseForce: 1.4,
    colorPerson: { r: 245, g: 185, b: 102 }, // Amber
    colorWork:   { r: 116, g: 219, b: 205 }, // Teal
    colorMid:    { r: 230, g: 240, b: 235 }, // Soft white convergence
  };

  let width = 0;
  let height = 0;
  let dpr = 1;
  let animId = null;
  let isVisible = false;
  let time = 0;

  // Mouse state (lerped for fluid spring feel)
  const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, active: false };

  /* ---------- Particle Class ---------- */
  class StreamParticle {
    constructor(isPerson) {
      this.isPerson = isPerson;
      this.history = [];
      this.reset(true);
    }

    reset(initial = false) {
      this.history.length = 0;
      this.life = 0;
      this.maxLife = 180 + Math.random() * 160;
      this.size = 1.0 + Math.random() * 1.6;
      this.speed = (CONFIG.speedBase + Math.random() * 0.7) * (this.isPerson ? 1 : -1);

      // Origin positions: person starts left rail (around 25% w), work starts right rail (around 75% w)
      const railX = this.isPerson ? width * 0.25 : width * 0.75;
      const spreadX = width * 0.12;

      this.x = initial
        ? railX + (Math.random() - 0.5) * spreadX * 2
        : railX + (Math.random() - 0.5) * spreadX;

      this.y = height * (0.18 + Math.random() * 0.68);
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.baseAlpha = 0.25 + Math.random() * 0.45;
    }

    update() {
      this.life++;
      if (this.life > this.maxLife) {
        this.reset();
        return;
      }

      // Store trail history
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > CONFIG.trailLength) {
        this.history.shift();
      }

      // Procedural Vector Flow Field (Multi-frequency Curl/Harmonic field)
      const nx = (this.x / width) * 3.2;
      const ny = (this.y / height) * 3.2;
      const t = time * 0.0018;

      // Convergence attraction toward the central bridge (x: 0.5, y: 0.5)
      const centerX = width * 0.5;
      const centerY = height * 0.54;
      const dxToCenter = centerX - this.x;
      const dyToCenter = centerY - this.y;

      // Base fluid flow angle
      const angle =
        Math.sin(ny * 1.8 + t * 1.2) * Math.cos(nx * 1.4 - t) * 1.8 +
        Math.sin((nx + ny) * 2.2 + t * 0.8) * 0.9;

      // Drift toward center horizontally
      const driftX = this.isPerson ? 0.85 : -0.85;
      const convergePull = dxToCenter * 0.0006;
      const convergePullY = dyToCenter * 0.0004;

      this.vx += (Math.cos(angle) * 0.5 + driftX + convergePull) * 0.08;
      this.vy += (Math.sin(angle) * 0.7 + convergePullY) * 0.08;

      // Mouse interactive fluid displacement
      if (mouse.active) {
        const mdx = this.x - mouse.x;
        const mdy = this.y - mouse.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (dist < CONFIG.mouseRadius && dist > 1) {
          const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseForce;
          const pushX = (mdx / dist) * force;
          const pushY = (mdy / dist) * force;

          // Gentle vortex curl around the pointer
          this.vx += pushX * 1.2 - pushY * 0.6;
          this.vy += pushY * 1.2 + pushX * 0.6;
        }
      }

      // Viscous damping
      this.vx *= 0.92;
      this.vy *= 0.92;

      this.x += this.vx;
      this.y += this.vy;

      // Bounds wrap / regeneration
      if (
        this.x < width * 0.08 ||
        this.x > width * 0.92 ||
        this.y < height * 0.1 ||
        this.y > height * 0.9
      ) {
        this.reset();
      }
    }

    draw() {
      if (this.history.length < 2) return;

      // Compute normalized progress toward center for color interpolation
      const normX = Math.min(Math.max((this.x - width * 0.25) / (width * 0.5), 0), 1);
      const cPerson = CONFIG.colorPerson;
      const cWork = CONFIG.colorWork;
      const cMid = CONFIG.colorMid;

      // Smooth color blending across streams
      let r, g, b;
      if (this.isPerson) {
        // Blends from pure Person (amber) towards mid
        const t = normX;
        r = Math.round(cPerson.r + (cMid.r - cPerson.r) * (t * 0.6));
        g = Math.round(cPerson.g + (cMid.g - cPerson.g) * (t * 0.6));
        b = Math.round(cPerson.b + (cMid.b - cPerson.b) * (t * 0.6));
      } else {
        // Blends from pure Work (teal) towards mid
        const t = 1 - normX;
        r = Math.round(cWork.r + (cMid.r - cWork.r) * (t * 0.6));
        g = Math.round(cWork.g + (cMid.g - cWork.g) * (t * 0.6));
        b = Math.round(cWork.b + (cMid.b - cWork.b) * (t * 0.6));
      }

      // Life fade-in & fade-out curve (smooth sine)
      const lifeProgress = this.life / this.maxLife;
      const fade = Math.sin(lifeProgress * Math.PI);
      const alpha = this.baseAlpha * fade;

      // Draw streaming ribbon trail
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        const xc = (this.history[i].x + this.history[i - 1].x) / 2;
        const yc = (this.history[i].y + this.history[i - 1].y) / 2;
        ctx.quadraticCurveTo(this.history[i - 1].x, this.history[i - 1].y, xc, yc);
      }
      ctx.lineTo(this.x, this.y);

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.55})`;
      ctx.lineWidth = this.size * 0.75;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glowing head
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`;
      ctx.fill();
    }
  }

  /* ---------- Stream Manager ---------- */
  let particles = [];

  function initParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      // 50% person side, 50% work side
      particles.push(new StreamParticle(i % 2 === 0));
    }
  }

  function resize() {
    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initParticles();
  }

  /* ---------- Main Animation Loop ---------- */
  function loop(timestamp) {
    if (!isVisible) return;

    time = timestamp || 0;

    // Smooth mouse lerp
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
    }

    // Clear with transparent wash
    ctx.clearRect(0, 0, width, height);

    // Render flow field particles
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Subtle ambient nexus glow at convergence point
    const cx = width * 0.5;
    const cy = height * 0.54;
    const pulse = 1 + Math.sin(time * 0.002) * 0.15;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140 * pulse);
    grad.addColorStop(0, 'rgba(116, 219, 205, 0.06)');
    grad.addColorStop(0.5, 'rgba(245, 185, 102, 0.03)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 140 * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    animId = requestAnimationFrame(loop);
  }

  /* ---------- Event Listeners & Lifecycle ---------- */
  // Resize observer for stage container
  const resizeObs = new ResizeObserver(() => {
    resize();
  });
  resizeObs.observe(stage);

  // Mouse / Touch tracking
  stage.addEventListener('pointermove', e => {
    const rect = stage.getBoundingClientRect();
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    mouse.active = true;
  }, { passive: true });

  stage.addEventListener('pointerleave', () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }, { passive: true });

  // IntersectionObserver: 0% CPU consumption when scrolled out of view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        if (!animId) {
          animId = requestAnimationFrame(loop);
        }
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    });
  }, { threshold: 0.05 });

  observer.observe(stage);

  // Initial sizing and start
  resize();

  /* ---------- Fallback for prefers-reduced-motion ---------- */
  function drawStaticField() {
    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Draw static elegant luminous arcs
    const cx = width * 0.5;
    const cy = height * 0.54;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180);
    grad.addColorStop(0, 'rgba(116, 219, 205, 0.12)');
    grad.addColorStop(0.5, 'rgba(245, 185, 102, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
})();

