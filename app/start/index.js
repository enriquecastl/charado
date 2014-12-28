module.exports = function buildModule() {
    'use strict'

    var module = angular.module('start', [])

    module.directive('createTeams', require('./create-teams-directive'))

    return module.name
}
