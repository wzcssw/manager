var routes = angular.module('routes', ['ui.router', 'angular-loading-bar']);
routes.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('hospitals', {
            url: '/hospitals',
            templateUrl: '/assets/adminAngular/app/templates/hospitals/index.html',
            controller: 'hospitalCtrl'
        })
        .state('diagnose_centers', {
            url: '/diagnose_centers',
            templateUrl: '/assets/adminAngular/app/templates/diagnose_centers/index.html',
            controller: 'diagnoseCentersCtrl'
        })
    $urlRouterProvider.otherwise(home_page);
}]);

routes.config(['$httpProvider', function($httpProvider) {
    var authToken = angular.element('meta[name="csrf-token"]').attr("content");
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
}]);

routes.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
}]);