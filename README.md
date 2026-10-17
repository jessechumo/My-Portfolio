## Jesse Chumo – Portfolio

Modern, blue‑themed portfolio, built as a static site with SCSS and a small Gulp build pipeline. No framework and no runtime dependencies.

### Features
- Light and dark themes (remembered per visitor, no flash on load)
- Command palette: press `⌘K` / `Ctrl K` (or `/`) to jump to a section, open a project, copy the email address or switch theme
- Interactive graph-network background in the hero
- Projects pulled from the repositories pinned on GitHub, with live previews:
  a scrolling screenshot for Wera, an animated terminal for Pulse Platform and an
  analysis view for GraphSentinel; star counts are fetched live from the GitHub API
- IDE-style About window (`jesse.ts`, `stack.yml`, `education.md`) that types itself out
- Accessible, keyboard-navigable tabs and menus; respects `prefers-reduced-motion`
- Mobile navigation drawer, scroll progress bar, custom 404 page and social preview image

### Tech Stack
- **HTML/CSS/SCSS**
- **JavaScript** (vanilla, no libraries)
- **Gulp 4** (compile SCSS, lint scripts, optimise images, serve locally)

### Project Structure
- `index.html`, `404.html` – pages
- `js/data.js` – all content: experience, projects, skills and education. **Edit this to update the site.**
- `js/render.js` – turns the data into markup
- `_scripts/` – behaviour (`main.js`, `palette.js`, `network.js`); compiled into `js/`
- `_scss/` – styles; colours are CSS custom properties in `partials/_base.scss`
- `img/` – images (`img/projects/` holds project previews, `img/og.png` is the social card)

### Local Development
1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm start`

### Production Build
- `npm run build`  
Build output is generated in the `_site` directory.

### Deployment
You can deploy the contents of `_site` to any static host (e.g. Vercel, Netlify, GitHub Pages). On Vercel, set:
- **Build command**: `npm run build`
- **Output directory**: `_site`

`vercel.json` already does this and serves `404.html` for unknown paths.
