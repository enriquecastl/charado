module.exports = function buildModule() {
    'use strict'

    var module = angular.module('pick-categories', [])

    module.directive('pickCategories', require('./pick-categories-directive'))

    return module.name
}
