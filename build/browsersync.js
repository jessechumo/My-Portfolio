const browserSync = require('browser-sync').create();

const scssPath = '_scss/**/*.scss';
// Only the sources: the 'scripts' task writes into js/, so watching js/*.js here would loop.
const jsPath = ['_scripts/*.js'];
const htmlPath = ['index.html', '404.html'];
const imgPath = ['img/**/*'];

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
      gulp.watch(imgPath, gulp.series(['copy-images', reloadBrowser]));
    })
  );
};
