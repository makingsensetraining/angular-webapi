﻿// Karma configuration
// Generated on Thu May 07 2015 15:34:23 GMT-0300 (Hora estándar de Argentina)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'Scripts/angular.js',
            'Scripts/angular-route.js',
            'Scripts/angular-mocks.js',
            'Scripts/ng-table.js',
            'Scripts/ng-table-export.js',
            'Scripts/ngDialog.js',
            'Scripts/angular-spinner.min.js',
            'Scripts/angular-loading-spinner.js',
            'Scripts/angularjs-dropdown-multiselect.js',
            'App/scripts/app.js',
            'App/scripts/services/**/*.js',
            'App/scripts/controllers/**/*.js',
            'Test/test.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'xml'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};