// The hero background: a drifting graph. Nearby nodes link up, nodes near the pointer
// connect to it, and every so often a signal hops node to node along the edges, like a
// message being passed through a graph neural network. The portrait is a node too:
// nodes flow around it, link to its outer ring, and signals sometimes end there.
(function () {
  const canvas = document.querySelector('.hero__net');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const portraitEl = document.querySelector('[data-portrait]');

  const LINK = 140; // max edge length between nodes
  const RING_LINK = 120; // max edge length between a node and the portrait's ring
  const REACH = 200; // pointer link radius
  const SPEED = 0.16; // signal speed, px per ms
  const MAX_SIGNALS = 7;
  const NODE_RGB = '236, 236, 236';
  const SIGNAL_RGB = '244, 169, 59';

  let width = 0;
  let height = 0;
  let nodes = [];
  let edges = [];
  let signals = [];
  let glints = []; // amber flashes on the ring where a signal arrived
  let portrait = null; // { x, y, ring } in canvas coordinates
  let raf = 0;
  let running = false;
  let visible = true;
  let last = 0;
  let nextSpawn = 0;
  const pointer = { x: 0, y: 0, on: false, lastSpawn: 0 };

  function measurePortrait() {
    if (!portraitEl) return;
    const c = canvas.getBoundingClientRect();
    const p = portraitEl.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(portraitEl).getPropertyValue('--ring-gap')) || 0;
    portrait = {
      x: p.left - c.left + p.width / 2,
      y: p.top - c.top + p.height / 2,
      // use the layout size, not the (possibly mid-animation) transformed one
      ring: portraitEl.offsetWidth / 2 + gap,
    };
  }

  function insidePortrait(x, y, pad) {
    return portrait && Math.hypot(x - portrait.x, y - portrait.y) < portrait.ring + pad;
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    // Mobile browsers fire resize when the address bar slides in or out; if the canvas
    // itself kept its size, keep the graph as it is and only re-measure the portrait.
    if (nodes.length && rect.width === width && rect.height === height) {
      measurePortrait();
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    measurePortrait();

    const count = Math.round(Math.min(110, Math.max(30, (width * height) / 14000)));
    nodes = [];
    while (nodes.length < count) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      if (insidePortrait(x, y, 10)) continue;
      nodes.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.9 + Math.random() * 1.4,
        heat: 0, // brightens when a signal arrives
      });
    }
    signals = [];
    glints = [];
    link();
    draw();
  }

  // Shortest distance from the portrait centre to segment ab.
  function centreToSegment(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((portrait.x - a.x) * dx + (portrait.y - a.y) * dy) / len2));
    return Math.hypot(a.x + t * dx - portrait.x, a.y + t * dy - portrait.y);
  }

  // Rebuild the edge list and each node's neighbours.
  function link() {
    edges = [];
    for (const n of nodes) {
      n.adj = [];
      n.ringDist = portrait ? Math.hypot(n.x - portrait.x, n.y - portrait.y) - portrait.ring : Infinity;
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= LINK * LINK) continue;
        // an edge may not pass behind the portrait
        if (portrait && centreToSegment(a, b) < portrait.ring) continue;
        const d = Math.sqrt(d2);
        edges.push({ a: a, b: b, d: d });
        a.adj.push(b);
        b.adj.push(a);
      }
    }
  }

  function ringPoint(n) {
    const dx = n.x - portrait.x;
    const dy = n.y - portrait.y;
    const d = Math.hypot(dx, dy) || 1;
    return { x: portrait.x + (dx / d) * portrait.ring, y: portrait.y + (dy / d) * portrait.ring };
  }

  function spawn(from) {
    if (signals.length >= MAX_SIGNALS) return;
    const start = from || nodes[Math.floor(Math.random() * nodes.length)];
    if (!start || !start.adj.length) return;
    const to = start.adj[Math.floor(Math.random() * start.adj.length)];
    signals.push({ from: start, to: to, t: 0, hops: 3 + Math.floor(Math.random() * 4), trail: [] });
    start.heat = 1;
  }

  function step(dt) {
    for (const n of nodes) {
      n.x += n.vx * dt * 0.06;
      n.y += n.vy * dt * 0.06;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // flow around the portrait: push back to its edge and bounce
      if (portrait) {
        const dx = n.x - portrait.x;
        const dy = n.y - portrait.y;
        const d = Math.hypot(dx, dy) || 1;
        const min = portrait.ring + 10;
        if (d < min) {
          const nx = dx / d;
          const ny = dy / d;
          n.x = portrait.x + nx * min;
          n.y = portrait.y + ny * min;
          const dot = n.vx * nx + n.vy * ny;
          if (dot < 0) {
            n.vx -= 2 * dot * nx;
            n.vy -= 2 * dot * ny;
          }
        }
      }
      n.heat = Math.max(0, n.heat - dt / 900);
    }
    link();

    for (let i = signals.length - 1; i >= 0; i--) {
      const s = signals[i];
      const target = s.toRing ? ringPoint(s.from) : s.to;
      const len = Math.hypot(target.x - s.from.x, target.y - s.from.y) || 1;
      s.t += (SPEED * dt) / len;
      const k = Math.min(s.t, 1);
      const x = s.from.x + (target.x - s.from.x) * k;
      const y = s.from.y + (target.y - s.from.y) * k;
      s.trail.push({ x: x, y: y });
      if (s.trail.length > 10) s.trail.shift();

      if (s.t < 1) continue;

      if (s.toRing) {
        glints.push({ angle: Math.atan2(target.y - portrait.y, target.x - portrait.x), age: 0 });
        signals.splice(i, 1);
        continue;
      }

      s.to.heat = 1;
      s.hops -= 1;
      // a node next to the portrait sometimes hands the message to it
      if (portrait && s.to.ringDist < RING_LINK && Math.random() < 0.35) {
        s.from = s.to;
        s.toRing = true;
        s.t = 0;
        continue;
      }
      // otherwise pass it on to a neighbour it didn't just come from
      const options = s.to.adj.filter(n => n !== s.from);
      if (s.hops <= 0 || !options.length) {
        signals.splice(i, 1);
        continue;
      }
      s.from = s.to;
      s.to = options[Math.floor(Math.random() * options.length)];
      s.t = 0;
    }

    for (let i = glints.length - 1; i >= 0; i--) {
      glints[i].age += dt;
      if (glints[i].age > 1100) glints.splice(i, 1);
    }

    const now = performance.now();
    if (now > nextSpawn) {
      spawn();
      nextSpawn = now + 700 + Math.random() * 900;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (const e of edges) {
      const alpha = (1 - e.d / LINK) * 0.16;
      ctx.strokeStyle = 'rgba(' + NODE_RGB + ',' + alpha.toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(e.a.x, e.a.y);
      ctx.lineTo(e.b.x, e.b.y);
      ctx.stroke();
    }

    // edges from nearby nodes to the portrait's ring
    if (portrait) {
      for (const n of nodes) {
        if (n.ringDist >= RING_LINK) continue;
        const p = ringPoint(n);
        ctx.strokeStyle = 'rgba(' + NODE_RGB + ',' + ((1 - n.ringDist / RING_LINK) * 0.2).toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }

    if (pointer.on) {
      for (const n of nodes) {
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        if (d < REACH) {
          ctx.strokeStyle = 'rgba(' + NODE_RGB + ',' + ((1 - d / REACH) * 0.4).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx.fillStyle = 'rgba(' + NODE_RGB + ',' + (0.42 + n.heat * 0.4).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      if (n.heat > 0.02) {
        ctx.fillStyle = 'rgba(' + SIGNAL_RGB + ',' + (n.heat * 0.85).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const g of glints) {
      const life = 1 - g.age / 1100;
      const spread = 0.12 + (g.age / 1100) * 0.3;
      ctx.strokeStyle = 'rgba(' + SIGNAL_RGB + ',' + (life * 0.9).toFixed(3) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(portrait.x, portrait.y, portrait.ring, g.angle - spread, g.angle + spread);
      ctx.stroke();
    }
    ctx.lineWidth = 1;

    for (const s of signals) {
      for (let i = 1; i < s.trail.length; i++) {
        const p = s.trail[i - 1];
        const q = s.trail[i];
        ctx.strokeStyle = 'rgba(' + SIGNAL_RGB + ',' + ((i / s.trail.length) * 0.7).toFixed(3) + ')';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
      const head = s.trail[s.trail.length - 1];
      if (head) {
        ctx.fillStyle = 'rgb(' + SIGNAL_RGB + ')';
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.lineWidth = 1;
  }

  function frame(now) {
    const dt = Math.min(48, now - (last || now));
    last = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduced || !visible || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  window.addEventListener(
    'pointermove',
    e => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.on = pointer.y >= 0 && pointer.y <= rect.height && !insidePortrait(pointer.x, pointer.y, 0);
      // moving the pointer through the graph occasionally fires a signal from the nearest node
      const now = performance.now();
      if (pointer.on && running && now - pointer.lastSpawn > 450) {
        let best = null;
        let bestD = 90;
        for (const n of nodes) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < bestD) {
            best = n;
            bestD = d;
          }
        }
        if (best) {
          spawn(best);
          pointer.lastSpawn = now;
        }
      }
      if (reduced) draw();
    },
    { passive: true }
  );

  // pointerleave fires on the root element, not on document
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.on = false;
  });

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  // The portrait moves when the hero's text reflows (web fonts arriving, for instance).
  if (portraitEl && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
      measurePortrait();
      if (!running) draw();
    }).observe(portraitEl.parentNode);
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    }).observe(canvas);
  }

  resize();
  canvas.classList.add('is-on');
  start();
})();
