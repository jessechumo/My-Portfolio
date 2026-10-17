import { experience, projects, pantheon } from './data.js';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export function toRoman(n) {
  const map = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

// Line-art emblems for each patron deity, drawn on a 100×100 grid.
const SIGILS = {
  // Apollo: the Delphic sun as a radar, sweeping for omens
  oracle: `
    <circle class="s faint" cx="50" cy="50" r="36"/>
    <circle class="s faint" cx="50" cy="50" r="24"/>
    <circle class="s" cx="50" cy="50" r="12"/>
    ${Array.from({ length: 16 }, (_, i) => {
      const a = (i / 16) * Math.PI * 2;
      const r1 = 41, r2 = i % 2 ? 45 : 49;
      return `<line class="s" x1="${(50 + Math.cos(a) * r1).toFixed(2)}" y1="${(50 + Math.sin(a) * r1).toFixed(2)}" x2="${(50 + Math.cos(a) * r2).toFixed(2)}" y2="${(50 + Math.sin(a) * r2).toFixed(2)}"/>`;
    }).join('')}
    <path class="s" d="M50 50 L75.5 24.5"/>
    <path class="s faint" d="M50 50 L75.5 24.5 A36 36 0 0 1 86 50 Z"/>
    <circle class="f" cx="68" cy="36" r="1.8"/>
    <circle class="f" cx="33" cy="64" r="1.4"/>
    <circle class="f" cx="62" cy="70" r="1.4"/>
    <circle class="f" cx="50" cy="50" r="2.4"/>`,

  // Atlas: the celestial sphere he carries, with a heartbeat through it
  atlas: `
    <circle class="s" cx="50" cy="48" r="32"/>
    <ellipse class="s faint" cx="50" cy="48" rx="13" ry="32"/>
    <ellipse class="s faint" cx="50" cy="48" rx="25" ry="32"/>
    <path class="s faint" d="M21 34 H79 M21 62 H79"/>
    <ellipse class="s" cx="50" cy="48" rx="46" ry="11" transform="rotate(-18 50 48)"/>
    <path class="s" d="M8 48 H30 L35 38 L41 60 L46 42 L49 48 H92"/>
    <path class="s" d="M36 88 Q50 80 64 88 M30 94 H70"/>
    <circle class="f" cx="91" cy="34" r="1.8"/>`,

  // Argus Panoptes: the hundred-eyed watchman over a graph
  argus: `
    ${Array.from({ length: 6 }, (_, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = 50 + Math.cos(a) * 40, y = 50 + Math.sin(a) * 40;
      const b = ((i + 1) / 6) * Math.PI * 2 - Math.PI / 2;
      const x2 = 50 + Math.cos(b) * 40, y2 = 50 + Math.sin(b) * 40;
      return `<line class="s faint" x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>
        <line class="s faint" x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="50" y2="50"/>
        <circle class="s" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3.4"/>
        <circle class="f" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.1"/>`;
    }).join('')}
    <path class="s" d="M24 50 Q50 28 76 50 Q50 72 24 50 Z" style="fill:#0c0b08"/>
    <circle class="s" cx="50" cy="50" r="9"/>
    <circle class="f" cx="50" cy="50" r="3.6"/>`,

  // Themis: the scales of divine law
  themis: `
    <circle class="s" cx="50" cy="15" r="3"/>
    <path class="s" d="M50 18 V84"/>
    <path class="s" d="M17 27 L83 33"/>
    <path class="s" d="M19 27 L9 53 M19 27 L29 53"/>
    <path class="s" d="M7 53 Q19 66 31 53 Z"/>
    <path class="s" d="M81 33 L71 59 M81 33 L91 59"/>
    <path class="s" d="M69 59 Q81 72 93 59 Z"/>
    <path class="s" d="M36 84 H64 M30 90 H70"/>
    <circle class="f" cx="19" cy="27" r="1.6"/>
    <circle class="f" cx="81" cy="33" r="1.6"/>`,

  // Demeter: a sheaf of wheat
  demeter: (() => {
    const ear = (dx, rot) => {
      const grains = [26, 36, 46, 56]
        .map(y => `<path class="s" d="M50 ${y + 6} Q40 ${y + 3} 39 ${y - 6} Q48 ${y - 3} 50 ${y + 6} Z"/>
                   <path class="s" d="M50 ${y + 6} Q60 ${y + 3} 61 ${y - 6} Q52 ${y - 3} 50 ${y + 6} Z"/>`)
        .join('');
      return `<g transform="translate(${dx} 0) rotate(${rot} 50 90)">
        <path class="s" d="M50 90 V20"/>${grains}
        <path class="s" d="M50 20 Q47 12 50 6 Q53 12 50 20 Z"/>
      </g>`;
    };
    return `${ear(0, -22)}${ear(0, 22)}${ear(0, 0)}
      <path class="s" d="M38 76 Q50 82 62 76"/>`;
  })(),

  // Hermes: the winged caduceus of the messenger
  hermes: `
    <circle class="s" cx="50" cy="12" r="3.5"/>
    <path class="s" d="M50 16 V92"/>
    <path class="s" d="M48 26 C38 14 24 13 10 18 C22 21 30 24 35 29 C27 29 21 31 16 36 C29 36 40 33 48 30"/>
    <path class="s" d="M52 26 C62 14 76 13 90 18 C78 21 70 24 65 29 C73 29 79 31 84 36 C71 36 60 33 52 30"/>
    <path class="s" d="M50 86 C36 80 36 72 50 66 C64 60 64 52 50 46 C38 41 39 35 45 33"/>
    <path class="s" d="M50 86 C64 80 64 72 50 66 C36 60 36 52 50 46 C62 41 61 35 55 33"/>
    <circle class="f" cx="45" cy="33" r="1.6"/>
    <circle class="f" cx="55" cy="33" r="1.6"/>`,
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function renderVoyages(root) {
  root.innerHTML = experience
    .map(
      (job, i) => `
      <li class="voyage" data-reveal>
        <button class="voyage__head" aria-expanded="false" aria-controls="voyage-${i}">
          <span class="voyage__num">${ROMAN[i]}</span>
          <span class="voyage__role">${esc(job.role)}</span>
          <span class="voyage__company">${esc(job.company)}</span>
          <span class="voyage__time mono">${esc(job.time)}</span>
          <span class="voyage__toggle" aria-hidden="true"></span>
        </button>
        <div class="voyage__body" id="voyage-${i}" role="region">
          <div class="voyage__inner">
            <div class="voyage__meta mono">
              <span>${esc(job.time)}</span>
              <span>${esc(job.location)}</span>
              <a href="${job.url}" target="_blank" rel="noopener">${esc(job.company)} ↗</a>
            </div>
            <ul class="voyage__points">
              ${job.points.map(p => `<li>${esc(p)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </li>`
    )
    .join('');
}

