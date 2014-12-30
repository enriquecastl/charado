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

    describe('when going to the next state', function() {
        describe('given the current state is start', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.handle('initialize')
                sut.handle('next')
            })

            it('should transition to setup-teams', function() {
                expect(sut.state).toEqual('setup-teams')
            })
        })

        describe('given the current state is setup-teams', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.transition('setup-teams')
                sut.handle('next')
            })

            it('should transition to pick-categories', function() {
                expect(sut.state).toEqual('pick-categories')
            })
        })

        describe('given the current state is pick-categories', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.transition('pick-categories')
                sut.handle('next')
            })

            it('should transition to game', function() {
                expect(sut.state).toEqual('game')
            })
        })

        describe('given the current state is game', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.transition('game')
                sut.handle('next')
            })

            it('should transition to over', function() {
                expect(sut.state).toEqual('over')
            })
        })

        describe('given the current state is over', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.transition('over')
                sut.handle('next')
            })

            it('should transition to start', function() {
                expect(sut.state).toEqual('start')
            })
        })
    })

    describe('when going back', function() {
        describe('given the current state is setup-teams', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.transition('setup-teams')
                sut.handle('back')
            })

            it('should transition to start', function() {
                expect(sut.state).toEqual('start')
            })
        })

        describe('given the current state is pick-categories', function() {
            beforeEach(buildSut)
            beforeEach(function() {
                sut.transition('pick-categories')
                sut.handle('back')
            })

            it('should transition to setup-teams', function() {
                expect(sut.state).toEqual('setup-teams')
            })
        })
    })
})
