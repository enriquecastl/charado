'use strict'

module.exports = navigationFactory

navigationFactory.$inject = ['machina']

function navigationFactory(machina) {
    var Navigation = machina.Fsm.extend({
        initialState : 'uninitalized',
        states : {
            uninitalized : {
                initialize : function() {
                    this.transition('start')
                }
            },
            start : {
                next : function() {
                    this.transition('setup-teams')
                }
            },
            'setup-teams' : {
                next : function() {
                    this.transition('pick-categories')
                },
                back : function() {
                    this.transition('start')
                }
            },
            'pick-categories' : {
                next : function() {
                    this.transition('game')
                },

                back : function() {
                    this.transition('setup-teams')
                }
            },
            game : {
                next : function() {
                    this.transition('over')
                }
            },
            over : {
                next : function() {
                    this.transition('start')
                }
            }
        }
    })

    return new Navigation()
}
