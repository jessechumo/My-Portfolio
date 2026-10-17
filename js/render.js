// Turns portfolioData (js/data.js) into markup. Runs once, before main.js wires up behaviour.
(function () {
  if (typeof portfolioData === 'undefined') return;

  const esc = value =>
    String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

  const icon = {
    github:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    folder:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    star:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    lock:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  };

  const languageColors = {
    Go: '#00ADD8',
    Python: '#3572A5',
    'Jupyter Notebook': '#DA5B0B',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
  };

  const dots = '<span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span>';

  /* ------------------------------------------------------------ experience */

  function renderExperience() {
    const tabs = document.querySelector('.experience-tabs');
    const panels = document.querySelector('.experience-panels');
    if (!tabs || !panels) return;

    tabs.innerHTML =
      portfolioData.experience
        .map(
          (job, i) => `
        <button class="experience-tab${i === 0 ? ' active' : ''}" role="tab" id="job-tab-${i}"
          aria-controls="job-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-job="${i}">
          ${esc(job.tab || job.company)}
        </button>`
        )
        .join('') + '<span class="experience-tabs__indicator" aria-hidden="true"></span>';

    panels.innerHTML = portfolioData.experience
      .map(
        (job, i) => `
        <div class="experience-panel${i === 0 ? ' active' : ''}" role="tabpanel" id="job-panel-${i}"
          aria-labelledby="job-tab-${i}" tabindex="0"${i === 0 ? '' : ' hidden'}>
          <h3 class="experience-panel__title">
            <span class="experience-panel__position">${esc(job.position)}</span>
            <span class="experience-panel__company">
              <span aria-hidden="true">@</span>
              <a href="${job.url}" target="_blank" rel="noopener noreferrer">${esc(job.company)}</a>
            </span>
          </h3>
          <p class="experience-panel__meta">
            <span>${esc(job.time)}</span><span class="experience-panel__sep" aria-hidden="true">/</span><span>${esc(job.location)}</span>
          </p>
          <ul class="experience-panel__description">
            ${job.description.map(item => `<li>${esc(item)}</li>`).join('')}
          </ul>
          ${
            job.tech && job.tech.length
              ? `<ul class="tag-list experience-panel__tech" aria-label="Technologies">${job.tech
                  .map(t => `<li>${esc(t)}</li>`)
                  .join('')}</ul>`
              : ''
          }
        </div>`
      )
      .join('');
  }

  /* -------------------------------------------------------------- projects */

  function repoMeta(project) {
    const color = languageColors[project.language] || 'var(--accent)';
    return `
      <span class="repo-meta">
        <span class="repo-meta__lang"><span class="lang-dot" style="background:${color}"></span>${esc(project.language)}</span>
        <a class="repo-meta__stars" href="${project.url}/stargazers" target="_blank" rel="noopener noreferrer"
          aria-label="Stars on GitHub" data-stars-wrapper${project.stars ? '' : ' hidden'}>${icon.star}<span data-stars="${esc(project.repo)}">${project.stars}</span></a>
      </span>`;
  }

  function projectLinks(project) {
    return `
      <a href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(project.name)} on GitHub">${icon.github}</a>
      ${
        project.live
          ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" aria-label="${esc(project.name)} live site">${icon.external}</a>`
          : ''
      }`;
  }

  // Pretty-printed JSON with syntax highlighting.
  function highlightJson(value) {
    const json = esc(JSON.stringify(value, null, 2));
    return json.replace(
      /(&quot;[^&]*?&quot;)(\s*:)?|\b(true|false)\b|(-?\d+(?:\.\d+)?)/g,
      (match, str, colon, bool, num) => {
        if (str && colon) return `<span class="tok-property">${str}</span>${colon}`;
        if (str) return `<span class="tok-string">${str}</span>`;
        if (bool) return `<span class="tok-bool tok-bool--${bool}">${bool}</span>`;
        return `<span class="tok-number">${num}</span>`;
      }
    );
  }

  function browserVisual(project, visual) {
    return `
      <a class="window browser" href="${project.live}" target="_blank" rel="noopener noreferrer"
        aria-label="Open the ${esc(project.name)} live site">
        <span class="window__bar">
          ${dots}
          <span class="browser__url">${icon.lock}${esc(visual.url)}</span>
        </span>
        <span class="browser__viewport">
          <img src="${visual.image}" alt="${esc(visual.alt)}" loading="lazy" decoding="async" width="1280" height="4641" />
        </span>
        <span class="browser__hint" aria-hidden="true">Hover to scroll</span>
      </a>`;
  }

  function terminalVisual(visual) {
    const lines = visual.lines
      .map(line =>
        line.cmd
          ? `<span class="term-line term-line--cmd"><span class="term-prompt" aria-hidden="true">$</span> <span class="term-cmd">${esc(line.cmd)}</span></span>`
          : `<span class="term-line term-line--out${line.cls ? ` term-line--${line.cls}` : ''}">${esc(line.out)}</span>`
      )
      .join('');
    return `
      <div class="window terminal" data-terminal>
        <div class="window__bar">${dots}<span class="window__title">${esc(visual.title)}</span></div>
        <pre class="terminal__body"><code>${lines}</code></pre>
      </div>`;
  }

  function analysisVisual(visual) {
    const dead = visual.source.deadCode || [];
    const source = visual.source.code
      .map((line, i) => {
        const code = esc(line).replace(/_0x[0-9a-f]+/g, m => `<span class="tok-renamed">${m}</span>`);
        const isDead = dead.indexOf(i) !== -1;
        const tag = isDead && i === dead[0] ? '<span class="analysis__flag">dead branch</span>' : '';
        return `<span class="analysis__line${isDead ? ' analysis__line--dead' : ''}"><span class="analysis__ln">${i + 1}</span>${code}${tag}</span>`;
      })
      .join('');
    return `
      <div class="window analysis" data-analysis>
        <div class="window__bar">
          ${dots}
          <span class="analysis__tabs" aria-hidden="true">
            <span class="analysis__tab">${esc(visual.source.file)}</span>
            <span class="analysis__tab analysis__tab--active">${esc(visual.report.file)}</span>
          </span>
        </div>
        <div class="analysis__panes">
          <pre class="analysis__pane analysis__pane--src" aria-label="Obfuscated C input"><code>${source}</code></pre>
          <pre class="analysis__pane analysis__pane--report" aria-label="GraphSentinel analysis report"><code>${highlightJson(visual.report.json)}</code></pre>
        </div>
        <div class="analysis__status">
          ${visual.status.map(s => `<span><i class="analysis__ok" aria-hidden="true"></i>${esc(s)}</span>`).join('')}
        </div>
      </div>`;
  }

  function projectVisual(project) {
    const visual = project.visual;
    if (!visual) return '';
    if (visual.type === 'browser') return browserVisual(project, visual);
    if (visual.type === 'terminal') return terminalVisual(visual);
    if (visual.type === 'analysis') return analysisVisual(visual);
    return '';
  }

  function renderProjects() {
    const featuredList = document.querySelector('.featured-list');
    const grid = document.querySelector('.projects-grid');
    if (!featuredList || !grid) return;

    const featured = portfolioData.projects.filter(p => p.featured);
    const others = portfolioData.projects.filter(p => !p.featured);

    featuredList.innerHTML = featured
      .map(
        project => `
        <li class="featured" data-reveal>
          <div class="featured__content">
            <p class="featured__overline">Featured Project</p>
            <h3 class="featured__title">
              <a href="${project.live || project.url}" target="_blank" rel="noopener noreferrer">${esc(project.name)}</a>
            </h3>
            <div class="featured__description"><p>${esc(project.description)}</p></div>
            <ul class="featured__tech" aria-label="Technologies">${project.used.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
            <div class="featured__footer">
              ${repoMeta(project)}
              <div class="featured__links">${projectLinks(project)}</div>
            </div>
          </div>
          <div class="featured__visual">${projectVisual(project)}</div>
        </li>`
      )
      .join('');

    grid.innerHTML = others
      .map(
        (project, i) => `
        <li class="project-card" data-reveal style="--reveal-delay:${i * 90}ms">
          <div class="project-card__inner">
            <header class="project-card__top">
              <span class="project-card__folder">${icon.folder}</span>
              <div class="project-card__links">${projectLinks(project)}</div>
            </header>
            <h3 class="project-card__title">
              <a href="${project.url}" target="_blank" rel="noopener noreferrer">${esc(project.name)}</a>
            </h3>
            <p class="project-card__description">${esc(project.description)}</p>
            <footer class="project-card__footer">
              <ul class="project-card__tech" aria-label="Technologies">${project.used.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              ${repoMeta(project)}
            </footer>
          </div>
        </li>`
      )
      .join('');
  }

  /* ------------------------------------------------------------ code window */

  // Each file is a list of lines; each line a list of [tokenClass, text] pairs.
  function codeFiles() {
    const t = (cls, text) => [cls, text];
    const skills = portfolioData.skills;

    const yamlList = (key, items) => {
      const pad = ' '.repeat(key.length + 3);
      const lines = [];
      let line = [t('property', key), t('punct', ': '), t('punct', '[')];
      let width = key.length + 3;
      items.forEach((item, i) => {
        const piece = item + (i < items.length - 1 ? ', ' : '');
        if (width + piece.length > 52 && i > 0) {
          lines.push(line);
          line = [t('plain', pad)];
          width = pad.length;
        }
        line.push(t('value', item));
        if (i < items.length - 1) line.push(t('punct', ', '));
        width += piece.length;
      });
      line.push(t('punct', ']'));
      lines.push(line);
      return lines;
    };

    const stack = [[t('comment', '# what I reach for')]];
    Object.keys(skills).forEach(key => {
      yamlList(key, skills[key]).forEach(l => stack.push(l));
    });

    const wrap = (text, width) => {
      const out = [];
      let current = '';
      text.split(' ').forEach(word => {
        if ((current + ' ' + word).trim().length > width) {
          out.push(current.trim());
          current = word;
        } else {
          current += ' ' + word;
        }
      });
      if (current.trim()) out.push(current.trim());
      return out;
    };

    const education = [];
    portfolioData.education.forEach((ed, i) => {
      if (i > 0) education.push([]);
      education.push([t('heading', '## ' + ed.degree)]);
      education.push([t('bold', '**' + ed.school + '**'), t('plain', ' · ' + ed.years)]);
      if (ed.thesis) {
        wrap('Thesis: ' + ed.thesis, 44).forEach(l => education.push([t('quote', '> ' + l)]));
      }
    });

    return [
      {
        name: 'jesse.ts',
        lang: 'TypeScript',
        kind: 'ts',
        lines: [
          [t('keyword', 'const '), t('variable', 'jesse'), t('punct', ' = {')],
          [t('plain', '  '), t('property', 'role'), t('punct', ': '), t('string', "'Software Engineer'"), t('punct', ',')],
          [t('plain', '  '), t('property', 'location'), t('punct', ': '), t('string', "'Dallas, TX'"), t('punct', ',')],
          [t('plain', '  '), t('property', 'focus'), t('punct', ': [')],
          [t('plain', '    '), t('string', "'Full-Stack Development'"), t('punct', ',')],
          [t('plain', '    '), t('string', "'Cloud & DevOps'"), t('punct', ',')],
          [t('plain', '    '), t('string', "'Machine Learning'"), t('punct', ',')],
          [t('plain', '  '), t('punct', '],')],
          [t('plain', '  '), t('property', 'education'), t('punct', ': '), t('string', "'M.S. Computer Science, UTA'"), t('punct', ',')],
          [t('plain', '  '), t('property', 'available'), t('punct', ': '), t('boolean', 'true'), t('punct', ',')],
          [t('punct', '};')],
          [],
          [t('keyword', 'export default '), t('variable', 'jesse'), t('punct', ';')],
        ],
      },
      { name: 'stack.yml', lang: 'YAML', kind: 'yml', lines: stack },
      { name: 'education.md', lang: 'Markdown', kind: 'md', lines: education },
    ];
  }

  function renderCodeLines(lines) {
    return lines
      .map(
        line =>
          `<span class="code-line">${line
            .map(([cls, text]) => {
              if (cls === 'plain') return esc(text);
              if (cls === 'caret') return '<span class="typing-caret" aria-hidden="true"></span>';
              return `<span class="tok-${cls}">${esc(text)}</span>`;
            })
            .join('')}</span>`
      )
      .join('');
  }

  function renderCodeWindow() {
    const root = document.querySelector('[data-code-window]');
    if (!root) return;
    const files = codeFiles();
    window.portfolioCodeFiles = files;

    root.innerHTML = `
      <div class="window__bar">
        ${dots}
        <div class="code-window__tabs" role="tablist" aria-label="About files">
          ${files
            .map(
              (file, i) => `
            <button class="code-window__tab${i === 0 ? ' active' : ''}" role="tab" id="file-tab-${i}"
              aria-selected="${i === 0}" aria-controls="file-panel" tabindex="${i === 0 ? 0 : -1}" data-file="${i}">
              <span class="file-icon file-icon--${file.kind}" aria-hidden="true"></span>${esc(file.name)}
            </button>`
            )
            .join('')}
        </div>
      </div>
      <div class="code-window__body" id="file-panel" role="tabpanel" aria-labelledby="file-tab-0" tabindex="0">
        <pre><code data-code>${renderCodeLines(files[0].lines)}</code></pre>
      </div>
      <div class="code-window__status" aria-hidden="true">
        <span><i class="code-window__branch"></i>main</span>
        <span data-code-lang>${files[0].lang}</span>
        <span>UTF-8</span>
      </div>`;
  }

  window.portfolioRender = { renderCodeLines: renderCodeLines, esc: esc };

  renderExperience();
  renderProjects();
  renderCodeWindow();
})();
