## Jesse Chumo — Portfolio

An Olympian-themed portfolio: obsidian, gold leaf and black marble, with a constellation hero, smooth scrolling and a pinned horizontal gallery of projects ("The Labours").

### Tech stack
- **Vite** for dev server and build
- **Vanilla JS** (ES modules), no framework
- **GSAP** (ScrollTrigger, SplitText, DrawSVG) for motion
- **Lenis** for smooth scrolling
- **Canvas 2D** starfield in the hero

### Structure
```
index.html          page markup (hero, genesis, oracle are static)
404.html            "Lost in the Underworld"
src/js/data.js      experience, projects (pinned GitHub repos), skills: edit content here
src/js/render.js    renders voyages, labours (with deity sigils) and the pantheon
src/js/sky.js       hero starfield and constellations
src/js/main.js      smooth scroll, loader, cursor, scroll animations
src/styles/main.css design tokens and all styles
public/             static assets (photo, résumé PDF, favicon, og image)
```

### Local development
```bash
npm install
npm run dev       # http://localhost:5173
```

### Production build
```bash
npm run build     # outputs to dist/
npm run preview   # serve the built site locally
```

### Deployment
Deploy `dist/` to any static host. `vercel.json` is configured for Vercel (build: `npm run build`, output: `dist`).

Animations respect `prefers-reduced-motion`.
