const gulp = require('gulp');
const sass = require('./build/sass');
const scripts = require('./build/scripts');
const images = require('./build/images');
const static = require('./build/static');
const sync = require('./build/browsersync');

[sass, scripts, images, static, sync].forEach(task => {
  task(gulp);
});

gulp.task('build', gulp.series(['sass', 'scripts', 'images', 'static-build']));
