// gulp task runner
var gulp = require('gulp');

// gulp-connect for a dev webserver/live reload
var connect = require('gulp-connect');

// jshint checks code quality for builds
var jshint = require('gulp-jshint');

// jshintrc loads .jshintrc into memory
//var jshintrc = require('./.jshintrc');

// uglify concatenates and minifies javascript
var uglify = require('gulp-uglify');

// minify-css minifies css
var minicss = require('gulp-minify-css');

// del is a native node module for deleting files and folders
var del = require('del');

// do not do fs lookups for .jshintrc (in memory)
//jshint.lookup = false;

/**
 * Spins up the development webserver with live-reload.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('connect', function() {
  connect.server({
    root: "app/",
    port: 8008
  })
});

/**
 * Lints the code for correctness.
 *
 * @author Abel Fletcher <abelflethcer@gmail.com>
 */
gulp.task('jshint', function() {
  gulp.src(['./app/**/*.js',
            '!./app/bower_components/**',
            '!./node_modules/**'])
    .pipe(jshint(jshintrc))
    .pipe(jshinst.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Enforces coding style/standards.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('jscs', function() {
});

/**
 * Lint runs both jshint and jscs.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('lint', ['jshint', 'jscs']);

/**
 * Clean the build directory of old builds.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('clean', function() {
  // use del to clean the build directory
});

/**
 * Minify the css for this project.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('minify-css', function() {
  var opts = {comments: true, spare: true};
  gulp.src(['./app/**/*.css',
            '!./app/bower_components/**',
            '!./node_modules/**'])
    .pipe(minicss(opts))
    .pipe(gulp.dest('./rc/'));
});

/**
 * Minify the javascript for this project.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js',
            '!./app/bower_components/**',
            '!./node_modules/**'])
    .pipe(uglify())
    .pipe(gulp.dest('./rc/'));
});

/**
 * Runs both minification tasks.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('minify', ['minify-css', 'minify-js']);

/**
 * Copy the bower components into the release.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('copy-bower-components', function() {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('./rc/bower_components'));
});

/**
 * Copy .html files into the release.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('copy-html-files', function() {
  gulp.src('./app/**/.html')
    .pipe(gulp.dest('./rc'));
});

/**
 * Runs both copy tasks.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('copy', ['copy-bower-components', 'copy-html-files']);

/**
 * Start a test server using the release candidate.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('connect-rc', function() {
  connect.server({
    root: "rc/",
    port: 9009
  });
});

/**
 * Default task to run.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('default', ['lint', 'connect']);

/**
 * Build task for building a release.
 *
 * @author Abel Fletcher <abelfletcher@gmail.com>
 */
gulp.task('build', ['lint', 'minify', 'copy', 'connect-rc']);
