## Jesse Chumo – Portfolio

Modern, blue‑themed portfolio, built as a static site with SCSS and a small Gulp build pipeline.

### Tech Stack
- **HTML/CSS/SCSS**
- **JavaScript**
- **Gulp 4** (compile SCSS, bundle/minify assets, serve locally)

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

