module.exports = function buildModule() {
    'use strict'

    var module = angular.module('navigation', [])

    module.factory('navigation', require('./navigation'))
    module.directive('navigation', require('./navigation-directive'))
    module.factory('machina', function() {
        return require('machina')
    })

    return module.name
}
