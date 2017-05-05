const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-ruby-sass');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

gulp.task('html', () => {
  gulp.src('dist/**/*.html').pipe(browserSync.stream());

});

gulp.task('styles', () => {
  sass('assets/scss/**/*.scss').pipe(plumber()).pipe(autoprefixer('last 2 versions')).pipe(gulp.dest('dist/css/')).pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  gulp.src('assets/js/**/*.js').pipe(plumber()).pipe(rename({suffix: '.min'})).pipe(uglify()).pipe(gulp.dest('dist/js')).pipe(browserSync.stream());

});

gulp.task('images', () => {
  gulp.src('assets/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images')).pipe(browserSync.stream());
});

gulp.task('browser-sync', () => {
  browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('watch', () => {
  gulp.watch('assets/js/*.js', ['scripts']).on('change', browserSync.reload);
  gulp.watch('assets/scss/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('assets/images/*', ['images']).on('change', browserSync.reload);
  gulp.watch('dist/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['html','styles','scripts','images','browser-sync','watch']);
