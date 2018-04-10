angular.module('sidelab', ['ngResource', 'ngRoute']);

angular.module('sidelab').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: 'partials/main', controller: 'mainCtrl'});
});

angular.module('sidelab').controller('mainCtrl', function($scope){
    $scope.myVar = "Hello Angular";
});