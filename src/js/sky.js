// Gold starfield for the hero. Stars near the pointer join into constellations,
// and the occasional shooting star crosses the sky.

export function createSky(canvas, { reduced = false } = {}) {
  const ctx = canvas.getContext('2d');
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let stars = [];
  let comet = null;
  let w = 0, h = 0, dpr = 1;
  let running = false;
  let raf = 0;
  let t = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(260, (w * h) / 5200));
    stars = Array.from({ length: count }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + depth * 1.3,
        depth,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.04 * (0.4 + depth),
        vy: (Math.random() - 0.5) * 0.03 * (0.4 + depth),
        hue: Math.random() < 0.15 ? 'ivory' : 'gold',
      };
    });
    if (reduced) draw();
  }

  function spawnComet() {
    const fromLeft = Math.random() < 0.5;
    comet = {
      x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
      y: Math.random() * h * 0.35,
      vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 4),
      vy: 2.5 + Math.random() * 2,
      life: 1,
    };
  }

  function draw() {
    t += 0.016;
    ctx.clearRect(0, 0, w, h);

    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    const px = (mouse.x - w / 2) / w;
    const py = (mouse.y - h / 2) / h;
    const near = [];

    for (const s of stars) {
      if (!reduced) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
      }
      // parallax: deeper stars move more with the pointer
      const ox = mouse.tx > -999 ? -px * 24 * s.depth : 0;
      const oy = mouse.ty > -999 ? -py * 24 * s.depth : 0;
      const x = s.x + ox;
      const y = s.y + oy;
      const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
      const a = (0.25 + s.depth * 0.75) * tw;

      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.hue === 'gold' ? `rgba(233, 207, 143, ${a})` : `rgba(237, 229, 212, ${a})`;
      ctx.fill();

      if (s.r > 1.25) {
        ctx.beginPath();
        ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 165, 92, ${a * 0.08})`;
        ctx.fill();
      }

      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d < 190) near.push({ x, y, d });
    }

    // constellation threads around the pointer
    near.sort((a, b) => a.d - b.d);
    const pts = near.slice(0, 14);
    ctx.lineWidth = 0.6;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dd = Math.hypot(a.x - b.x, a.y - b.y);
        if (dd > 120) continue;
        const alpha = (1 - dd / 120) * (1 - Math.max(a.d, b.d) / 190) * 0.65;
        ctx.strokeStyle = `rgba(201, 165, 92, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    if (!reduced) {
      if (!comet && Math.random() < 0.0035) spawnComet();
      if (comet) {
        const c = comet;
        const tail = 16;
        const grad = ctx.createLinearGradient(c.x, c.y, c.x - c.vx * tail, c.y - c.vy * tail);
        grad.addColorStop(0, `rgba(255, 241, 200, ${0.9 * c.life})`);
        grad.addColorStop(1, 'rgba(201, 165, 92, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * tail, c.y - c.vy * tail);
        ctx.stroke();
        c.x += c.vx;
        c.y += c.vy;
        c.life -= 0.012;
        if (c.life <= 0 || c.x < -200 || c.x > w + 200 || c.y > h + 200) comet = null;
      }
    }
  }

  function loop() {
    draw();
    raf = requestAnimationFrame(loop);
  }

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
    if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    if (reduced) draw();
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });

  return {
    start() {
      if (running || reduced) return;
      running = true;
      loop();
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
  };
}
