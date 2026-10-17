const gulp = require('gulp');
const sass = require('./build/sass');
const scripts = require('./build/scripts');
const images = require('./build/images');
const static = require('./build/static');
const sync = require('./build/browsersync');

[sass, scripts, images, static, sync].forEach(task => {
  task(gulp);
});

// Images run last so the optimised versions replace the raw copies from static-build.
gulp.task('build', gulp.series(['sass', 'scripts', 'static-build', 'images']));
