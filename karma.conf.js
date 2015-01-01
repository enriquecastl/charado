module.exports = function(config) {
    'use strict'

    config.set({
        frameworks : ['jasmine', 'browserify'],
        browsers : ['Chrome'],
        files : [
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.8/angular.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.8/angular-mocks.js',
            {
                pattern : 'dist/template.js',
                watched : false
            },
            {
                pattern : 'test/build.js',
                watched : false
            }
        ],

        logLevel : 'LOG_DEBUG'
    })
}
