// Site behaviour: theme, navigation, reveals, tabs, typing effects and live GitHub stats.
(function () {
  window.__portfolioReady = true;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const data = typeof portfolioData !== 'undefined' ? portfolioData : { email: 'jessechumo@gmail.com', github: 'jessechumo' };
  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) => Array.prototype.slice.call((scope || document).querySelectorAll(selector));

  /* ------------------------------------------------------------------ misc */

  $$('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

  const toastEl = $('[data-toast]');
  let toastTimer = 0;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2400);
  }

  /* ----------------------------------------------------------------- theme */

  const themeMeta = $('meta[name="theme-color"]');

  function syncThemeUi() {
    const light = root.getAttribute('data-theme') === 'light';
    $$('[data-theme-toggle]').forEach(button => {
      button.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      const label = $('.mobile-menu__theme-label', button);
      if (label) label.textContent = light ? 'Dark theme' : 'Light theme';
    });
    if (themeMeta) themeMeta.setAttribute('content', light ? '#f5f8fc' : '#0a192f');
  }

  function toggleTheme() {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.classList.add('theme-transition');
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* storage can be unavailable (private mode); the theme still applies for this visit */
    }
    syncThemeUi();
    document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    setTimeout(() => root.classList.remove('theme-transition'), 400);
  }

  $$('[data-theme-toggle]').forEach(button => button.addEventListener('click', toggleTheme));
  syncThemeUi();

  /* ------------------------------------------------------------ navigation */

  const nav = $('[data-nav]');
  const progress = $('.scroll-progress');
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const menuOpen = document.body.classList.contains('menu-open');

    nav.classList.toggle('is-scrolled', y > 20);
    if (!menuOpen && Math.abs(y - lastY) > 6) {
      nav.classList.toggle('is-hidden', y > lastY && y > 300);
    }
    if (progress) progress.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  // Highlight the nav link of the section currently in view.
  const navLinks = $$('[data-nav-link]');
  if ('IntersectionObserver' in window && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === id));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    $$('main section[id]').forEach(section => sectionObserver.observe(section));
  }

  /* ----------------------------------------------------------- mobile menu */

  const burger = $('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');

  function setMenu(open) {
    if (!burger || !menu) return;
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $$('.main, .footer').forEach(el => {
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
    if (open) {
      nav.classList.remove('is-hidden');
      // give the drawer a moment to become focusable before moving focus into it
      const first = $('a', menu);
      if (first) setTimeout(() => first.focus({ preventScroll: true }), 80);
    }
  }

  if (burger && menu) {
    burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    $$('a', menu).forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setMenu(false);
        burger.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && document.body.classList.contains('menu-open')) setMenu(false);
    });
  }

  /* ------------------------------------------------------------- spotlight */

  if (finePointer && !reducedMotion) {
    const spotlight = $('.spotlight');
    let pending = false;
    let px = 0;
    let py = 0;
    window.addEventListener(
      'pointermove',
      e => {
        px = e.clientX;
        py = e.clientY;
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
          spotlight.style.setProperty('--spot-x', px + 'px');
          spotlight.style.setProperty('--spot-y', py + 'px');
          pending = false;
        });
      },
      { passive: true }
    );
    document.body.classList.add('has-spotlight');
  }

  /* ---------------------------------------------------------------- reveal */

  // Calls `callback` once when `el` scrolls into view.
  function whenVisible(el, callback, options) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      callback(el);
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          callback(entry.target);
        });
      },
      options || { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
  }

  $$('[data-reveal]').forEach(el => whenVisible(el, target => target.classList.add('is-visible')));

  /* ------------------------------------------------------- experience tabs */

  const jobTabs = $$('.experience-tab');
  const tabList = $('.experience-tabs');
  const indicator = $('.experience-tabs__indicator');
  let activeJob = 0;

  function placeIndicator() {
    const tab = jobTabs[activeJob];
    if (!tab || !indicator) return;
    indicator.style.setProperty('--indicator-y', tab.offsetTop + 'px');
    indicator.style.setProperty('--indicator-h', tab.offsetHeight + 'px');
    indicator.style.setProperty('--indicator-x', tab.offsetLeft + 'px');
    indicator.style.setProperty('--indicator-w', tab.offsetWidth + 'px');
  }

  function selectJob(index, focus) {
    activeJob = (index + jobTabs.length) % jobTabs.length;
    jobTabs.forEach((tab, i) => {
      const selected = i === activeJob;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (panel) {
        panel.hidden = !selected;
        panel.classList.toggle('active', selected);
      }
    });
    const tab = jobTabs[activeJob];
    if (focus) tab.focus({ preventScroll: true });
    // keep the active tab visible when the list scrolls sideways on small screens
    if (tabList.scrollWidth > tabList.clientWidth) {
      tabList.scrollTo({ left: tab.offsetLeft - (tabList.clientWidth - tab.offsetWidth) / 2, behavior: reducedMotion ? 'auto' : 'smooth' });
    }
    placeIndicator();
  }

  if (jobTabs.length) {
    jobTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectJob(i));
      tab.addEventListener('keydown', e => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (keys[e.key]) {
          e.preventDefault();
          selectJob(activeJob + keys[e.key], true);
        } else if (e.key === 'Home') {
          e.preventDefault();
          selectJob(0, true);
        } else if (e.key === 'End') {
          e.preventDefault();
          selectJob(jobTabs.length - 1, true);
        }
      });
    });
    placeIndicator();
    window.addEventListener('resize', placeIndicator);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeIndicator);
  }

  /* ----------------------------------------------------------- code window */

  const codeWindow = $('[data-code-window]');
  const files = window.portfolioCodeFiles || [];
  const renderLines = window.portfolioRender && window.portfolioRender.renderCodeLines;

  if (codeWindow && files.length && renderLines) {
    const codeEl = $('[data-code]', codeWindow);
    const langEl = $('[data-code-lang]', codeWindow);
    const body = $('.code-window__body', codeWindow);
    const fileTabs = $$('.code-window__tab', codeWindow);
    let typingFrame = 0;
    let currentFile = 0;

    const caretLine = lines => lines.concat([]).map((line, i, all) => (i === all.length - 1 ? line.concat([['caret', '']]) : line));

    // Returns the first `count` characters of a file, keeping the token structure.
    function slice(lines, count) {
      const out = [];
      let left = count;
      for (let i = 0; i < lines.length && left > 0; i++) {
        const line = [];
        for (let j = 0; j < lines[i].length && left > 0; j++) {
          const token = lines[i][j];
          const text = token[1].slice(0, left);
          left -= text.length;
          line.push([token[0], text]);
        }
        out.push(line);
        left -= 1; // newline
      }
      return out;
    }

    function totalChars(lines) {
      return lines.reduce((sum, line) => sum + line.reduce((s, token) => s + token[1].length, 0) + 1, 0);
    }

    function showFile(index, focus) {
      cancelAnimationFrame(typingFrame);
      body.removeAttribute('aria-busy');
      currentFile = (index + files.length) % files.length;
      fileTabs.forEach((tab, i) => {
        const selected = i === currentFile;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      body.setAttribute('aria-labelledby', fileTabs[currentFile].id);
      codeEl.innerHTML = renderLines(caretLine(files[currentFile].lines));
      langEl.textContent = files[currentFile].lang;
      body.scrollTop = 0;
      if (focus) fileTabs[currentFile].focus();
    }

    function typeFile(index) {
      const lines = files[index].lines;
      const total = totalChars(lines);
      const started = performance.now();
      const charsPerMs = 0.11;
      body.setAttribute('aria-busy', 'true');

      function tick(now) {
        const count = Math.min(total, Math.floor((now - started) * charsPerMs));
        codeEl.innerHTML = renderLines(caretLine(slice(lines, count)));
        if (count < total) typingFrame = requestAnimationFrame(tick);
        else body.removeAttribute('aria-busy');
      }
      typingFrame = requestAnimationFrame(tick);
    }

    fileTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => showFile(i));
      tab.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          showFile(currentFile + (e.key === 'ArrowRight' ? 1 : -1), true);
        }
      });
    });

    if (reducedMotion) {
      showFile(0);
    } else {
      codeEl.innerHTML = renderLines([[['caret', '']]]);
      whenVisible(codeWindow, () => setTimeout(() => currentFile === 0 && typeFile(0), 350), { threshold: 0.4 });
    }
  }

  /* -------------------------------------------------------------- terminal */

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  $$('[data-terminal]').forEach(terminal => {
    if (reducedMotion) return;
    const body = $('.terminal__body', terminal);
    const lines = $$('.term-line', terminal);

    // Reserve the final height up front so the layout doesn't jump while typing.
    body.style.minHeight = body.offsetHeight + 30 + 'px';
    lines.forEach(line => {
      line.classList.add('is-pending');
      const cmd = $('.term-cmd', line);
      if (cmd) {
        line.setAttribute('data-cmd', cmd.textContent);
        cmd.textContent = '';
      }
    });

    const cursor = document.createElement('span');
    cursor.className = 'term-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    async function play() {
      for (const line of lines) {
        const cmdText = line.getAttribute('data-cmd');
        line.classList.remove('is-pending');
        if (cmdText !== null) {
          const cmd = $('.term-cmd', line);
          line.appendChild(cursor);
          await wait(320);
          for (let i = 1; i <= cmdText.length; i++) {
            cmd.textContent = cmdText.slice(0, i);
            await wait(22 + Math.random() * 38);
          }
          await wait(260);
        } else {
          await wait(70);
        }
      }
      const prompt = document.createElement('span');
      prompt.className = 'term-line term-line--cmd';
      prompt.innerHTML = '<span class="term-prompt" aria-hidden="true">$</span> ';
      prompt.appendChild(cursor);
      $('code', body).appendChild(prompt);
    }

    whenVisible(terminal, play, { threshold: 0.45 });
  });

  /* ---------------------------------------------------------- analysis view */

  $$('[data-analysis]').forEach(el => whenVisible(el, target => target.classList.add('is-active'), { threshold: 0.4 }));

  /* ------------------------------------------------------------ copy email */

  function copyEmail(button) {
    const email = data.email;
    const done = () => {
      toast('Email copied to clipboard');
      $$('[data-copy-email]').forEach(b => b.classList.add('is-copied'));
      setTimeout(() => $$('[data-copy-email]').forEach(b => b.classList.remove('is-copied')), 2000);
    };
    const fallback = () => {
      const area = document.createElement('textarea');
      area.value = email;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        done();
      } catch (e) {
        toast(email);
      }
      document.body.removeChild(area);
      if (button) button.focus();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(email).then(done, fallback);
    else fallback();
  }

  $$('[data-copy-email]').forEach(button => button.addEventListener('click', () => copyEmail(button)));

  /* ---------------------------------------------------- live GitHub stars */

  const STATS_KEY = 'github-stats-v1';
  const STATS_TTL = 6 * 60 * 60 * 1000;

  // Zero counts stay hidden; the footer keeps its "View source" label until there is a star to show.
  function applyStats(stars) {
    $$('[data-stars]').forEach(el => {
      const count = stars[el.getAttribute('data-stars')];
      if (typeof count !== 'number') return;
      const wrapper = el.closest('[data-stars-wrapper]');
      if (count > 0) el.textContent = count;
      if (wrapper) wrapper.hidden = count === 0;
    });
  }

  function loadStats() {
    try {
      const cached = JSON.parse(localStorage.getItem(STATS_KEY) || 'null');
      if (cached && Date.now() - cached.time < STATS_TTL) {
        applyStats(cached.stars);
        return;
      }
    } catch (e) {
      /* ignore unreadable cache */
    }
    if (!window.fetch) return;
    fetch('https://api.github.com/users/' + data.github + '/repos?per_page=100', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(response => (response.ok ? response.json() : Promise.reject(response.status)))
      .then(repos => {
        const stars = {};
        repos.forEach(repo => (stars[repo.name] = repo.stargazers_count));
        applyStats(stars);
        try {
          localStorage.setItem(STATS_KEY, JSON.stringify({ time: Date.now(), stars: stars }));
        } catch (e) {
          /* storage full or disabled */
        }
      })
      .catch(() => {
        /* offline or rate limited: the counts from data.js stay in place */
      });
  }

  // Wait until the browser is idle so the API call never competes with first paint.
  if ('requestIdleCallback' in window) window.requestIdleCallback(loadStats, { timeout: 3000 });
  else setTimeout(loadStats, 1200);

  window.portfolio = { toggleTheme: toggleTheme, copyEmail: copyEmail, toast: toast };
})();
