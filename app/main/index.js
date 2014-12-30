(function buildApp() {
    'use strict'

    var module = angular.module('charado', [
        'ngRoute',
        'ngResource',
        'templates',
        require('../start')(),
        require('../setup-teams')(),
        require('../pick-categories')(),
        require('../play-game')()
    ])

    return module
})()
