module.exports = function buildModule() {
    'use strict'

    var module = angular.module('setup-teams', [])

    module.directive('setup-teams', require('./setup-teams-directive'))

    return module.name
}
