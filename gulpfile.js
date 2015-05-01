var gulp = require('gulp');
var webserver = require('gulp-webserver');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
  var bundler = watchify(browserify('./app/src/app.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app/dist/app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> transpiling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  gulp.src('./app')
    .pipe(webserver({
      livereload: true,
    }));

  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
