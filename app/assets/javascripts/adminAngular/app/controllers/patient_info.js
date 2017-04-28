// 检查预约
controllers.controller('patientInfoCtrl', ['$scope', '$timeout', '$interval', 'get_params', 'patientInfoHttp', '$uibModal', '$state', '$location', '$anchorScroll', function($scope, $timeout, $interval, get_params, patientInfoHttp, $uibModal, $state, $location, $anchorScroll) {
    $scope.patient_name = "";
    $scope.current_date = new Date();
    $scope.current_patient = null;
    $scope.select_patient = null;
    $scope.time_arr = [];
    $scope.data_arr = [];
    $scope.next_day = function() {
        $scope.current_date = $scope.current_date.AddDay(1);
        $scope.reload_data();
    };
    $scope.previous_day = function() {
        $scope.current_date = $scope.current_date.AddDay(-1);
        $scope.reload_data();
    };
    // 重新加载数据
    $scope.reload_data = function() {
        patientInfoHttp.get_queue_data({
            date: $scope.current_date,
            patient_name: $scope.patient_name
        }, function(result) {
            $scope.time_arr = result.time_arr;
            $scope.data_arr = result.data_arr;
            $scope.get_prepar_patient();
            // $scope.relocation_time_point();
        });
    };
    // 新增检查患者
    $scope.add_patient = function() {
        $state.go('newPatientInfo');
    };
    // 快诊补单
    $scope.add_kz_order = function() {

    };
    // 搜索患者
    $scope.search_patient = function() {
        if ($scope.patient_name.trim() == "") {
            return;
        }
        var temp_pi = $scope.data_arr.find(function(item) {
            if (item.patient_name.indexOf($scope.patient_name) > -1) {
                return true;
            }
        });
        if (temp_pi) {
            $scope.select_patient = temp_pi;
            $scope.relocation_patient_point();
        } else {
            swal("对不起", "未找到姓名类似" + $scope.patient_name + "的记录", "warning");
        }
        // $scope.reload_data();
    };
    $scope.search_keydown = function($event) {
        if ($event.keyCode === 13) {
            $scope.search_patient();
        }
    };
    // 去迟到页面
    $scope.go_late_page = function() {
        $state.go("patientLate", { current_date: $scope.current_date.toString() });
    };
    // 重新定位
    $scope.relocation_patient_point = function() {
        if ($scope.select_patient) {
            $timeout(function() {
                var a_id = $scope.select_patient.hospital_no + $scope.select_patient.patient_name;
                // $location.hash(a_id);
                // $anchorScroll();
                // debugger
                var t_height = $("#" + a_id).offset().top;
                var c_height = $('.page_content').scrollTop();
                console.log("t_height is " + t_height + " c_height is " + c_height);
                $('.page_content').animate({ scrollTop: t_height + c_height - 200 }, "slow");
                return false;
            });
        }
    };
    // 重新定位时间点
    $scope.relocation_time_point = function() {
        var now = new Date();
        var match_t = $scope.time_arr.find(function(time) {
            if (new Date(time.begin) <= now && new Date(time.end) >= now) {
                return true;
            }
        });
        if (!match_t) {
            match_t = $scope.time_arr[$scope.time_arr.length - 1];
        }
        $timeout(function() {
            // $location.hash(new Date(match_arr[0].begin).Format("hh:mm"));
            // $anchorScroll();
            var a_id = new Date(match_t.begin).Format("hhmm");
            var t_height = $("#" + a_id).offset().top;
            var c_height = $('.page_content').scrollTop();
            console.log("t_height is " + t_height + " c_height is " + c_height);
            $('.page_content').animate({ scrollTop: t_height + c_height - 200 }, "slow");
            return false;
        });
    };
    // 自动时间滚动
    $scope.start_auto_time_flow = function() {
        $interval($scope.relocation_time_point, 5 * 60 * 1000);
    };
    // 获得下一个准备检查的患者
    $scope.get_prepar_patient = function() {
        var sort_data_arr = $scope.data_arr.sort(function(a, b) {
            var aat = new Date(a.appointment_at);
            var bat = new Date(b.appointment_at);
            return aat - bat;
        });
        // 1先去找检查中的记录
        // var index = sort_data_arr.findIndex(function(item) {
        //     return item.state == 2;
        // });
        // if (index != -1) {
        //     $scope.current_patient = $scope.data_arr[index];
        //     $scope.select_patient = $scope.current_patient;
        //     return;
        // }
        // 2找不到就去找正在等待中的记录
        var index = sort_data_arr.findIndex(function(item) {
            return item.state == 1;
        });
        if (index != -1) {
            $scope.current_patient = $scope.data_arr[index];
            $scope.select_patient = $scope.current_patient;
            return;
        }
        // 如果都找不到就是空
        $scope.current_patient = null;
        $scope.select_patient = null;
    };

    // 叫号成功
    $scope.call_success = function(patient_info) {
        if (patient_info.id == '') {
            return;
        }
        warn_confirm({
            title: "确认",
            text: "确定患者已经进入核磁室了吗？",
            sure_func: function() {
                patientInfoHttp.call_success({
                    id: patient_info.id
                }, function(result) {
                    if (result.success) {
                        patient_info.state = 2;
                        $scope.get_prepar_patient();
                        // 通知report页面刷新数据
                        $scope.report_cable.new_waiting(patient_info);
                    }
                });
            }
        });
    };

    // 患者未到
    $scope.not_coming = function(patient_info) {
        if (patient_info.id == '' && patient_info.order_code == '') {
            return;
        }
        warn_confirm({
            title: "确认",
            text: "确定患者迟到吗？",
            sure_func: function() {
                patientInfoHttp.not_coming({
                    id: patient_info.id,
                    order_code: patient_info.order_code
                }, function(result) {
                    if (result.success) {
                        $scope.reload_data();
                    }
                });
            }
        });
    };

    // 完成检查
    $scope.finish_examine = function(patient_info) {
        if (patient_info.id == '') {
            return;
        }
        warn_confirm({
            title: "确认",
            text: "确定患者完成检查了吗？",
            sure_func: function() {
                patientInfoHttp.finish_examine({
                    id: patient_info.id
                }, function(result) {
                    if (result.success) {
                        patient_info.state = 3;
                        $scope.get_prepar_patient();
                    }
                });
            }
        });
    };
    // 查看详情
    $scope.show_info = function(patient_info) {
        if (patient_info.id == '') {
            return;
        }
        $state.go('newPatientInfo', {
            id: patient_info.id,
            is_lock: patient_info.state == 3
        });
    };
    // 取消检查
    $scope.cancel_examine = function(patient_info) {
        if (patient_info.id == '' && patient_info.order_code == '') {
            return;
        }
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'cancel.html',
            controller: 'cancelExamineCtrl',
            size: 'sm',
            resolve: {
                params: {
                    id: patient_info.id,
                    order_code: patient_info.order_code
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.cancel_examine_action(params);
        }, function() {
            console.log('窗口关闭 at: ' + new Date());
        });
    };
    $scope.cancel_examine_action = function(params) {
        patientInfoHttp.cancel_examine({
            id: params.id,
            order_code: params.order_code,
            reason: params.cancel_reason
        }, function(result) {
            if (result.success) {
                $scope.reload_data();
            }
        });
    };
    // 改变当前选择的病人
    $scope.change_sel_patient = function(patient) {
        $scope.select_patient = patient;
    };
    // 接收远程通知
    $scope.patient_info_cable = App.cable.subscriptions.create("PatientInfoChannel", {
        connected: function() {},
        disconnected: function() {},
        received: function(result) {
            $timeout(function() {
                // $scope.msg_list.push(result.patient_info);
                $scope.reload_data();
            });
        },
        new_order: function(patient_info) {
            return this.perform('new_order', patient_info);
        }
    });
    // 通知report
    $scope.report_cable = App.cable.subscriptions.create("ReportChannel", {
        new_waiting: function(patient_info) {
            return this.perform('new_waiting', patient_info);
        }
    });
    $scope.reload_data();
    $scope.start_auto_time_flow();
}]);

