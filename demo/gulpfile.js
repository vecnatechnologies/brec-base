var brec = require('brec');
var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');

var basePath = '../';

gulp.task('styles', function() {
  gulp.src('sass/main.scss')
    .pipe(sass({
      includePaths: [brec.sass]
    }))
    .pipe(prefix())
    .pipe(gulp.dest('css'))
});

gulp.task('fonts', function() {
  gulp.src(brec.fonts)
    .pipe(gulp.dest('fonts'))
});

gulp.task('scripts', function() {
  gulp.src(brec.js)
    .pipe(gulp.dest('js'))
});

gulp.task('default', ['fonts', 'scripts', 'styles'], function() {
  gulp.watch([brec.sass + '/**/*.scss', 'sass/*.scss'], ['styles']);
  gulp.watch([brec.js], ['scripts']);
});
