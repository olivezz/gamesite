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
var pluginsOptions = {
    lazy: true
};
var $ = require('gulp-load-plugins')(pluginsOptions);
var runSequence = require('run-sequence');
var config = require('./_gulp.config.js')();
var del = require('del');

var serverRoot = './app';
var fallback = './app/index.html';
/*********************************************************/

gulp.task('lint', function () {
    log('Analyzing source code');
    return gulp.src(config.jsFiles)
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
        .pipe(gulp.dest(config.path.css))
        ;
});

/*********************************************************/

gulp.task('styles', function (callback) {
    runSequence(
        'clean-styles',
        'sass',
        callback
    );
});

/*********************************************************/
gulp.task('clean-styles', function () {
    var files = config.CSS;
    clean(files);
});

/*********************************************************/

gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    var sources = gulp.src(config.filesToInject, {read: false});

    return gulp
        .src(config.indexFile)
        .pipe(wiredep(options))
        .pipe($.inject(sources, {relative: true}))
        .pipe(gulp.dest(config.path.development));
});

gulp.task('inject', function () {
    log('Injecting CSS & JS Files --> index.html');
    var target = gulp.src(config.indexFile);
    var sources = gulp.src(config.filesToInject, {read: false});
    return target.pipe($.inject(sources, {relative: true}))
        .pipe(gulp.dest(config.path.development));
});

/*********************************************************/

gulp.task('connect', function () {
    log('Running Web server --> http:localhost:9090');
    return $.connect.server({
        root: serverRoot,
        port: 9090,
        livereload: true,
        fallback: fallback
    });
});

/*********************************************************/

gulp.task('open', function () {
    var options = {
        uri: 'http://localhost:9090'
    };
    return gulp.src(config.indexFile)
        .pipe($.open(options));
});

/*********************************************************/

gulp.task('reload', function () {
    log('Reloading Web Server because a file has just changed');
    return gulp.src('./app/index.html')
        .pipe($.connect.reload());
});

/*********************************************************/

gulp.task('watch', function () {
    gulp.watch(['./app/**/*.js', './app/**/*.html'], ['reload']);
    gulp.watch('./app/**/*.scss', ['sass', 'reload']);
});

/*********************************************************/

gulp.task('serve-dev', function (callback) {
    serverRoot = './app';
    fallback = './app/index.html';
    runSequence(
        'styles',
        'inject',
        'connect',
        'open',
        'watch',
        callback
    );
});

/*********************************************************/

gulp.task('serve-prod', function (callback) {
    serverRoot = './build';
    fallback = './build/index.html';
    runSequence(
        'clean:build',
        'styles',
        'inject',
        'useref',
        'copy-images',
        'copy-html',
        'copy-json',
        'copy-fonts',
        'connect',
        'open',
        callback
    );
});

/*********************************************************/

gulp.task('clean:build', function () {
    clean('./build');
});

gulp.task('useref', function () {
    return gulp.src(config.indexFile)
        .pipe($.useref())
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.if('*.js', $.uglify()))
        .pipe(gulp.dest(config.path.production));
});

gulp.task('copy-images', function () {
    return gulp.src(config.path.images)
        .pipe($.imagemin())
        .pipe(gulp.dest(config.path.imagesProd))
});

gulp.task('copy-html', function () {
    return gulp.src(config.path.html)
        .pipe(gulp.dest(config.path.production + '/src'));
});

gulp.task('copy-json', function () {
    return gulp.src(config.path.json)
        .pipe(gulp.dest(config.path.production + '/src'));
});

gulp.task('copy-fonts', function () {
    return gulp.src(config.fontsToCopy)
        .pipe(gulp.dest(config.path.font));
});

/*********************************************************/

gulp.task('default', ['sass', 'connect', 'watch']);

//////////////////////

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

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
