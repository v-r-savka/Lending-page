//'use strict';

const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');

function buildHTML() {
   return src('*.html')
      .pipe(dest('dist/'));
};

function buildResetStyles() {
   return src('reset.css')
      .pipe(dest('dist/'));
};

function buildStyles() {
   return src('*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('dist/'));
};

function uglifyStyles() {
   return src('dist/*.css')
      .pipe(uglifycss({
         "uglyComments": true
      }))
      .pipe(dest('dist/'));
};

function buildJS() {
   return src('script/*.js')
      .pipe(babel())
      .pipe(uglify())
      .pipe(dest('dist/'));
};

function watchSCSS() {
   watch('*.scss', series(buildStyles, uglifyStyles));
};

function watchJS() {
   watch('script/*.js', series(buildJS));
}

exports.buildHTML = buildHTML
exports.buildResetStyles = buildResetStyles
exports.buildStyles = buildStyles
exports.uglifyStyles = uglifyStyles
exports.buildJS = buildJS
exports.watchSCSS = watchSCSS
exports.watchJS = watchJS

exports.default = series(
   buildHTML,
   buildResetStyles,
   buildStyles,
   uglifyStyles,
   buildJS,
   watchSCSS,
   watchJS,
)