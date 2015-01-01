module.exports = NavigationDirective

function NavigationDirective(navigation) {
    'use strict'

    return {
        restrict : 'E',
        templateUrl : 'navigation/templates/navigation.html',
        link : function(scope) {
            scope.navigation = navigation
            navigation.handle('initialize')
        }
    }
}

NavigationDirective.$inject = ['navigation']
