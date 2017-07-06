var directives = angular.module('directives', []);
directives.directive('afterRender', ['$timeout', function($timeout) {
    return function(scope, element, attrs) {
        $timeout(function() {
            if (scope.$last) {
                if (attrs) {
                    scope.$eval(attrs.afterRender);
                }
            }
        });
    };
}]);
directives.directive('filmConfig', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/patientInfo/film_config.html'
        }
    };
});
directives.directive('selectAppointmentAt', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/patientInfo/appointment_at.html'
        }
    };
});
directives.directive('cancelExamine', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/patientInfo/cancel_examine.html'
        }
    };
});

directives.directive('editSymptom', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/report/edit_symptom.html'
        }
    };
});

directives.directive('editMeeting', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/my_meeting/edit.html'
        }
    };
});

directives.directive('selectParent', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/report/select_parent.html'
        }
    };
});

directives.directive('historyReportArr', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/report/history_arr.html'
        }
    };
});

directives.directive('medicalForm', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/patientInfo/medical_form.html'
        }
    };
});

directives.directive('matchFilm', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/patientInfo/match_film.html'
        }
    };
});

directives.directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value);
            });
        }
    };
});


directives.directive('film', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/film/film.html'
        }
    };
});

directives.directive('uploadImg', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/remote_diagnose/upload_img.html'
        }
    };
});

directives.directive('patientForm', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: function(elem, attr) {
            return '/assets/adminAngular/app/templates/remote_diagnose/patient_form.html'
        }
    };
});