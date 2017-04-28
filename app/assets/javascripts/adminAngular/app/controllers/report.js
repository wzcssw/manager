// 检查迟到
controllers.controller('reportCtrl', ['$scope', 'reportHttp', '$uibModal', '$state', '$stateParams', '$location', '$timeout', function($scope, reportHttp, $uibModal, $state, $stateParams, $location, $timeout) {
    $scope.keyword = "";
    $scope.current_date = null;
    $scope.page_size = 20;
    if (!$stateParams.current_date) {
        $scope.current_date = new Date();
    } else {
        $scope.current_date = new Date($stateParams.current_date);
    }
    // $scope.begin_date = (new Date()).AtBegin().Format("yyyy-MM-dd hh:mm");
    // $scope.end_date = (new Date()).AtEnd().Format("yyyy-MM-dd hh:mm");
    $scope.hospital_arr = [];
    $scope.hospital = null;
    $scope.data = {
        current_page: 1,
        row_arr: [],
        all_page: 0,
        row_count: 0
    };
    $scope.init_data = function() {
        reportHttp.get_index_init_data(function(result) {
            $scope.hospital_arr = result.hospital_arr;
            $scope.hospital_arr.unshift({ name: '全部医院', id: '' })
            $scope.hospital = $scope.hospital_arr[0];
            $scope.reload_data();
        });
    };
    $scope.next_day = function() {
        $scope.current_date = $scope.current_date.AddDay(1);
        $scope.reload_data();
    };
    $scope.previous_day = function() {
        $scope.current_date = $scope.current_date.AddDay(-1);
        $scope.reload_data();
    };
    $scope.change_hospital = function() {
        $scope.reload_data();
    };
    // 重新加载数据
    $scope.reload_data = function() {
        $scope.data.current_page = 1;
        $scope.page_change();
    };
    $scope.page_change = function() {
        reportHttp.get_data({
            hospital_id: $scope.hospital.id,
            current_date: $scope.current_date,
            keyword: $scope.keyword,
            page: $scope.data.current_page,
            page_size: $scope.page_size
        }, function(result) {
            $scope.data = result;
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
    $scope.get_report_state_desc = function(report_state_use) {
        if (report_state_use == null) {
            return "未保存";
        }
        if (report_state_use.state == "default") {
            return "未审核";
        } else if (report_state_use.state == "checking") {
            return "审核中";
        } else if (report_state_use.state == "unpass") {
            return "未通过审核";
        } else if (report_state_use.state == "pass") {
            return "已审核";
        }
    };
    // 填写报告按钮描述
    $scope.get_write_report_desc = function(report) {
        if ($scope.is_full_report(report)) {
            return "看报告";
        } else {
            return "写报告";
        }
    };
    // 填写报告按钮颜色
    $scope.get_write_report_corlor = function(report) {
        if ($scope.is_full_report(report)) {
            var tmp_state = report.report_state_use;
            if (tmp_state == null) {
                return "nowrite";
            } else {
                return tmp_state.state;
            }
        } else {
            return "nowrite";
        }
    };
    // 是否可以打印
    $scope.can_print = function(report) {
        if ($scope.is_full_report(report)) {
            var tmp_state = report.report_state_use;
            if (tmp_state == null) {
                return false;
            } else {
                if (tmp_state.state == "pass") {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    };
    // 是否填好了report
    $scope.is_full_report = function(param) {
        var result = true;
        if (param) {
            if (param.expression == null || param.expression == "" || param.diagnose == null || param.diagnose == "" || param.check_technique == null || param.check_technique == "") {
                result = false;
            }
        } else {
            result = false;
        }
        return result;
    };
    // 接收远程通知
    $scope.report_cable = App.cable.subscriptions.create("ReportChannel", {
        connected: function() {},
        disconnected: function() {},
        received: function(result) {
            $timeout(function() {
                // $scope.msg_list.push(result.patient_info);
                $scope.reload_data();
            });
        }
    });
    $scope.go = function(data) {
        if ($scope.is_full_report(data.report)) {
            swal({
                title: '您确定打印吗？',
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true
            }, function(isConfirm) {
                if (isConfirm) {
                    newWin("/report?patient_info_id=" + data.id, "print_report");
                }
            });
        }
    };
    $scope.init_data();
}]);

controllers.controller('editReportCtrl', ['$scope', '$uibModal', '$state', '$stateParams', 'reportHttp', '$window', '$rootScope', function($scope, $uibModal, $state, $stateParams, reportHttp, $window, $rootScope) {
    $scope.window = $window;
    $scope.report = {};
    $scope.report_state = null;
    $scope.patient_id = $stateParams.id;
    $scope.tech_arr = [];
    $scope.window.is_report_changed = false;
    $scope.dataForTheTree = [];
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (fromState.url === "/report/:id" && $scope.window.is_report_changed) {
            if (!window.confirm("系统可能不会保存您所做的更改。")) {
                event.preventDefault();
            } else {
                $scope.window.is_report_changed = false;
            }
        }
    });
    // 加载数据
    $scope.reload_data = function() {
        reportHttp.get_report({ patient_info_id: $scope.patient_id }, function(data) {
            if (!data.success) {
                return;
            }
            $scope.report = data.report;
            $scope.report_state = data.report_state;
            $scope.hospital = data.hospital;
            $scope.patient_info = data.patient_info;
            $scope.current_role = data.current_role;
            $scope.current_user = data.current_user;
            $scope.report.report_at = new Date();
            if (data.report.check_technique && data.report.check_technique != null && data.report.check_technique != '') {
                $scope.make_tech_arr_from_techstr();
            }
            if (data.report.is_first_save == 0) {
                $scope.report.check_technique = data.default_tech_arr.join(" ");
                $scope.make_tech_arr_from_techstr();
            }
            $scope.$watch('report', function(newVal, oldVal) { // 监视用户是否修改
                if ((newVal.expression === oldVal.expression && newVal.diagnose === oldVal.diagnose) || oldVal == null)
                    return;
                $scope.window.is_report_changed = true;
            }, true);
            $scope.reload_template_tree();
        });
    };
    $scope.reload_template_tree = function() {
        reportHttp.get_report_templates({}, function(data) { // 加载诊断模板数据
            $scope.dataForTheTree = data.data;
        });
    };
    $scope.make_tech_arr_from_techstr = function() {
        $scope.report.check_technique = $scope.report.check_technique.trim();
        if ($scope.report.check_technique != "") {
            $scope.tech_arr = $scope.report.check_technique.split(' ');
        }
    };
    $scope.make_techstr_from_tech_arr = function() {
        if ($scope.tech_arr.length != 0) {
            $scope.report.check_technique = $scope.tech_arr.join(' ');
            $scope.report.check_technique = $scope.report.check_technique.trim();
        }
    };
    $scope.remove_tech = function(index) {
        $scope.tech_arr.splice(index, 1);
        $scope.window.is_report_changed = true;
    };
    $scope.open_check_technique_modal = function() {
        // $scope.report.check_technique = $scope.report.check_technique || "";
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'check_technique.html',
            controller: 'checkTechniqueCtrl',
            size: 'md'
        });
        modalInstance.result.then(function(params) {
            $scope.tech_arr.push(params.join('-'));
            // $scope.generate_tech_block(params.join());
            $scope.window.is_report_changed = true;
        }, function() {
            console.log('窗口关闭 at: ' + new Date());
        });
    };
    // 保存数据
    $scope.save = function() {
        if (!$scope.window.is_report_changed) {
            return;
        }
        // 整理检查技术
        $scope.make_techstr_from_tech_arr();
        reportHttp.save({
            id: $scope.report.id,
            report_at: $scope.report.report_at,
            expression: $scope.report.expression,
            check_technique: $scope.report.check_technique,
            diagnose: $scope.report.diagnose
        }, function(data) {
            $scope.window.is_report_changed = false;
            if (data.success) {
                swal({
                    title: "保存成功",
                    type: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                $scope.reload_data();
            }
        });
    };
    // 修改报告状态
    $scope.change_report_state = function(state) {
        var msg = null;
        var result_msg = null;
        if (state == "checking") {
            msg = "确定提交审核吗？";
            result_msg = "提交审核成功";
        } else
        if (state == "pass") {
            msg = "确定通过审核吗？"
            result_msg = "通过审核成功";
        } else if (state == "unpass") {
            msg = "确定不通过审核吗？"
            result_msg = "不通过审核成功";
        }
        if (msg == null) {
            return;
        }
        warn_confirm({
            title: "确认",
            text: msg,
            sure_func: function() {
                reportHttp.change_report_state({
                    id: $scope.report.id,
                    state: state
                }, function(data) {
                    if (data.success) {
                        swal({
                            title: result_msg,
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        $scope.reload_data();
                    }
                });
            }
        });
    };
    // 控制按钮显示隐藏
    $scope.can_btn_show = function(btn_name) {
        var no_state = ($scope.report_state == null);
        var tmp_state = "";
        if (!no_state) {
            tmp_state = $scope.report_state.state;
        }
        if (!$scope.current_role) {
            return false;
        }
        if (btn_name == "save") {
            if ($scope.current_role.code == "read_doctor") {
                if (tmp_state == "checking" || tmp_state == "pass") {
                    return false;
                } else {
                    return true;
                }
            } else if ($scope.current_role.code == "check_doctor") {
                if (no_state) {
                    // if ($scope.report.save_user_id == null || $scope.current_user.id == $scope.report.save_user_id) {
                    //     return true;
                    // } else {
                    //     return false;
                    // }
                    return true;
                } else {
                    if (tmp_state == "checking" || tmp_state == "pass") {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        } else if (btn_name == "go_check") {
            if ($scope.current_role.code == "read_doctor") {
                if ((no_state || tmp_state == "unpass") && $scope.report.is_first_save == 1 && $scope.is_full_report()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if (btn_name == "in_checking") {
            if ($scope.current_role.code == "read_doctor" && tmp_state == "checking") {
                return true;
            } else {
                return false;
            }
        } else if (btn_name == "go_pass" || btn_name == "go_unpass") {
            if ($scope.current_role.code == "check_doctor" && tmp_state == "checking") {
                return true;
            } else {
                return false;
            }
        } else if (btn_name == "go_print") {
            if (tmp_state == "pass") {
                return true;
            } else {
                return false;
            }
        }
    };
    // 是否填好诊断结果
    $scope.is_full_report = function() { //验证是否可打印（是否有空字段）
        var result = false;
        var expression = $scope.report.expression;
        var diagnose = $scope.report.diagnose;
        if (expression != "" && expression != null && expression != undefined && diagnose != "" && diagnose != null && diagnose != undefined) {
            result = true;
        }
        return result;
    };
    // 保存并打印
    $scope.print = function(patient_info_id) {
        if (!$scope.can_btn_show("go_print"))
            return;
        // 整理检查技术
        reportHttp.print_report({
            id: $scope.report.id
        }, function(data) {
            $scope.window.is_report_changed = false;
            if (data.success) {
                $(".confirm").show();
                swal({
                    title: '您确定打印吗？',
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    closeOnConfirm: true
                }, function(isConfirm) {
                    if (isConfirm) {
                        newWin("/report?patient_info_id=" + patient_info_id, "print_report");
                    }
                });
            } else {
                alert(保存失败);
            }
        });
    }
    $scope.toggle = function(scope) {
        scope.toggle();
    };
    // 是否编辑模式
    $scope.is_symptom_edit = false;
    // 修改诊断模板编辑模式
    $scope.change_mode = function(flag, $event) {
        $event.stopPropagation();
        $scope.is_symptom_edit = flag;
    };
    // 覆盖报告
    $scope.set_symptom = function(symptom) {
        $scope.report.expression = symptom.expression;
        $scope.report.diagnose = symptom.diagnose;
    };
    // 添加
    $scope.add_symptom = function(node_type, $event, parent_node) {
        // 阻止事件冒泡
        $event.stopPropagation();
        var tmp_symptom = { id: '', parent_id: '', name: '', expression: '', diagnose: '', is_symptom: false };
        if (node_type == "level1") {
            tmp_symptom.parent_id = "";
        } else if (node_type == "level2") {
            tmp_symptom.parent_id = parent_node.id;
        } else if (node_type == "level3") {
            tmp_symptom.parent_id = parent_node.id;
            tmp_symptom.is_symptom = true;
        }
        $scope.show_form(tmp_symptom, parent_node);
    };
    // 编辑摸吧
    $scope.edit_symptom = function(symptom, $event) {
        // 阻止事件冒泡
        if ($event) {
            $event.stopPropagation();
        }
        $scope.show_form(symptom);
    };
    // 显示弹出表单
    $scope.show_form = function(symptom, parent_node) {
        var modalEditSymptom = $uibModal.open({
            animation: true,
            templateUrl: 'edit_symptom.html',
            controller: 'editSymptomCtrl',
            windowClass: 'app-modal-window-md',
            resolve: {
                params: {
                    node: symptom,
                    parent_scope: $scope,
                    parent_node: parent_node
                }
            }
        });
        modalEditSymptom.result.then(function(cus_report_template) {}, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    // 保存为模板
    $scope.target_node = null;
    $scope.save_to_symptom = function() {
        var modalSelectParent = $uibModal.open({
            animation: true,
            templateUrl: 'select_parent.html',
            controller: 'selectParentCtrl',
            windowClass: 'app-modal-window-md',
            resolve: {}
        });
        modalSelectParent.result.then(function(parent_node) {
            var tmp_symptom = {
                id: '',
                parent_id: parent_node.id,
                name: 'XX新建XX',
                expression: $scope.report.expression,
                diagnose: $scope.report.diagnose,
                is_symptom: true
            };
            $scope.target_node = null;
            $scope.find_node_in_tree(parent_node.id);
            $scope.save_symptom(tmp_symptom, $scope.target_node);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    $scope.find_node_in_tree = function(id) {
        $scope.dataForTheTree.forEach(function(item) {
            $scope.find_node_in_tree_by_parent(id, item);
            if ($scope.target_node != null) {
                return;
            }
        });
    };
    $scope.find_node_in_tree_by_parent = function(id, node) {
        if (id == node.id) {
            $scope.target_node = node;
            return;
        } else {
            if (node.children) {
                node.children.forEach(function(item) {
                    $scope.find_node_in_tree_by_parent(id, item);
                });
            }
        }
    };
    // 保存
    $scope.save_symptom = function(cus_report_template, parent_node) {
        var tmp_cus_report_template = angular.copy(cus_report_template);
        delete tmp_cus_report_template.children
        reportHttp.save_cus_report_template(
            tmp_cus_report_template,
            function(data) { // 加载诊断模板详情数据
                if (cus_report_template.id == "") {
                    // 新增
                    if (parent_node && parent_node != null) {
                        if (!parent_node.children) {
                            parent_node.children = [];
                        }
                        parent_node.children.push(data.cus_report_template);
                    } else {
                        $scope.dataForTheTree.push(data.cus_report_template);
                    }
                } else {
                    // 修改
                }
                swal({
                    title: "成功",
                    text: "保存成功",
                    timer: 1700,
                    showConfirmButton: false
                });
            },
            function(error) {
                swal({
                    title: error.msg,
                    type: "error"
                });
            }
        );
    };
    // 追加
    $scope.append_symptom = function(symptom, $event) {
        // 阻止事件冒泡
        if ($event) {
            $event.stopPropagation();
        }
        if ($scope.report.expression == null) {
            $scope.report.expression = symptom.expression;
        } else {
            $scope.report.expression = ($scope.report.expression + '\n' + symptom.expression);
        }
        if ($scope.report.diagnose == null) {
            $scope.report.diagnose = symptom.diagnose;
        } else {
            $scope.report.diagnose = ($scope.report.diagnose + '\n' + symptom.diagnose);
        }
    };
    // 删除分类
    $scope.del_symptom = function(symptom, $event) {
        warn_confirm({
            title: "删除",
            text: "确定要删除自定义检查模板?",
            sure_func: function() {
                reportHttp.delete_cus_report_template({ id: symptom.id },
                    function(result) {
                        $scope.reload_template_tree();
                        swal({
                            title: "成功",
                            text: "删除成功",
                            timer: 1700,
                            showConfirmButton: false
                        });
                    }
                );
            }
        });
    };
    $scope.treeOptions = {
        accept: function(sourceNodeScope, destNodesScope, destIndex) {
            return true;
        },
        dropped: function(e) {
            $scope.save_tree_parent_sort();
        }
    };
    // 保存树的父节点和排序
    $scope.save_tree_parent_sort = function() {
        var node_arr = $scope.get_all_tree_sort_arr();
        reportHttp.save_cus_report_template_sort({
            node_arr: node_arr.join(';')
        }, function(result) {});
    };
    $scope.get_all_tree_sort_arr = function() {
        var node_arr = [];
        $scope.dataForTheTree.forEach(function(item) {
            $scope.get_node_sort_arr(item, null, node_arr);
        });
        return node_arr;
    };
    $scope.get_node_sort_arr = function(node, parent_node, node_arr) {
        node_arr.push(node.id + "," + (parent_node != null ? parent_node.id : ""));
        if (node.children) {
            node.children.forEach(function(item) {
                $scope.get_node_sort_arr(item, node, node_arr);
            });
        }
    };
    $scope.go_back = function() {
        $state.go('report');
    };
    $scope.reload_data();
}]);


controllers.controller('editSymptomCtrl', ["$scope", "$uibModalInstance", "reportHttp", "params", function($scope, $uibModalInstance, reportHttp, params) {
    $scope.node = params.node;
    $scope.raw_dt = angular.copy($scope.node);
    $scope.node_type = "";
    $scope.is_edit = params.node.id == '' ? true : false;
    $scope.get_node_type = function() {
        if ($scope.node.parent_id == null || $scope.node.parent_id == "") {
            return "部位"
        } else {
            if ($scope.node.is_symptom) {
                return "症状"
            } else {
                return "症状类型"
            }
        }
    };
    $scope.node_type = $scope.get_node_type();
    $scope.is_content_change = function() {
        if ($scope.node.expression == $scope.raw_dt.expression && $scope.node.diagnose == $scope.raw_dt.diagnose) {
            return false;
        } else {
            return true;
        }
    }
    $scope.can_save = function() {
        if ($scope.is_symptom) {
            if ($scope.node.name.trim() == '' || $scope.node.expression.trim() == '' || $scope.node.diagnose.trim() == '') {
                return false;
            } else {
                return true;
            }
        } else {
            if ($scope.node.name.trim() == '') {
                return false;
            } else {
                return true;
            }
        }
    };
    $scope.append = function() {
        params.parent_scope.append_symptom($scope.node);
        $uibModalInstance.close($scope.node);
    };
    $scope.replace = function() {
        params.parent_scope.set_symptom($scope.node);
        $uibModalInstance.close($scope.node);
    };
    $scope.edit = function() {
        $scope.is_edit = true;
    };
    $scope.ok = function() {
        // $uibModalInstance.close($scope.node);
        params.parent_scope.save_symptom($scope.node, params.parent_node);
        $scope.is_edit = false;
    };
    $scope.cancel = function() {
        if (params.node.id == '') {
            $uibModalInstance.dismiss('cancel');
        }
        // $uibModalInstance.dismiss('cancel');
        $scope.is_edit = false;
    };
    $scope.close_win = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);

controllers.controller('selectParentCtrl', ["$scope", "$uibModalInstance", "reportHttp", function($scope, $uibModalInstance, reportHttp) {
    $scope.selected_node = null;
    $scope.reload_tree = function() {
        reportHttp.get_dir_report_templates({}, function(data) { // 加载诊断模板数据
            $scope.data_tree = data.data;
        });
    };
    $scope.set_cur_node = function(node) {
        $scope.selected_node = node;
    };
    $scope.ok = function() {
        if ($scope.selected_node == null) {
            swal("错误!", "请先选择上级节点!", "error");
            return;
        }
        $uibModalInstance.close($scope.selected_node);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.reload_tree();
}]);

controllers.controller('checkTechniqueCtrl', ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
    $scope.cts = {};
    $scope.cts.cate_1 = "";
    $scope.cts.cate_2 = "";
    $scope.cts.cate_3 = "";
    $scope.cts.cate_4 = "";
    $scope.result_arr = [];

    $scope.cts_arr = [{
        name: "序列名称",
        children: ["SE", "TSE", "FLASH", "EPI", "TIRM", "FL2D", "FL3D", "CISS", "HASTE", "SPAIR"]
    }, {
        name: "扫描方位",
        children: ["SAG", "TRA", "COR", "MSMA", "VIBE", "BH"]
    }, {
        name: "图像权重",
        children: ["T1WI", "T2WI", "FLAIR", "FS", "DWI", "SWI"]
    }, {
        name: "3D/2D",
        children: ["3D", "2D"]
    }];

    $scope.find_sel_index = function(cts) {
        var tmp_i_cts = $scope.result_arr.findIndex(function(item) {
            if (item == cts) {
                return true;
            }
        });
        return tmp_i_cts;
    };

    $scope.is_select = function(cts) {
        var tmp_i_cts = $scope.find_sel_index(cts);
        if (tmp_i_cts > -1) {
            return true;
        } else {
            return false;
        }
    };

    $scope.add_selected = function(cts) {
        var tmp_i_cts = $scope.find_sel_index(cts);
        if (tmp_i_cts == -1) {
            $scope.result_arr.push(cts);
        } else {
            $scope.result_arr.splice(tmp_i_cts, 1);
        }
    };

    $scope.$watch('cts', function(newValue, oldValue) {
        $scope.result_arr = [];
        for (attribute in newValue) {
            var tmp = newValue[attribute];
            if (tmp != "") {
                $scope.result_arr.push(tmp);
            }
        }
    }, true);

    $scope.ok = function() {
        if ($scope.result_arr.length > 0) {
            $uibModalInstance.close($scope.result_arr);
        }
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);