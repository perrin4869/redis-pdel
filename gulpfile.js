const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const util = require('gulp-util');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const replace = require('gulp-replace');
const compiler = require('babel-core/register');

const src = 'src/index.js';

gulp.task('lint', () =>
  gulp.src(src)
  .pipe(eslint())
  .pipe(eslint.format())
);

gulp.task('build', ['lint'], () => (
  gulp.src(src)
  .pipe(babel())
  .pipe(replace(
    '{{__LUA_PLACEHOLDER__}}',
    fs.readFileSync(path.join(__dirname, 'src', 'mdel.lua'))
  ))
  .pipe(gulp.dest('lib'))
));

gulp.task('test', ['build'], () => (
  gulp.src('test')
  .pipe(mocha({
    compilers: { // TODO: remove once gulp-mocha supports test/mocha.opts
      js: compiler,
    },
  }))
  .on('error', util.log)
));

gulp.task('watch', () => {
  gulp.watch(src, ['test']);
});

gulp.task('develop', ['watch']);

gulp.task('default', ['develop']);
