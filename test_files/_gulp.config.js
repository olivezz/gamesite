module.exports = function () {

    var config = {

        indexFile: './app/index.html',
        jsFiles: [
            'app/src/**/*.js',
            'app/src/**/*.spec.js'
        ],
        filesToInject: [
            './app/src/**/*.js',
            '!./app/src/**/*.spec.js',
            './app/assets/css/main.css'
        ],
        SASS: [
            /* first 3 files must in order */
            './app/sass/variables.scss',
            './app/sass/fonts.scss',
            './app/sass/common.scss',
            './app/src/**/*.scss'
        ],
        CSS: './app/assets/css/*.css',
        fontsToCopy:['./app/bower_components/bootstrap/dist/fonts/**/*'],
        path: {
            css: './app/assets/css/',
            html:'./app/src/**/*.html',
            development:'./app',
            production: './build',
            images:'./app/assets/images/**/*.+(png|jpg|gif|svg)',
            imagesProd:'./build/assets/images',
            json: './app/src/**/*.json',
            font: './build/assets/fonts'
        },
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './app/bower_components/'
        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory
        };
        return options;
    };
    return config;
};