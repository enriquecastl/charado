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
            'setup-teams' : true
        }
    })

    return new Navigation()
}
