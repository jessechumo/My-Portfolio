# Static Build (No Jekyll)

This portfolio has been converted from Jekyll to a static HTML build process for easier Vercel deployment.

## What Changed

1. **Removed Jekyll**: No more Ruby/Jekyll dependencies
2. **Static HTML**: `index.html` is now a static file (no Liquid templates)
3. **JavaScript Data**: Experience and projects data moved to `js/data.js`
4. **Dynamic Rendering**: `js/render.js` dynamically renders experience tabs and projects
5. **Simplified Build**: Gulp now just compiles Sass, minifies JS, and copies static files

## File Structure

```
├── index.html          # Static HTML (no Jekyll syntax)
├── js/
│   ├── data.js        # Portfolio data (experience, projects, skills)
│   ├── render.js      # Dynamic rendering functions
│   └── main.js        # Interactive functionality
├── _scss/             # Sass source files
├── _scripts/          # JavaScript source files (compiled to js/)
└── _site/             # Build output directory
```

## Development

```bash
# Install dependencies
npm install

# Start development server with live reload
npm start

# Build for production
npm run build
```

## Vercel Deployment

The site is now ready for Vercel deployment with no special configuration needed:

1. **Connect your repository** to Vercel
2. **Build settings**:
   - Build Command: `npm run vercel-build`
   - Output Directory: `_site`
3. **Deploy** - Vercel will automatically detect and deploy

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

## What Was Removed

- Jekyll (`_config.yml`, `_layouts/`, `_includes/`, `_data/`)
- Ruby dependencies (`Gemfile`, `vercel-build.sh`)
- Jekyll build tasks from Gulp

## What Still Works

- ✅ All sections (Hero, About, Experience, Projects, Contact)
- ✅ Experience tabs with dynamic content
- ✅ Projects grid with dynamic content
- ✅ Smooth scrolling navigation
- ✅ ScrollReveal animations
- ✅ Responsive design
- ✅ All styling and interactions

## Updating Content

To update your portfolio:

1. **Experience**: Edit `js/data.js` → `portfolioData.experience`
2. **Projects**: Edit `js/data.js` → `portfolioData.projects`
3. **Skills**: Edit `js/data.js` → `portfolioData.skills`
4. **About/Contact**: Edit `index.html` directly

After making changes, run `npm run build` to rebuild.

