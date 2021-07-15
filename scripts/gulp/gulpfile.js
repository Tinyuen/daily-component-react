const path = require('path');
const gulp = require('gulp');
const sourceMap = require('gulp-sourcemaps');
const replaceContent = require('gulp-replace');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssClean = require('gulp-clean-css');
const concat = require('gulp-concat');
const fileSize = require('gulp-filesize');
const basePath = '../../';

// sass file directory
const sassDir = path.resolve(basePath, 'components/**/style/*.scss');
const cssIndexDir = path.resolve(basePath, 'components/**/style/index.ts');
const libDir = path.resolve(basePath, 'lib');
const esDir = path.resolve(basePath, 'es');
const distDir = path.resolve(basePath, 'dist');

// generate css.js
gulp.task('replace-index-js', () => {
  return gulp
    .src(cssIndexDir)
    .pipe(replaceContent('.scss', '.css'))
    .pipe(rename(function (path, file) {
      path.basename = 'css';
      path.extname = '.js';
    }))
    .pipe(gulp.dest(libDir))
    .pipe(gulp.dest(esDir));
});

// compile scss to es and lib
gulp.task('compile-scss', () => {
  return gulp
    .src(sassDir)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssClean())
    .pipe(gulp.dest(libDir))
    .pipe(gulp.dest(esDir));
});

// compile scss to dist
gulp.task('compile-scss-dist', () => {
  return gulp
    .src(sassDir)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('tinyuen-ui.min.css'))
    .pipe(fileSize())
    .pipe(cssClean())
    .pipe(gulp.dest(distDir));
});

gulp.task('compile', gulp.series(gulp.parallel('replace-index-js', 'compile-scss')));
