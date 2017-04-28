var routes = angular.module('routes', ['ui.router', 'angular-loading-bar']);
routes.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('manager', {
            url: '/manager',
            templateUrl: '/assets/adminAngular/app/templates/manager.html',
            controller: 'managerCtrl'
        })
        .state('room', {
            url: '/room',
            templateUrl: '/assets/adminAngular/app/templates/room/index.html',
            controller: 'roomCtrl'
        })
        .state('user', {
            url: '/user',
            templateUrl: '/assets/adminAngular/app/templates/user/index.html',
            controller: 'userCtrl'
        })
        .state('role', {
            url: '/role',
            templateUrl: '/assets/adminAngular/app/templates/role/index.html',
            controller: 'roleCtrl'
        })
        .state('hospital', {
            url: '/hospital',
            templateUrl: '/assets/adminAngular/app/templates/hospital/index.html',
            controller: 'hospitalCtrl'
        })
        .state('patientInfo', {
            url: '/patientInfo',
            templateUrl: '/assets/adminAngular/app/templates/patientInfo/index.html',
            controller: 'patientInfoCtrl'
        })
        .state('newPatientInfo', {
            url: '/newPatientInfo/:id/:is_lock',
            templateUrl: '/assets/adminAngular/app/templates/patientInfo/form.html',
            controller: 'patientInfoFormCtrl'
        })
        .state('patientLate', {
            url: '/patientInfo/late/:current_date',
            templateUrl: '/assets/adminAngular/app/templates/patientInfo/late.html',
            controller: 'patientLateCtrl'
        })
        .state('report', {
            url: '/report',
            templateUrl: '/assets/adminAngular/app/templates/report/index.html',
            controller: 'reportCtrl'
        })
        .state('editReport', {
            url: '/report/:id',
            templateUrl: '/assets/adminAngular/app/templates/report/edit.html',
            controller: 'editReportCtrl'
        })
        .state('myMeeting', {
            url: '/myMeeting',
            templateUrl: '/assets/adminAngular/app/templates/my_meeting/index.html',
            controller: 'myMeetingCtrl'
        })
        .state('editMeeting', {
            url: '/editMeeting/:id',
            templateUrl: '/assets/adminAngular/app/templates/my_meeting/edit.html',
            controller: 'editMeetingCtrl'
        })
        .state('todayMeeting', {
            url: '/todayMeeting',
            templateUrl: '/assets/adminAngular/app/templates/today_meeting/index.html',
            controller: 'todayMeetingCtrl'
        })
        .state('meetingInfo', {
            url: '/meetingInfo/:id',
            templateUrl: '/assets/adminAngular/app/templates/my_meeting/info.html',
            controller: 'meetingInfoCtrl'
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