// 医院管理
controllers.controller('myMeetingCtrl', ['$scope', '$timeout', 'myMeetingHttp', '$uibModal', function($scope, $timeout, myMeetingHttp, $uibModal) {
    $scope.state_arr = [];
    $scope.current_user = null;
    $scope.role_code = "";
    $scope.cur_data = {
        patient_name: "",
        state: ""
    };
    $scope.data_row = {
        current_page: 1,
        row_arr: [],
        all_page: 0,
        row_count: 0,
        page_size: 12
    };
    $scope.default_data = function() {
        $scope.cur_data.patient_name = "";
        $scope.cur_data.state = $scope.state_arr[0];
    }
    $scope.init_data = function() {
        // 获得界面初始化数据
        myMeetingHttp.get_init_data(function(data) {
            $scope.state_arr = data.state_arr;
            $scope.state_arr.unshift({ text: "全部", value: "", code: "all" });
            $scope.current_user = data.current_user;
            $scope.role_code = data.current_user.role.code;
            $scope.default_data();
            $scope.reload_page();
        });
    }
    $scope.get_page_data = function() {
        myMeetingHttp.get_page_data({
            patient_name: $scope.cur_data.patient_name,
            state: $scope.cur_data.state.value,
            page: $scope.data_row.current_page,
            page_size: $scope.data_row.page_size
        }, function(result) {
            // $scope.data_row = result.page_result;
            $scope.data_row.current_page = result.current_page;
            $scope.data_row.row_arr = result.row_arr;
            $scope.data_row.all_page = result.all_page;
            $scope.data_row.row_count = result.row_count;
            // $scope.data_row.page_size = result.page_size;
        });
    }
    $scope.search_keydown = function($event) {
        if ($event.keyCode === 13) {
            $scope.reload_page();
        }
    }
    $scope.page_changed = function() {
        console.log('Page changed to: ' + $scope.data_row.current_page);
        $scope.get_page_data();
    };
    $scope.reload_page = function() {
        $scope.data_row.current_page = 1;
        $scope.get_page_data();
    };
    // 添加新会议
    $scope.new_meeting = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editMeeting.html',
            controller: 'editMeetingCtrl',
            size: 'lg',
            resolve: {
                params: {
                    meeting: null,
                    role_code: $scope.role_code,
                    action: "req_meeting"
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.save_meeting(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    // 保存会议
    $scope.save_meeting = function(params) {
        myMeetingHttp.save({ meeting: JSON.stringify(params) }, function(result) {
            swal({
                title: "会议保存成功",
                type: "success",
                timer: 1700,
                showConfirmButton: false
            });
            $scope.reload_page();
        }, function(error) {});
    };
    // 预约专家
    $scope.edit_meeting = function(meeting) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editMeeting.html',
            controller: 'editMeetingCtrl',
            size: 'lg',
            resolve: {
                params: {
                    meeting: meeting,
                    role_code: $scope.role_code,
                    action: "set_expert"
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.save_meeting(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    $scope.req_role_arr = ["read_doctor", "check_doctor", "h_admin", "g_admin"];
    $scope.is_req_role = function() {
        return $scope.req_role_arr.includes($scope.role_code);
    };
    $scope.present_role_arr = ["h_admin", "g_admin"];
    $scope.is_present_role = function() {
        return $scope.present_role_arr.includes($scope.role_code);
    };
    $scope.res_role_arr = ["expert"];
    $scope.is_res_role = function() {
        return $scope.res_role_arr.includes($scope.role_code);
    };
    $scope.btn_show = function(btn_name, meeting) {
        switch (btn_name) {
            case "go_appointment":
                if ($scope.is_present_role() && ["checking", "make_sure"].includes(meeting.state)) {
                    return true;
                } else {
                    return false;
                }
                break;
            case "go_open_meeting":
                if ($scope.is_present_role() && "make_sure" == meeting.state) {
                    return true;
                } else {
                    return false;
                }
                break;
            case "go_join_meeting":
                if (($scope.is_res_role() || $scope.is_req_role()) && "in_meeting" == meeting.state) {
                    return true;
                } else {
                    return false;
                }
                break;
            case "go_finish_meeting":
                if ($scope.is_present_role() && "in_meeting" == meeting.state) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    };
    // 开会
    $scope.open_meeting = function(meeting) {
        warn_confirm({
            title: "开会",
            text: "确定开会吗？",
            sure_func: function() {
                myMeetingHttp.open_meeting({
                    id: meeting.id
                }, function(result) {
                    // 1刷新状态
                    meeting.state = result.state;
                    meeting.url = result.url;
                    meeting.teamview_id = result.teamview_id;
                    // $scope.reload_page();
                    // 2 向医生和专家用户发出WebSocket通知
                    // 3 打开TeamView
                    window.open(meeting.url, "teamview");
                    // 4 打开会诊界面
                    window.open("/admin#/meetingInfo/" + meeting.id, "meeting_info");
                }, function(result) {
                    swal("错误", result.error, "error");
                });
            }
        });
    };
    // 加入会议
    $scope.join_meeting = function(meeting) {
        warn_confirm({
            title: "加入会议",
            text: "确定加入会议吗？",
            sure_func: function() {
                window.open(meeting.url, "teamview");
                window.open("/admin#/meetingInfo/" + meeting.id, "meeting_info");
            }
        });
    };
    // 结束会议
    $scope.finish_meeting = function(meeting) {
        warn_confirm({
            title: "结束会议",
            text: "确定结束会议吗？结束后会议将无法再开启！",
            sure_func: function() {
                myMeetingHttp.finish_meeting({
                    id: meeting.id
                }, function(result) {
                    // 1刷新状态
                    meeting.state = result.meeting.state;
                    $scope.reload_page();
                }, function(result) {
                    swal("错误", result.error, "error");
                });
            }
        });
    };
    $scope.init_data();
}]);

// 添加医院
controllers.controller('editMeetingCtrl', ["$scope", "$uibModalInstance", "myMeetingHttp", "params", function($scope, $uibModalInstance, myMeetingHttp, params) {
    $scope.role_code = params.role_code;
    $scope.action = params.action;
    $scope.patient_arr = [];
    $scope.expert_arr = [];
    $scope.query = {
        patient_name: ""
    };
    $scope.data = {
        id: '',
        name: '',
        comment: '',
        req_start_at: '',
        req_end_at: '',
        res_start_at: '',
        res_end_at: '',
        patient_info_id: '',
        report_id: '',
        res_user_id: '',
        patient_info: null,
        expert: null,
        action: params.action
    };
    $scope.load_form_data = function() {
        if (params.meeting == null) {
            return;
        }
        angular.extend($scope.data, params.meeting);
        $scope.data.patient_info = {
            patient_info_id: $scope.data.patient_info_id,
            patient_name: $scope.data.patient_name,
            patient_age: $scope.data.patient_age,
            patient_phone: $scope.data.patient_phone
        };
    };
    $scope.search = function() {
        $scope.get_my_patient_arr();
    };
    $scope.get_my_patient_arr = function() {
        myMeetingHttp.get_my_patient_arr({
            patient_name: $scope.query.patient_name
        }, function(data) {
            $scope.patient_arr = data.patient_arr;
        });
    };
    $scope.select_patient = function(patient) {
        $scope.data.patient_info_id = patient.patient_info_id;
        $scope.data.report_id = patient.report_id;
        $scope.data.patient_info = patient;
    };
    $scope.select_expert = function() {
        $scope.data.res_user_id = $scope.data.expert.id;
    };
    $scope.init_data = function() {
        $scope.load_form_data();
        myMeetingHttp.get_form_init_data(function(data) {
            $scope.expert_arr = data.expert_arr;
            if ($scope.data.res_user_id != '') {
                $scope.data.expert = $scope.expert_arr.find(function(item) {
                    if (item.id == $scope.data.res_user_id) {
                        return true;
                    }
                })
            }
            $scope.get_my_patient_arr();
        });
    };

    $scope.check_form = function() {
        if ($scope.data.name == null || $scope.data.name.trim() == "") {
            swal("错误", "会议名称不能为空", "error");
            return false;
        }
        if ($scope.data.req_start_at == null || $scope.data.req_start_at == "") {
            swal("错误", "会议开始时间不能为空", "error");
            return false;
        }
        if ($scope.data.req_end_at == null || $scope.data.req_end_at == "") {
            swal("错误", "会议结束时间不能为空", "error");
            return false;
        }
        if ($scope.data.req_end_at == null || $scope.data.req_end_at == "") {
            swal("错误", "会议结束时间不能为空", "error");
            return false;
        }
        return true;
    };

    $scope.ok = function() {
        if (!$scope.check_form()) {
            return false;
        }
        $uibModalInstance.close($scope.data);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init_data();
}]);