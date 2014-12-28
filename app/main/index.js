(function buildApp() {
    'use strict'

    var module = angular.module('charado', [
        'ngRoute',
        'ngResource',
        'templates',
        require('../start')()
    ])

    return module
})()
