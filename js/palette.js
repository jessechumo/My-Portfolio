// Command palette: ⌘K / Ctrl+K (or "/") to jump to a section, open a project,
// copy the email address or switch theme without touching the mouse.
(function () {
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  document.querySelectorAll('[data-mod-key]').forEach(function (el) {
    el.textContent = isMac ? '⌘' : 'Ctrl';
  });

  const svg = function (body) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      body +
      '</svg>'
    );
  };

  const icons = {
    search: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    hash: svg('<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>'),
    up: svg('<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>'),
    folder: svg('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),
    copy: svg('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'),
    mail: svg('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'),
    file: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),
    theme: svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
    github: svg(
      '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'
    ),
    linkedin: svg('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'),
    twitter: svg(
      '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>'
    ),
  };

  const data = typeof portfolioData !== 'undefined' ? portfolioData : { projects: [], email: 'jessechumo@gmail.com' };

  const openUrl = function (url) {
    window.open(url, '_blank', 'noopener');
  };

  const goTo = function (selector) {
    const target = document.querySelector(selector);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const commands = [
    { group: 'Navigate', label: 'About', hint: '01', icon: 'hash', run: () => goTo('#about') },
    { group: 'Navigate', label: 'Experience', hint: '02', icon: 'hash', run: () => goTo('#experience') },
    { group: 'Navigate', label: 'Projects', hint: '03', icon: 'hash', run: () => goTo('#projects') },
    { group: 'Navigate', label: 'Contact', hint: '04', icon: 'hash', run: () => goTo('#contact') },
    { group: 'Navigate', label: 'Back to top', icon: 'up', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  data.projects.forEach(function (project) {
    commands.push({
      group: 'Projects',
      label: project.name,
      hint: project.language,
      icon: 'folder',
      keywords: project.used.join(' ') + ' ' + project.repo,
      run: () => openUrl(project.live || project.url),
    });
  });

  commands.push(
    {
      group: 'Actions',
      label: 'Copy email address',
      hint: data.email,
      icon: 'copy',
      run: () => window.portfolio && window.portfolio.copyEmail(),
    },
    { group: 'Actions', label: 'Send an email', icon: 'mail', run: () => (window.location.href = 'mailto:' + data.email) },
    { group: 'Actions', label: 'Open resume', hint: 'PDF', icon: 'file', keywords: 'cv', run: () => openUrl('/jessechumo.pdf') },
    {
      group: 'Actions',
      label: 'Switch theme',
      keywords: 'light dark mode',
      icon: 'theme',
      run: () => window.portfolio && window.portfolio.toggleTheme(),
    },
    { group: 'Social', label: 'GitHub', hint: '@jessechumo', icon: 'github', run: () => openUrl('https://github.com/jessechumo') },
    { group: 'Social', label: 'LinkedIn', hint: 'in/jessechumo', icon: 'linkedin', run: () => openUrl('https://linkedin.com/in/jessechumo') },
    { group: 'Social', label: 'Twitter', hint: '@jessechumo', icon: 'twitter', run: () => openUrl('https://twitter.com/jessechumo') }
  );

  const root = document.createElement('div');
  root.className = 'palette';
  root.hidden = true;
  root.innerHTML =
    '<div class="palette__dialog" role="dialog" aria-modal="true" aria-label="Command palette">' +
    '<div class="palette__search">' +
    icons.search +
    '<input class="palette__input" type="text" placeholder="Search sections, projects, actions…" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" aria-label="Search commands" autocomplete="off" spellcheck="false" />' +
    '<kbd class="palette__esc">esc</kbd>' +
    '</div>' +
    '<div class="palette__list" id="palette-list" role="listbox" aria-label="Commands"></div>' +
    '<div class="palette__footer">' +
    '<span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span><span><kbd>↵</kbd> to select</span><span><kbd>esc</kbd> to close</span>' +
    '</div>' +
    '</div>';
  document.body.appendChild(root);

  const input = root.querySelector('.palette__input');
  const list = root.querySelector('.palette__list');
  let results = [];
  let active = 0;
  let lastFocus = null;
  let closeTimer = 0;

  const escapeHtml = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  function filter(query) {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands.slice();
    return commands
      .map(function (cmd) {
        const label = cmd.label.toLowerCase();
        const haystack = [cmd.label, cmd.group, cmd.hint || '', cmd.keywords || ''].join(' ').toLowerCase();
        if (!terms.every(t => haystack.indexOf(t) !== -1)) return null;
        const score = label.indexOf(terms[0]) === 0 ? 0 : label.indexOf(terms[0]) !== -1 ? 1 : 2;
        return { cmd: cmd, score: score };
      })
      .filter(Boolean)
      .sort((a, b) => a.score - b.score)
      .map(r => r.cmd);
  }

  function render() {
    results = filter(input.value);
    active = Math.min(active, Math.max(results.length - 1, 0));

    if (!results.length) {
      list.innerHTML = '<p class="palette__empty">No results for “' + escapeHtml(input.value) + '”</p>';
      input.removeAttribute('aria-activedescendant');
      return;
    }

    let html = '';
    let group = '';
    results.forEach(function (cmd, i) {
      if (cmd.group !== group) {
        group = cmd.group;
        html += '<div class="palette__group" role="presentation">' + escapeHtml(group) + '</div>';
      }
      html +=
        '<div class="palette__item' +
        (i === active ? ' is-active' : '') +
        '" role="option" id="palette-option-' +
        i +
        '" aria-selected="' +
        (i === active) +
        '" data-index="' +
        i +
        '">' +
        icons[cmd.icon] +
        '<span class="palette__label">' +
        escapeHtml(cmd.label) +
        '</span>' +
        (cmd.hint ? '<span class="palette__hint">' + escapeHtml(cmd.hint) + '</span>' : '') +
        '</div>';
    });
    list.innerHTML = html;
    input.setAttribute('aria-activedescendant', 'palette-option-' + active);
  }

  function setActive(index) {
    if (!results.length) return;
    active = (index + results.length) % results.length;
    list.querySelectorAll('.palette__item').forEach(function (el) {
      const on = Number(el.getAttribute('data-index')) === active;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-selected', on);
      if (on) el.scrollIntoView({ block: 'nearest' });
    });
    input.setAttribute('aria-activedescendant', 'palette-option-' + active);
  }

  function run(index) {
    const cmd = results[index];
    if (!cmd) return;
    close(true);
    // Let the palette fade before scrolling or opening a tab.
    setTimeout(cmd.run, 60);
  }

  function open() {
    if (root.classList.contains('is-open')) return;
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    root.hidden = false;
    input.value = '';
    active = 0;
    render();
    document.body.classList.add('palette-open');
    void root.offsetHeight; // reflow so the opening transition runs
    root.classList.add('is-open');
    input.focus();
  }

  function close(skipFocusRestore) {
    if (!root.classList.contains('is-open')) return;
    root.classList.remove('is-open');
    document.body.classList.remove('palette-open');
    closeTimer = setTimeout(function () {
      root.hidden = true;
    }, 200);
    if (!skipFocusRestore && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  input.addEventListener('input', function () {
    active = 0;
    render();
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(active + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(active - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(active);
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  });

  list.addEventListener('mousemove', function (e) {
    const item = e.target.closest('.palette__item');
    if (item && Number(item.getAttribute('data-index')) !== active) setActive(Number(item.getAttribute('data-index')));
  });

  list.addEventListener('click', function (e) {
    const item = e.target.closest('.palette__item');
    if (item) run(Number(item.getAttribute('data-index')));
  });

  root.addEventListener('mousedown', function (e) {
    if (e.target === root) close();
  });

  document.addEventListener('keydown', function (e) {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (root.classList.contains('is-open')) close();
      else open();
    } else if (e.key === '/' && !typing && !root.classList.contains('is-open')) {
      e.preventDefault();
      open();
    } else if (e.key === 'Escape' && root.classList.contains('is-open')) {
      e.preventDefault();
      close();
    }
  });

  document.querySelectorAll('[data-palette-open]').forEach(function (button) {
    button.addEventListener('click', open);
  });

  window.portfolioPalette = { open: open, close: close };
})();
