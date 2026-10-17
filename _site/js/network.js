// Interactive graph behind the hero: drifting nodes link up when they get close,
// and nearby nodes connect to the pointer. A small nod to graph neural networks.
(function () {
  const canvas = document.querySelector('.hero-section__canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LINK_DISTANCE = 130;
  const POINTER_DISTANCE = 190;

  let width = 0;
  let height = 0;
  let nodes = [];
  let frame = 0;
  let running = false;
  let inView = true;
  let rgb = '0, 212, 255';
  let strength = 1;
  const pointer = { x: 0, y: 0, active: false };

  function readTheme() {
    const styles = getComputedStyle(document.documentElement);
    rgb = styles.getPropertyValue('--accent-rgb').trim() || rgb;
    strength = document.documentElement.getAttribute('data-theme') === 'light' ? 0.8 : 1;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(95, Math.max(26, (width * height) / 15000)));
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 0.8 + Math.random() * 1.6,
      });
    }
    draw();
  }

  function step() {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DISTANCE * LINK_DISTANCE) {
          const alpha = (1 - Math.sqrt(d2) / LINK_DISTANCE) * 0.2 * strength;
          ctx.strokeStyle = 'rgba(' + rgb + ', ' + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (pointer.active) {
        const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (d < POINTER_DISTANCE) {
          const alpha = (1 - d / POINTER_DISTANCE) * 0.45 * strength;
          ctx.strokeStyle = 'rgba(' + rgb + ', ' + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = 'rgba(' + rgb + ', ' + (0.55 * strength).toFixed(3) + ')';
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    step();
    draw();
    frame = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduced || !inView || document.hidden) return;
    running = true;
    frame = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(frame);
  }

  window.addEventListener(
    'pointermove',
    function (e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
      if (reduced) draw();
    },
    { passive: true }
  );
  // pointerleave never fires on `document`; the root element gets it when the pointer exits the window
  document.documentElement.addEventListener('pointerleave', function () {
    pointer.active = false;
  });

  let resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else start();
  });

  document.addEventListener('themechange', function () {
    readTheme();
    if (!running) draw();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView) start();
      else stop();
    }).observe(canvas);
  }

  readTheme();
  resize();
  canvas.classList.add('is-ready');
  start();
})();
