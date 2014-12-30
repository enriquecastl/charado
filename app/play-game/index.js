module.exports = function buildModule() {
    'use strict'

    var module = angular.module('play-game', [])

    module.directive('playGame', require('./play-game-directive'))

    return module.name
}
