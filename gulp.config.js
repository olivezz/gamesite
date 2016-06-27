module.exports = function () {

    var config = {

            indexFile: './app/index.html',
            jsFiles: [
                'app/src/**/*.js',
                '!app/src/**/*.spec.js'
            ],
            filesToInject:[
                './app/src/**/*.js',
                '!./app/src/**/*.spec.js',
                './app/assets/css/main.css'
            ],
            SASS: [
                /* first 3 files must in order */
                './app/sass/_colors.scss',
                './app/sass/_marginpadding.scss',
                './app/sass/_typography.scss',
                './app/sass/styles.scss',
                './app/sass/_layout.scss',
                './app/sass/prebootstrap4.scss',
                './app/src/**/*.scss'
            ],

            testFiles: [
                'bower_components/angular/angular.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/angular-resource/angular-resource.js',
                'app/**/*.js'
            ]
        }
        ;
    return config;
};