export function renderLabours(root) {
  const total = ROMAN[projects.length - 1];
  root.innerHTML = projects
    .map(
      (p, i) => `
      <article class="labour" style="--rot:${(i * 47) % 180}deg">
        <div class="labour__plinth">
          <span class="labour__num">${ROMAN[i]}</span>
          <svg class="labour__sigil" viewBox="0 0 100 100" aria-hidden="true">${SIGILS[p.sigil]}</svg>
          <p class="labour__deity">Under the aegis of<b>${p.deity}</b></p>
        </div>
        <div class="labour__body">
          <div class="labour__kicker mono">
            <span>Labour ${ROMAN[i]} / ${total}</span>
            <span>${esc(p.stack[0])}</span>
          </div>
          <h3 class="labour__title">${esc(p.name)}</h3>
          <p class="labour__epithet">${esc(p.epithet)}</p>
          <p class="labour__summary">${esc(p.summary)}</p>
          <ul class="labour__highlights">
            ${p.highlights.map(h => `<li>${esc(h)}</li>`).join('')}
          </ul>
          <div class="labour__foot">
            <ul class="labour__stack">${p.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
            <div class="labour__links">
              <a href="${p.repo}" target="_blank" rel="noopener" data-cursor="Source">Source <i>↗</i></a>
              ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" data-cursor="Visit">Live <i>↗</i></a>` : ''}
            </div>
          </div>
        </div>
      </article>`
    )
    .join('');
}

export function renderPantheon(root) {
  root.innerHTML = `
    <div class="temple__pediment" aria-hidden="true"></div>
    <div class="temple__frieze" aria-hidden="true"></div>
    <div class="temple__cols">
      ${pantheon
        .map(
          g => `
        <div class="deity">
          <span class="deity__glyph" aria-hidden="true">${g.glyph}</span>
          <h3 class="deity__name">${g.name}</h3>
          <ul class="deity__items">${g.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>
        </div>`
        )
        .join('')}
    </div>
    <div class="temple__base" aria-hidden="true"></div>`;
}
