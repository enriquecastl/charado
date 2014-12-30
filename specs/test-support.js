'use strict'

var util = require('util')

module.exports = {
    registerModule : function(moduleName) {
        var module = this.getModule(moduleName)
            ;

        angular.mock.module(module.name)

        return module
    },
    getModule : function(moduleName) {
        return require(util.format('../app/%s', moduleName))
    }
}
