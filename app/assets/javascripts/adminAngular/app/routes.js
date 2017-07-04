var routes = angular.module('routes', ['ui.router', 'angular-loading-bar']);
routes.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('hospitals', {
            url: '/hospitals',
            templateUrl: '/assets/adminAngular/app/templates/hospitals/index.html',
            controller: 'hospitalCtrl'
        })
        .state('brands', {
            url: '/brands',
            templateUrl: '/assets/adminAngular/app/templates/brands/index.html',
            controller: 'brandCtrl'
        })
        .state('diagnose_centers', {
            url: '/diagnose_centers',
            templateUrl: '/assets/adminAngular/app/templates/diagnose_centers/index.html',
            controller: 'diagnoseCentersCtrl'
        })
        .state('consultation_centers', {
            url: '/consultation_centers',
            templateUrl: '/assets/adminAngular/app/templates/consultations/index.html',
            controller: 'consultationCentersCtrl'
        })
        .state('manager', {
            url: '/manager',
            templateUrl: '/assets/adminAngular/app/templates/manager.html',
            controller: 'managerCtrl'
        })
        .state('manager.diagnose_centers_manager', {
            url: '/diagnose_centers_manager',
            templateUrl: '/assets/adminAngular/app/templates/diagnose_centers/manager.html',
            controller: 'diagnoseCentersManagerCtrl'
        })
        .state('manager.hospitals_manager', {
            url: '/hospitals_manager',
            templateUrl: '/assets/adminAngular/app/templates/hospitals/manager.html',
            controller: 'hospitalsManagerCtrl'
        })
        .state('manager.administrator', {
            url: '/administrator',
            templateUrl: '/assets/adminAngular/app/templates/administrators/index.html',
            controller: 'administratorCtrl'
        })
        .state('manager.consultation_manager', {
            url: '/consultation_manager',
            templateUrl: '/assets/adminAngular/app/templates/consultations/manager.html',
            controller: 'consultationCtrl'
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