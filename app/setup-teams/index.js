module.exports = function buildModule() {
    'use strict'

    var module = angular.module('setup-teams', [])

    module.directive('setupTeams', require('./setup-teams-directive'))

    return module.name
}
