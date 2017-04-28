// 医院管理
controllers.controller('meetingInfoCtrl', ['$scope', '$timeout', "$stateParams", 'todayMeetingHttp', '$uibModal', function($scope, $timeout, $stateParams, todayMeetingHttp, $uibModal) {
    $scope.patient = {};
    $scope.meeting_id = "";
    $scope.is_expand = true;
    if ($stateParams.id) {
        $scope.meeting_id = $stateParams.id;
    }
    $scope.init_data = function() {
        // 获得界面初始化数据
        todayMeetingHttp.get_info_data({ id: $scope.meeting_id }, function(data) {
            $scope.patient = data.patient;
            todayMeetingHttp.get_film_data({ study_id: data.patient.film_no }, function(sdata) {
                var study = sdata.study;
                // 加载影像模板
                $scope.loadTemplate("/assets/adminAngular/app/templates/film/film_viewport.html", function(element) {
                    // Now load the study.json
                    loadStudy($("#studyViewerTemplate"), element, study);
                });
            });
        });
    }
    $scope.expand = function() {
        $scope.is_expand = !$scope.is_expand;
        resizeStudyViewer();
    };
    // 加载模板
    $scope.loadTemplate = function(url, callback) {
        $.get(url, function(data) {
            var parsed = $.parseHTML(data);
            $.each(parsed, function(index, ele) {
                if (ele.nodeName === 'DIV') {
                    var element = $(ele);
                    callback(element);
                }
            });
        });
    };
    $scope.init_data();
}]);