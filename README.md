## Jesse Chumo – Portfolio

A dark, terminal-flavoured portfolio built as a static site with SCSS and a small Gulp build pipeline. No framework, two small scripts.

### Design notes

- **Colour**: the page is `#161616`, the same near-black as the studio backdrop in the portrait, so the photo fades into the page. One accent: amber `#f4a93b`.
- **Type**: Red Hat Display for headings, Red Hat Text for body copy and Red Hat Mono for anything that would appear in a terminal.
- **Hero**: a drifting graph behind the portrait. Signals hop node to node like messages in a graph neural network, and nodes near the pointer link up to it (`_scripts/network.js`).
- **Navigation**: a tmux status line pinned to the bottom of the screen. Each section is a window: `*` marks the current one and `-` the previous one. `Ctrl+B` then `0`–`5`, `n`, `p` or `l` work like tmux.
- **Work**: the pinned GitHub repos. Wera, Pulse Platform and GraphSentinel get written up with real artefacts: a scrolling screenshot, the matching pipeline and its measured numbers, and architecture diagrams drawn as inline SVG.
- **Research**: the thesis, with an interactive example of semantics-preserving obfuscation.
- **About**: a `neofetch` block whose logo is an ASCII rendering of the portrait.

### Project structure

- `index.html`, `404.html` – all content lives in the HTML
- `_scss/` – styles; tokens (colours, fonts, breakpoints) in `partials/_tokens.scss` and `partials/_base.scss`
- `_scripts/` – `main.js` (status line, reveals, diff tabs, neofetch, clock, copy) and `network.js` (hero graph); compiled into `js/`
- `img/` – portrait, project screenshots (`img/projects/`), social card (`og.png`)
- `tools/ascii-portrait.py` – regenerates the ASCII portrait from `img/jesse.jpg` (needs Pillow)

### Local development

1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm start`

### Production build

- `npm run build`

Build output is generated in the `_site` directory.

### Deployment

Deploy the contents of `_site` to any static host (e.g. Vercel, Netlify, GitHub Pages). On Vercel, set:

- **Build command**: `npm run build`
- **Output directory**: `_site`

`vercel.json` already does this and serves `404.html` for unknown paths.