controllers.controller('cancelExamineCtrl', ["$scope", "$uibModalInstance", "params", function($scope, $uibModalInstance, params) {
    $scope.id = params.id;
    $scope.order_code = params.order_code;
    $scope.cancel_reason = params.cancel_reason;
    $scope.ok = function() {
        if ($scope.cancel_reason == null || $scope.cancel_reason.trim() == "") {
            sweetAlert("错误", "取消原因必填", "error");
            $scope.cancel_reason = "";
            return;
        }
        $uibModalInstance.close({
            id: $scope.id,
            order_code: $scope.order_code,
            cancel_reason: $scope.cancel_reason
        });
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);

// 新增检查单（排队）
controllers.controller('patientInfoFormCtrl', ['$scope', '$timeout', '$stateParams', 'patientInfoHttp', 'orderHttp', '$uibModal', function($scope, $timeout, $stateParams, patientInfoHttp, orderHttp, $uibModal) {
    $scope.is_lock = false;
    $scope.cur_patient = {
        id: '',
        hospital_no: '',
        in_patient_num: '',
        patient_type: 0,
        patient_name: '',
        patient_phone: '',
        patient_sex: '',
        patient_age: null,
        in_patient_state: null,
        project_id: '',
        project_name: '',
        diagnose_info: '',
        total_fee: '',
        reduce_pay: '',
        insurance_pay: '',
        real_pay: '',
        appointment_at: '',
        body_description: '',
        is_kz_order: false,
        order_code: '',
        hospital_id: '',
        project: null,
        body_group: null,
        bodies: [],
        ip_check_project_arr: [],
        film: true,
        electronic_film: true
    };
    if ($stateParams.id) {
        $scope.cur_patient.id = $stateParams.id;
    }
    if ($stateParams.is_lock != undefined) {
        $scope.is_lock = ($stateParams.is_lock === 'true' ? true : false);
    }
    $scope.sex_arr = [
        { id: 1, name: '男', code: 'male' },
        { id: 0, name: '女', code: 'female' }
    ];
    $scope.project_arr = [];
    $scope.project_body_arr = [];
    $scope.body_group_arr = [];
    $scope.body_arr = [];
    $scope.cur_body_arr = [];
    $scope.in_patient_state_arr = [];
    $scope.have_error = false;
    $scope.can_save = true;
    // 设置病人类型
    $scope.set_patient_type = function(p_type) {
        if (p_type == 0) {
            $scope.cur_patient.hospital_no = '';
            $scope.cur_patient.in_patient_num = '';
            $scope.cur_patient.in_patient_state = null;
        } else if (p_type == 1) {
            $scope.cur_patient.hospital_no = '';
            $scope.cur_patient.in_patient_state = $scope.in_patient_state_arr[0];
            $scope.cur_patient.total_fee = '';
            $scope.cur_patient.reduce_pay = '';
            $scope.cur_patient.insurance_pay = '';
            $scope.cur_patient.real_pay = '';
            $scope.cur_patient.is_kz_order = false;
            $scope.cur_patient.order_code = '';
        }
        $scope.cur_patient.patient_type = p_type;
    }

    // 锁定所有数据项
    $scope.lock_all_control = function() {
        if (!$scope.is_lock) {
            return;
        }
        $("input").prop('disabled', true);
        $("select").prop('disabled', true);
        $("textarea").prop('disabled', true);
        $("button[id!='cancel_btn']").prop('disabled', true);
        // 如果没有匹配快诊订单的话允许他再匹配
        if ($scope.cur_patient.is_kz_order == false) {
            $("#order_code").prop('disabled', false);
        }
        $("#patient_phone").prop('disabled', false);
        $("#save_btn").prop('disabled', false);
        $("button[class='confirm']").prop('disabled', false);
        $(".body_items").hide();
    };
    // 加载初始化数据方法
    $scope.init_data = function() {
        patientInfoHttp.get_form_init_data({
            id: $scope.cur_patient.id
        }, function(result) {
            if (!result.success) {
                return;
            }
            // 初始化选择框的选项
            $scope.project_arr = result.project_arr;
            $scope.body_group_arr = result.body_group_arr;
            $scope.body_arr = result.body_arr;
            $scope.project_body_arr = result.project_body_arr;
            $scope.body_group_body_arr = result.body_group_body_arr;
            $scope.in_patient_state_arr = result.in_patient_state_arr;
            // 初始化选择框的默认值
            $scope.cur_patient.patient_sex = null;
            $scope.cur_patient.in_patient_state = $scope.in_patient_state_arr[0];
            $scope.cur_patient.project = $scope.project_arr[0];
            $scope.cur_patient.body_group = $scope.body_group_arr[0];
            $scope.cur_body_arr = $scope.body_arr.filter($scope.should_body_show);
            if (result.patient_info) {
                // 如果有患者数据的话则加载患者数据
                $scope.cur_patient = $scope.convert(result.patient_info, result.ip_check_project_arr, result.patient_info_bodies);
                $scope.cur_patient.body_group = $scope.body_group_arr[0];
                $scope.body_group_change($scope.cur_patient.body_group);
            }
            // 是否锁定
            $scope.lock_all_control();
        });
    };
    // 加载医院数据数据方法
    $scope.load_hospital_data = function() {
        if ($scope.cur_patient.patient_type == 1) {
            // 住院患者
            if ($scope.cur_patient.in_patient_num.trim() == "") {
                return;
            }
        } else {
            // 非住院患者
            if ($scope.cur_patient.hospital_no.trim() == "") {
                return;
            }
        }
        patientInfoHttp.load_hospital_data({
            hospital_no: $scope.cur_patient.hospital_no,
            in_patient_num: $scope.cur_patient.in_patient_num,
            patient_type: $scope.cur_patient.patient_type
        }, function(result) {
            if (result.h_order) {
                var h_order = result.h_order;
                // 如果有患者数据的话则加载患者数据
                $scope.cur_patient.patient_name = h_order.patient_name;
                $scope.cur_patient.patient_phone = h_order.patient_phone;
                if (h_order.patient_sex) {
                    var t_sex = $scope.sex_arr.find(function(sex) {
                        return (sex.id == h_order.patient_sex)
                    });
                    $scope.cur_patient.patient_sex = t_sex;
                }
                $scope.cur_patient.patient_age = h_order.patient_age;
                $scope.cur_patient.project_name = h_order.project_name;
                $scope.cur_patient.diagnose_info = h_order.diagnosis_name;
                if ($scope.cur_patient.patient_type == 1) {
                    var nowtime = (new Date()).Format('yyMMddhhmmss');
                    var g_hospital_no = nowtime;
                    $scope.cur_patient.hospital_no = g_hospital_no;
                    if (h_order.in_patient_state) {
                        var t_ips = $scope.in_patient_state_arr.find(function(ips) {
                            return (ips.value == h_order.in_patient_state)
                        });
                        $scope.cur_patient.in_patient_state = t_ips;
                    }
                    $scope.cur_patient.total_fee = "";
                    $scope.cur_patient.ip_check_project_arr = result.ip_check_project_arr;
                } else {
                    $scope.cur_patient.total_fee = h_order.check_fee;
                }
                // 根据Name搜索选项
                if (h_order.check_item) {
                    var t_project = $scope.project_arr.find(function(item) {
                        return (item.name == h_order.check_item)
                    });
                    if (t_project) {
                        $scope.cur_patient.project = t_project;
                    }
                }
                if (h_order.check_site) {
                    var cs_arr = h_order.check_site.split(",");
                    cs_arr.forEach(function(cs) {
                        var t_body = $scope.body_arr.find(function(item) {
                            return (item.name == cs)
                        });
                        if (t_body && $scope.cur_patient.bodies.indexOf(t_body) == -1) {
                            $scope.cur_patient.bodies.push(t_body);
                        }
                    });
                }
            }
        }, function(result) {
            swal("对不起", result.result.error, "error");
            return;
        });
    };
    // 搜索检查部位
    $scope.search_body_keydown = function($event) {
        if ($event.keyCode === 13) {
            // $scope.search_patient();
        }
    };
    // 修改检查项目
    $scope.project_change = function(project) {
        $scope.cur_body_arr = $scope.body_arr.filter($scope.should_body_show);
    };
    // 修改检查部位
    $scope.body_group_change = function(body_group) {
        $scope.cur_body_arr = $scope.body_arr.filter($scope.should_body_show);
    };
    // 判断body是否应该显示
    $scope.should_body_show = function(body) {
        var is_show = false;
        var project_allow = false;
        var body_group_allow = false;

        function is_this_project(pb) {
            return (pb.project_id == $scope.cur_patient.project.id && pb.body_id == body.id);
        }

        function is_this_body_group(bgb) {
            return (bgb.body_group_id == $scope.cur_patient.body_group.id && bgb.body_id == body.id);
        }
        if ($scope.cur_patient.project) {
            if ($scope.project_body_arr.some(is_this_project)) {
                project_allow = true;
            }
        }
        if ($scope.cur_patient.body_group) {
            if ($scope.body_group_body_arr.some(is_this_body_group)) {
                body_group_allow = true;
            }
        }
        if (project_allow && body_group_allow) {
            is_show = true
        }
        return is_show;
    }
    $scope.convert = function(obj, ip_check_project_arr, patient_info_bodies) { // 调整回显数据
        obj.patient_sex = $scope.sex_arr.find(function(item) { // 性别
            return (item.code == obj.patient_sex);
        });
        obj.project = $scope.project_arr.find(function(item) { // project
            return (item.id == obj.project_id);
        });
        obj.in_patient_state = $scope.in_patient_state_arr.find(function(item) { // in_patient_state
            return (item.code == obj.in_patient_state);
        });
        obj.ip_check_project_arr = ip_check_project_arr;
        obj.bodies = $scope.body_arr.filter(function(body) {
            var tmp_index = patient_info_bodies.findIndex(function(item) {
                return (item.body_mode_id == body.id);
            });
            return (tmp_index != -1);
        });
        if (obj.order_code == null) { // 匹配快诊订单
            obj.order_code = "无匹配项";
        }
        obj.appointment_at = new Date(obj.appointment_at);
        return obj
    }
    $scope.get_sel_body_desc = function() {
        var body_name_arr = $scope.cur_patient.bodies.map(function(item) {
            return item.name;
        });
        return body_name_arr.join("、");
    }
    $scope.get_sel_body_desc_an = function() {
        var body_name_arr = $scope.cur_patient.bodies.map(function(item) {
            return item.name;
        });
        return body_name_arr.join(",");
    }
    $scope.body_change = function(body) {
        var tindex = $scope.cur_patient.bodies.indexOf(body);
        if (tindex != -1) {
            $scope.cur_patient.bodies.splice(tindex, 1);
        } else {
            $scope.cur_patient.bodies.push(body);
        }
    }

    $scope.save = function() {
        $scope.can_save = false;
        if (!$scope.valid()) {
            $scope.$watch('cur_patient', function(newValue, oldValue) {
                $scope.valid();
            }, true);
            $scope.can_save = true;
            return;
        }
        var param_obj = $.extend({}, $scope.cur_patient);
        delete param_obj.ip_check_project_arr;
        param_obj.project_id = $scope.cur_patient.project.id;
        param_obj.project_name = $scope.cur_patient.project.name;
        if (param_obj.in_patient_num == "") {
            param_obj.in_patient_num = null;
        }
        if ($scope.cur_patient.in_patient_state !== null) {
            param_obj.in_patient_state = $scope.cur_patient.in_patient_state.value;
        } else {
            param_obj.in_patient_state = null;
        }
        param_obj.body_description = $scope.get_sel_body_desc_an();
        if (param_obj.order_code == "无匹配项") {
            param_obj.order_code = "";
        }
        patientInfoHttp.form_save({
            patient_info: JSON.stringify(param_obj)
        }, function(result) {
            if (result.success) {
                swal({
                    title: "保存成功",
                    type: "success",
                    confirmButtonColor: "#5078b3",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                }, function(isConfirm) {
                    $scope.back();
                });
            }
        }, function(result) {
            swal("错误", result.result.error, "error");
        }, function() {
            // 最后要打开保存按钮
            $scope.can_save = true;
        });
    };
    $scope.valid = function() {
        $scope.have_error = false;
        var result = 0;
        $('input[required-i="true"]').each(function(i, e) {
            if ($(e).val() == "") {
                result += 1;
                $(e).parent().parent().addClass("has-error");
            } else {
                $(e).parent().parent().removeClass("has-error");
            }
        });
        $('select[required-i="true"]').each(function(i, e) {
            if ($(e).val() == "") {
                result += 1;
                $(e).parent().parent().addClass("has-error");
            } else {
                $(e).parent().parent().removeClass("has-error");
            }
        });
        $('input[required-btn="true"]').each(function(i, e) {
            if ($(e).val() == "") {
                result += 1;
                $($(e).prev()).removeClass("btn-primary").addClass("btn-danger");
            } else {
                $($(e).prev()).addClass("btn-primary").removeClass("btn-danger");
            }
        });
        if (result > 0) {
            $scope.have_error = true;
        }
        return result <= 0;
    };
    // 选择预约时间Modal
    $scope.set_schedule = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'set_schedule.html',
            controller: 'setScheduleCtrl',
            windowClass: 'app-modal-window',
            resolve: {
                current_user: function() {
                    return $scope.current_user;
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.cur_patient.appointment_at = params.time;
        }, function() {});
    };
    // 匹配快诊订单Modal
    $scope.match_diag_order = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'match_diag_order.html',
            controller: 'matchDiagOrderCtrl',
            // windowClass: 'app-modal-window-md',
            size: 'lg',
            resolve: {
                cur_patient: function() {
                    return $scope.cur_patient;
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.cur_patient.order_code = params.order_code;
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    // 设置胶片类型
    $scope.set_film_config = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'film_config.html',
            controller: 'setFilmConfigCtrl',
            windowClass: 'app-modal-window-md',
            resolve: {
                cur_patient: function() {
                    return $scope.cur_patient;
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.cur_patient.order_code = params.order_code;
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    $scope.back = function() {
        window.location.href = "/admin#/patientInfo";
    };
    $scope.init_data();
}]);

controllers.controller('setFilmConfigCtrl', ["$scope", "$uibModalInstance", "patientInfoHttp", "cur_patient", function($scope, $uibModalInstance, patientInfoHttp, cur_patient) {
    $scope.film = true;
    $scope.electronic_film = true;
    $scope.access_code = "";
    $scope.is_expired = false;
    $scope.generate_code = function() {
        $scope.access_code = GetUniqueStr(8);
    };
    $scope.load_code_state = function() {
        if (cur_patient.id == "") {
            $scope.generate_code();
        }
    };
    $scope.ok = function() {
        if ($scope.film == true || $scope.electronic_film == true) {
            $uibModalInstance.close({
                film: $scope.film,
                electronic_film: $scope.electronic_film,
                access_code: $scope.access_code
            });
        }
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.load_code_state();
}]);

controllers.controller('setScheduleCtrl', ["$scope", "$uibModalInstance", "patientInfoHttp", function($scope, $uibModalInstance, patientInfoHttp) {
    $scope.selected_schedule = null;
    $scope.cur_now = new Date();
    $scope.now = new Date();
    $scope.get_data = function() {
        patientInfoHttp.get_schedules_data({ time: $scope.now.Format("yyyy-MM-dd") }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.data = result.schedules;
            angular.forEach($scope.data, function(data, index, array) {
                data.time = new Date(data.time);
                if ($scope.cur_now.getTime() - data.time.getTime() < (15 * 60 * 1000)) { // 未过期
                    data.expired = false;
                } else { // 过期
                    data.expired = true;
                }
            });
        });
    }
    $scope.get_data();
    $scope.change_day = function(param) {
        if (param == 'last') {
            $scope.now = $scope.now.AddDay(-1);
            $scope.get_data();
        } else if (param == 'next') {
            $scope.now = $scope.now.AddDay(1);
            $scope.get_data();
        }
    }

    $scope.btn_style = function(schedule) {
        var result = {};
        if (schedule.expired) {
            result.backgroundColor = '#bfbfbf';
        }
        if (schedule.selected) {
            result.backgroundColor = '#2cbae6';
            result.borderColor = '#e6e6e6';
        }
        return result;
    }
    $scope.schedule_selected = function(schedule) {
        if (schedule.expired)
            return;
        angular.forEach($scope.data, function(data, index, array) {
            delete data.selected;
        });
        $scope.selected_schedule = schedule;
        schedule.selected = true;
        console.log(schedule);
    }
    $scope.ok = function() {
        if ($scope.selected_schedule) {
            $uibModalInstance.close($scope.selected_schedule);
        }
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
}]);

controllers.controller('matchDiagOrderCtrl', ["$scope", "$uibModalInstance", "orderHttp", "cur_patient", function($scope, $uibModalInstance, orderHttp, cur_patient) {
    console.log(cur_patient);
    $scope.form_data = cur_patient;
    $scope.now = new Date();
    $scope.selected_order = { order_code: undefined };
    $scope.selected_obj = null;
    $scope.patient_name = "";
    $scope.orders = [];
    $scope.error_msg = "";
    var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var format = function(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    $scope.get_page_data = function() {
        orderHttp.get_page_data({ time: format($scope.now), page_size: 50, patient_name: $scope.patient_name }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.orders = result.row_arr;
            var date = new Date(result.time);
            $scope.day_zh = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日  " + weekdays[date.getDay()]; //中文日期
        });
    }
    $scope.change_day = function(param) {
        if (param == 'last') {
            $scope.now = new Date(($scope.now.getTime()) - 1000 * 60 * 60 * 24);
            $scope.get_page_data();
        } else if (param == 'next') {
            $scope.now = new Date(($scope.now.getTime()) + 1000 * 60 * 60 * 24);
            $scope.get_page_data();
        }
    }
    $scope.set_selected_obj = function(obj) {
        $scope.selected_obj = obj;
        if ($scope.selected_obj.patient_name != $scope.form_data.patient_name) {
            $scope.error_msg = "注意: 检查信息与订单信息有冲突,患者姓名不一致";
        } else if ($scope.selected_obj.project_name != $scope.form_data.project.name) {
            $scope.error_msg = "注意: 检查信息与订单信息有冲突,检查项目名不一致";
        } else {
            $scope.error_msg = "";
        }
    }
    $scope.valid = function() {
        result = true;
        if (!$scope.selected_order.order_code) {
            return false;
        }
        if ($scope.selected_order.order_code == "无匹配项") {
            return true;
        }
        return result;
    }
    var arr = [];
    $(cur_patient.tmp_bodies).each(function(i, e) {
        arr.push(e.name);
    });
    $scope.form_data.bodies_str = arr.join(',');
    $scope.get_page_data();
    $scope.ok = function() {
        if (!$scope.valid()) {
            return;
        }
        $uibModalInstance.close($scope.selected_order);
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
}]);

// 检查迟到
controllers.controller('patientLateCtrl', ['$scope', '$timeout', 'patientInfoHttp', '$uibModal', '$state', '$stateParams', function($scope, $timeout, patientInfoHttp, $uibModal, $state, $stateParams) {
    $scope.patient_name = "";
    $scope.current_date = null;
    if (!$stateParams.current_date) {
        $scope.current_date = new Date();
    } else {
        $scope.current_date = new Date($stateParams.current_date);
    }
    $scope.data_arr = [];
    $scope.next_day = function() {
        $scope.current_date = $scope.current_date.AddDay(1);
        $scope.reload_data();
    };
    $scope.previous_day = function() {
        $scope.current_date = $scope.current_date.AddDay(-1);
        $scope.reload_data();
    };
    // 重新加载数据
    $scope.reload_data = function() {
        patientInfoHttp.get_late_data({
            date: $scope.current_date,
            patient_name: $scope.patient_name
        }, function(result) {
            $scope.data_arr = result.data_arr;
        });
    };
    // 搜索患者
    $scope.search_patient = function() {
        $scope.reload_data();
    };
    $scope.search_keydown = function($event) {
        if ($event.keyCode === 13) {
            $scope.search_patient();
        }
    };

    // 修改预约检查
    $scope.re_appointment_at = function(patient_info) {
        if (patient_info.id == '' && patient_info.order_code == '') {
            return;
        }
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'set_schedule.html',
            controller: 'setScheduleCtrl',
            windowClass: 'app-modal-window',
            resolve: {}
        });
        modalInstance.result.then(function(params) {
            $scope.re_appointment_at_action({
                id: patient_info.id,
                order_code: patient_info.order_code,
                appointment_at: params.time
            });
        }, function() {});
    };
    // 修改预约检查后台调用
    $scope.re_appointment_at_action = function(params) {
        patientInfoHttp.re_appointment_at(params, function(result) {
            if (result.success) {
                $scope.reload_data();
            }
        });
    };

    // 查看详情
    $scope.show_info = function(patient_info) {
        if (patient_info.id == '') {
            return;
        }
        $state.go('newPatientInfo', { id: patient_info.id });
    };
    // 取消检查
    $scope.cancel_examine = function(patient_info) {
        if (patient_info.id == '' && patient_info.order_code == '') {
            return;
        }
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'cancel.html',
            controller: 'cancelExamineCtrl',
            size: 'sm',
            resolve: {
                params: {
                    id: patient_info.id,
                    order_code: patient_info.order_code
                }
            }
        });
        modalInstance.result.then(function(params) {
            $scope.cancel_examine_action(params);
        }, function() {
            console.log('窗口关闭 at: ' + new Date());
        });
    };
    $scope.cancel_examine_action = function(params) {
        patientInfoHttp.cancel_examine({
            id: params.id,
            order_code: params.order_code,
            reason: params.cancel_reason
        }, function(result) {
            if (result.success) {
                $scope.reload_data();
            }
        });
    }
    $scope.reload_data();
}]);