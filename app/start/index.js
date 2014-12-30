module.exports = function buildModule() {
    'use strict'

    var module = angular.module('start', [])

    module.directive('start', require('./start-directive'))

    return module.name
}
