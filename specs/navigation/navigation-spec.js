'use strict'

var navigationMod = require('../../app/navigation')
    ;

describe('navigation', function() {
    var sut
        ;

    beforeEach(function() {
        angular.mock.module(navigationMod())
    })

    function buildSut() {
        angular.mock.inject(function(navigation) {
            sut = navigation
        })
    }

    describe('when initializing', function() {
        beforeEach(buildSut)
        beforeEach(function() {
            sut.handle('initialize')
        })

        it('should transition to start', function() {
            expect(sut.state).toEqual('start')
        })
    })
})
