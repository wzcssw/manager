var app = angular.module('TxOlcrmAdmin', ['ui.bootstrap', 'ui.bootstrap.datetimepicker', 'routes', 'controllers', 'filters', 'jkuri.slimscroll', 'ui.tree', 'angular-loading-bar', 'ngAnimate']);
//配置
app.config(['$httpProvider', function($httpProvider) {
    var authToken = angular.element('meta[name="csrf-token"]').attr("content");
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
}]);
app.run(['$rootScope', '$stateParams', '$location', '$state', function($rootScope, $stateParams, $location, $state) {
    $rootScope.urlParams = $stateParams;
    $rootScope.location_path = $location.path();
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        
    });
}]);
