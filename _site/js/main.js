// Behaviour for jessechumo.com: the tmux status line, scroll reveals, the obfuscation
// diff, the neofetch print-out, a live clock and copy-to-clipboard.
(function () {
  window.__ready = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) => Array.prototype.slice.call((scope || document).querySelectorAll(selector));

  /* ----------------------------------------------------------- small bits */

  $$('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

  // "Uptime": time since the first engineering job.
  $$('[data-uptime]').forEach(el => {
    const since = new Date(el.getAttribute('data-uptime'));
    const now = new Date();
    let months = (now.getFullYear() - since.getFullYear()) * 12 + (now.getMonth() - since.getMonth());
    if (now.getDate() < since.getDate()) months -= 1;
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
    el.textContent = rest ? plural(years, 'year') + ', ' + plural(rest, 'month') : plural(years, 'year');
  });

  // Local time in Dallas, formatted the way tmux prints it: 21:52 16-Oct-26
  const clock = $('[data-clock]');
  if (clock && window.Intl) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour12: false,
    });
    const tick = () => {
      const p = {};
      parts.formatToParts(new Date()).forEach(part => (p[part.type] = part.value));
      clock.textContent = p.hour + ':' + p.minute + ' ' + p.day + '-' + p.month + '-' + p.year;
      clock.setAttribute('datetime', new Date().toISOString());
    };
    tick();
    setInterval(tick, 15000);
  }

  const toastEl = $('[data-toast]');
  let toastTimer = 0;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
  }

  /* --------------------------------------------------------------- reveal */

  function onceVisible(el, callback, options) {
    if (!('IntersectionObserver' in window)) return callback(el);
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          callback(entry.target);
        }),
      options || { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    io.observe(el);
  }

  $$('[data-reveal]').forEach(el => onceVisible(el, target => target.classList.add('is-in')));

  /* --------------------------------------------------- tmux status line */

  const windows = $$('.tmux__windows a');
  const sections = windows.map(a => document.getElementById(a.getAttribute('data-window')));
  const session = $('[data-tmux-session]');
  let current = 0;
  let lastWindow = -1;
  // While a jump scrolls past other sections, remember where it started so that,
  // like tmux, the "last window" is the one you jumped from.
  let jump = null;
  let jumpTimer = 0;

  function setWindow(index) {
    if (index === current || index < 0) return;
    lastWindow = jump ? jump.from : current;
    current = index;
    if (jump && index === jump.to) jump = null;
    windows.forEach((a, i) => {
      a.classList.toggle('is-current', i === current);
      a.classList.toggle('is-last', i === lastWindow);
      if (i === current) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    // keep the current window visible when the bar scrolls sideways on phones
    const a = windows[current];
    const bar = a.parentNode.parentNode;
    if (bar.scrollWidth > bar.clientWidth) bar.scrollLeft = a.parentNode.offsetLeft - 40;
  }

  windows[0].classList.add('is-current');
  windows[0].setAttribute('aria-current', 'location');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) setWindow(sections.indexOf(entry.target));
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(section => section && io.observe(section));
  }

  // The contact section is short; when the page bottoms out, it is the current window.
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) setWindow(windows.length - 1);
      });
    },
    { passive: true }
  );

  function goTo(index) {
    if (index < 0 || index >= sections.length || index === current) return;
    const target = sections[index];
    if (!target) return;
    jump = { from: current, to: index };
    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(() => (jump = null), 2500);
    if (index === 0) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', index === 0 ? location.pathname : '#' + target.id);
  }

  windows.forEach((a, i) =>
    a.addEventListener('click', e => {
      e.preventDefault();
      goTo(i);
    })
  );

  // tmux key bindings: ctrl-b, then a window number, n/p for next/previous, l for the last window.
  let prefixTimer = 0;
  let prefix = false;
  function armPrefix(on) {
    prefix = on;
    if (session) session.classList.toggle('is-prefix', on);
    clearTimeout(prefixTimer);
    if (on) prefixTimer = setTimeout(() => armPrefix(false), 2000);
  }

  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    if (typing) return;
    if (e.ctrlKey && !e.metaKey && !e.altKey && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      armPrefix(true);
      return;
    }
    if (!prefix) return;
    let handled = true;
    if (/^[0-9]$/.test(e.key)) goTo(Number(e.key));
    else if (e.key === 'n') goTo((current + 1) % sections.length);
    else if (e.key === 'p') goTo((current - 1 + sections.length) % sections.length);
    else if (e.key === 'l') goTo(lastWindow);
    else if (e.key !== 'Control' && e.key !== 'Shift') handled = e.key === 'Escape';
    else return;
    if (handled) e.preventDefault();
    armPrefix(false);
  });

  /* ---------------------------------------------------- obfuscation diff */

  const variants = {
    rename: {
      caption: 'Every identifier renamed. Nothing about what the function does has changed.',
      lines: [
        ['int f_3a(int v_1) {', 1],
        ['    int v_9 = 0;', 1],
        ['    for (int v_2 = 0; v_2 < v_1; v_2++)', 1],
        ['        v_9 += v_2;', 1],
        ['    return v_9;', 1],
        ['}', 0],
      ],
    },
    dead: {
      caption: 'An opaque predicate: n < 0 && n > 0 is never true, so the new branch never runs.',
      lines: [
        ['int sum(int n) {', 0],
        ['    int total = 0;', 0],
        ['    if (n < 0 && n > 0)', 1],
        ['        total = n * 7;', 1],
        ['    for (int i = 0; i < n; i++)', 0],
        ['        total += i;', 0],
        ['    return total;', 0],
        ['}', 0],
      ],
    },
    flow: {
      caption: 'The for loop becomes while (1) with an explicit exit: the same iterations, a different control-flow graph.',
      lines: [
        ['int sum(int n) {', 0],
        ['    int total = 0, i = 0;', 1],
        ['    while (1) {', 1],
        ['        if (i >= n) break;', 1],
        ['        total += i;', 0],
        ['        i++;', 1],
        ['    }', 1],
        ['    return total;', 0],
        ['}', 0],
      ],
    },
    all: {
      caption:
        "All three transformations at once. The function still returns the same value for every input; the question is whether a detector's prediction moves.",
      lines: [
        ['int f_3a(int v_1) {', 1],
        ['    int v_9 = 0, v_2 = 0;', 1],
        ['    if (v_1 < 0 && v_1 > 0)', 1],
        ['        v_9 = v_1 * 7;', 1],
        ['    while (1) {', 1],
        ['        if (v_2 >= v_1) break;', 1],
        ['        v_9 += v_2;', 1],
        ['        v_2++;', 1],
        ['    }', 0],
        ['    return v_9;', 1],
        ['}', 0],
      ],
    },
  };

  const diffOut = $('[data-diff-out] code');
  const diffCaption = $('[data-diff-caption]');
  const diffTabs = $$('.diff__tab');
  const escapeHtml = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function showVariant(name, focus) {
    const variant = variants[name];
    if (!variant || !diffOut) return;
    diffTabs.forEach(tab => {
      const on = tab.getAttribute('data-variant') === name;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });
    diffOut.innerHTML = variant.lines
      .map(
        (line, i) =>
          '<span class="diff__line' +
          (line[1] ? ' is-changed' + (reduced ? '' : ' is-new') : '') +
          '" style="animation-delay:' +
          i * 30 +
          'ms">' +
          escapeHtml(line[0]) +
          '</span>'
      )
      .join('');
    if (diffCaption) diffCaption.textContent = variant.caption;
  }

  diffTabs.forEach((tab, i) => {
    tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
    tab.addEventListener('click', () => showVariant(tab.getAttribute('data-variant')));
    tab.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next = diffTabs[(i + (e.key === 'ArrowRight' ? 1 : diffTabs.length - 1)) % diffTabs.length];
      showVariant(next.getAttribute('data-variant'), true);
    });
  });

  /* ------------------------------------------------- neofetch print-out */

  const art = $('.neofetch__art');
  if (art && !reduced) {
    const lines = art.textContent.split('\n');
    art.innerHTML = lines.map(line => '<span class="art-line">' + escapeHtml(line) + '</span>').join('\n');
    art.classList.add('is-printing');
    const rows = $$('.art-line', art);
    onceVisible(
      art,
      () => {
        let i = 0;
        const timer = setInterval(() => {
          if (i >= rows.length) {
            clearInterval(timer);
            art.classList.remove('is-printing');
            return;
          }
          rows[i++].classList.add('is-shown');
        }, 22);
      },
      { threshold: 0.3 }
    );
  }

  /* ------------------------------------------------------ svg diagrams */

  // SMIL animations keep running offscreen; pause them when they can't be seen.
  $$('svg.diagram').forEach(svg => {
    if (!svg.pauseAnimations) return;
    if (reduced) {
      svg.pauseAnimations();
      return;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }).observe(svg);
    }
  });

  /* ------------------------------------------------------------ copying */

  $$('[data-copy]').forEach(button => {
    button.addEventListener('click', () => {
      const text = button.getAttribute('data-copy');
      const done = () => {
        button.textContent = 'copied';
        toast('copied ' + text);
        setTimeout(() => (button.textContent = 'copy'), 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, () => toast(text));
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          done();
        } catch (err) {
          toast(text);
        }
        document.body.removeChild(area);
        button.focus();
      }
    });
  });
})();
