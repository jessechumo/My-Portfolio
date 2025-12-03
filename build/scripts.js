const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

const jsPath = '_scripts/*.js';
const destPath = '_site/js';

module.exports = gulp => {
  gulp.task('scripts', () => {
    return (
      gulp
        .src(jsPath)
        .pipe(
          eslint({
            parserOptions: {
              ecmaVersion: 2020,
              sourceType: 'module',
            },
            env: {
              browser: true,
              es6: true,
            },
            rules: {},
          })
        )
        .pipe(eslint.format())
        // Don't fail on errors, just warn
        // .pipe(eslint.failAfterError())
        // .pipe(uglify())
        .pipe(gulp.dest(destPath))
        .pipe(gulp.dest('js'))
    );
  });
};
