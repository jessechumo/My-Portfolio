# Deploying to Vercel

## Method 1: Using Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your Git repository**

5. **Configure project settings**:
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `_site`
   - **Install Command**: `npm install`
   - **Root Directory**: `./` (leave as default)

6. **Add Environment Variables** (if needed):
   - Vercel will automatically detect Node.js and Ruby

7. **Click "Deploy"**

## Method 2: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

## Build Configuration

- **Build Command**: `npm run vercel-build` (runs Gulp build + Jekyll build)
- **Output Directory**: `_site` (Jekyll's output directory)
- **Node Version**: 22+ (specified in package.json)
- **Ruby**: Vercel will auto-detect and install Ruby for Jekyll

## Important Notes

- The `vercel.json` file is already configured
- The `Gemfile` is included for Jekyll dependencies
- Your resume PDF will be copied to `_site` during build
- The favicon.svg will be included in the build
- All static assets (CSS, JS, images, fonts) will be served correctly

## Troubleshooting

If build fails:
1. Check Vercel build logs for specific errors
2. Ensure `Gemfile` is committed to your repository
3. Verify `_site` directory is generated after build
4. Make sure all files are committed to Git before deploying
5. If Jekyll fails, Vercel should auto-install Ruby gems from Gemfile

## After Deployment

- Your site will be available at `your-project.vercel.app`
- You can add a custom domain in Vercel project settings
- Each Git push will trigger a new deployment automatically
