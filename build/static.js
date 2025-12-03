// Static file copying task (replaces Jekyll)
const gulp = require('gulp');
const path = require('path');

module.exports = gulp => {
  // Copy static HTML and other files to _site directory
  gulp.task('copy-static', () => {
    return gulp
      .src([
        'index.html',
        '404.html',
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'sitemap.xml',
        '**/*.pdf',
        '!node_modules/**',
        '!_site/**',
        '!**/_*', // Exclude Jekyll directories
        '!**/*.bak',
        '!gulpfile.js',
        '!package*.json',
        '!Gemfile*',
        '!vercel.json',
        '!vercel-build.sh',
        '!README.md',
        '!.git/**',
        '!.gitignore',
        '!build/**',
        '!_scss/**',
        '!_scripts/**',
        '!_includes/**',
        '!_layouts/**',
        '!_data/**',
        '!_config*.yml'
      ], { base: '.', allowEmpty: true })
      .pipe(gulp.dest('_site'));
  });

  // Copy JavaScript files
  gulp.task('copy-js', () => {
    return gulp
      .src(['js/**/*.js'], { base: '.', allowEmpty: true })
      .pipe(gulp.dest('_site'));
  });

  // Copy images
  gulp.task('copy-images', () => {
    return gulp
      .src(['img/**/*'], { base: '.', allowEmpty: true })
      .pipe(gulp.dest('_site'));
  });

  // Main static build task
  gulp.task('static-build', gulp.series(['copy-static', 'copy-js', 'copy-images']));
};

