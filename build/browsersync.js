const browserSync = require('browser-sync').create();

const scssPath = '_scss/**/*.scss';
const jsPath = ['_scripts/*.js', 'js/*.js'];
const htmlPath = ['index.html', '404.html'];
const staticPath = ['js/data.js', 'js/render.js'];

module.exports = gulp => {
  const reloadBrowser = done => {
    browserSync.reload();
    done();
  };

  // Rebuild static files then reload the page
  gulp.task('static-rebuild', gulp.series(['static-build', reloadBrowser]));

  gulp.task(
    'serve',
    gulp.series('static-build', () => {
      browserSync.init({
        server: {
          baseDir: '_site',
        },
      });

      gulp.watch(scssPath, gulp.series(['sass', reloadBrowser]));
      gulp.watch(jsPath, gulp.series(['scripts', reloadBrowser]));
      gulp.watch(htmlPath, gulp.series(['copy-static', reloadBrowser]));
      gulp.watch(staticPath, gulp.series(['copy-js', reloadBrowser]));
    })
  );
};
