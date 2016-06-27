
var gulp = require('gulp');
/**
 * parsing argument as flags from the command line
 *
 */
var args = require('yargs').argv;
/**
 * lazy -> true to get the plugins we use
 * $ takes the name of the plugin without 'gulp-'
 * and make a variable for it
 */
var $ = require('gulp-load-plugins')({lazy: true});

var config = require('./gulp.config')();

var proxy = require('http-proxy-middleware');
// var jshint = require('gulp-jshint');
// var jscs = require('gulp-jscs');
// var util = require('gulp-util');// logs with different colors
// var gulpPrint = require('gulp-print');
// var gulpif = require('gulp-if');

/*********************************************************/
gulp.task('lint', function () {
    log('Analyzing source code');
    return gulp.src(config.jsFiles)
    // if --verbose flag is written to the command for this task
    // it will print the source files that are get analyzing
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))// report message for failing files
        ;
});
/*********************************************************/
gulp.task('sass', function () {
    log('Compiling SASS --> CSS');
    return gulp.src(config.SASS)
        .pipe($.concat('main.scss'))
        .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./app/assets/css/'))
        ;
});
/*********************************************************/
gulp.task('inject', function () {
    log('Injecting CSS & JS Files --> index.html');
    var target = gulp.src(config.indexFile);
    var sources = gulp.src(config.filesToInject, {read: false});
    return target.pipe($.inject(sources, {relative: true}))
        .pipe(gulp.dest('./app'));
});
/*********************************************************/
gulp.task('connect', function () {
    log('Running Web server --> http:localhost:9090');
    return $.connect.server({
        root: './app',
        port: 9090,
        livereload: true,
        fallback: './app/index.html'
    });
});
/*********************************************************/
gulp.task('open', ['connect'], function () {

});
gulp.task('reload', function () {
    log('Reloading Web Server because file changes');
    gulp.src('./app/index.html')
        .pipe( $.connect.reload() );
});
gulp.task('watch', function () {
    gulp.watch(['./app/**/*.js', './app/**/*.html'], ['reload']);
    gulp.watch('./app/**/*.scss', ['sass', 'reload']);
});

gulp.task('default', [ 'sass', 'connect', 'watch']);

//////////////////////
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
