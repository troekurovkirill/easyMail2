var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inky = require('inky'),
    inlineCss = require('gulp-inline-css'),
    inlineSource = require('gulp-inline-source'),
    browserSync = require('browser-sync').create();

    gulp.task('server', function() {
      browserSync.init({
        server: { baseDir: './dist/'}
      });
    }); 


//STYLES
gulp.task('styles', function () {
  return gulp.src('./scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

//CONVERTE INKY
gulp.task('inky', ['styles'], function() {
  return gulp.src('./templates/**/*.html')
    .pipe(inlineSource())
    .pipe(inky())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

//INLINE CSS
gulp.task('inline', function () {
  return gulp.src('./dist/*.html')
        .pipe(inlineCss({
            preserveMediaQueries: true
        }))
        .pipe(gulp.dest('./dist/inlined'));
});


//WATCH
gulp.task('default', ['server', 'inky'], function() {
    gulp.watch('./scss/**/*.scss',['styles']);
    gulp.watch('./templates/**/*.html',['inky']);
});