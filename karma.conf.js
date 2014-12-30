module.exports = function(config) {
    'use strict'

    config.set({
        frameworks : ['jasmine', 'browserify'],
        browsers : ['Chrome'],
        files : [
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.8/angular.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.8/angular-mocks.js',
            {
                pattern : 'dist/build.js',
                watched : true
            },
            {
                pattern : 'dist/template.js',
                watched : true
            },
            {
                pattern : 'specs/**/*-spec.js',
                watched : true
            }
        ],

        logLevel : 'LOG_DEBUG',

        preprocessors : {
            'specs/**/*-spec.js' : ['browserify']
        }
    })
}
