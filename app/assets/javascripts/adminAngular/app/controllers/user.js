// 用户管理
controllers.controller('userCtrl', ['$scope', '$timeout', 'get_params', 'userHttp', 'roleHttp', '$uibModal', function($scope, $timeout, get_params, userHttp, roleHttp, $uibModal) {
    $scope.maxSize = 5;
    $scope.data_row = {
        current_page: 1,
        row_arr: [],
        all_page: 0,
        total_count: 0,
        total_pages: 1,
        page_size: 12
    };
    $scope.get_page_data = function() {
        userHttp.get_page_data({
            page: $scope.data_row.current_page,
            page_size: $scope.data_row.page_size,
            role_id: $scope.role_id,
            q: $scope.q
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.data_row.row_arr = result.row_arr;
            $scope.data_row.current_page = result.current_page;
            $scope.data_row.total_count = result.total_count;
        });
    }
    $scope.pageChanged = function() {
        userHttp.get_page_data({
            page: $scope.data_row.current_page,
            page_size: $scope.data_row.page_size,
            role_id: $scope.role_id,
            q: $scope.q
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.data_row.row_arr = result.row_arr;
            $scope.data_row.current_page = result.current_page;
            $scope.data_row.total_count = result.total_count;
        });
    }
    $scope.edit_user = function(title, row) {
        var edit_user_modal = $uibModal.open({
            animation: true,
            templateUrl: 'edit_user.html',
            controller: 'editUserCtl',
            size: 'md',
            resolve: {
                data: { title: title, row: row }
            }
        });
        edit_user_modal.result.then(function(params) {
            $scope.save(params);
        });
    }
    $scope.save = function(params) {
        if (params.hospital) {
            params.hospital_id = params.hospital.id;
        }
        params.role_id = params.role.id;
        // delete params.hospital;
        // delete params.role;
        userHttp.save({ user: JSON.stringify(params) }, function(data) {
            $(".confirm").hide();
            if (data.success) {
                swal({
                    title: "保存成功",
                    type: "success",
                });
                setTimeout(function() {
                    $(".confirm").click();
                }, 1700);
            }
            $scope.get_page_data();
        });
    }
    $scope.change_state = function(row) {
        var tmp_str = (row.is_delete ? '启用' : '禁用');
        warn_confirm({
            title: tmp_str,
            text: "确定" + tmp_str + "该用户吗？",
            sure_func: function() {
                userHttp.change_state({ id: row.id, is_delete: !row.is_delete }, function(result) {
                    if (!result.success) {
                        return;
                    }
                    $scope.get_page_data();
                });
            }
        });
    }
    $scope.init_data = function() {
        roleHttp.get_page_data({
            page_size: 999
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.roles = result.row_arr
        });
    }
    $scope.init_data();
    $scope.get_page_data();
}]);

controllers.controller('editUserCtl', ["$scope", "$uibModalInstance", "data", "userHttp", "hospitalHttp", "roleHttp", function($scope, $uibModalInstance, data, userHttp, hospitalHttp, roleHttp) {
    if (data.row == undefined || data.row == null) {
        data.row = { realname: "", name: "", phone: "", password: "" }
    }
    $scope.data = data.row;
    $scope.title = data.title;
    $scope.has_err = false;
    $scope.valid_edit_user = function() { // 验证
        var result = true;
        var emp = /\S/;
        var phone = /^1\d{10}$/;
        if (!$scope.data.role) {
            $scope.err_msg = "请选择角色";
            result = false;
        }
        if ($scope.title == '添加账号') {
            if (!emp.test($scope.data.password)) {
                $scope.err_msg = "密码不能为空";
                result = false;
            }
        }
        if (!phone.test($scope.data.phone)) {
            $scope.err_msg = "请输入正确的手机号";
            result = false;
        }
        if (!emp.test($scope.data.realname)) {
            $scope.err_msg = "真实姓名不能为空";
            result = false;
        }
        if (!emp.test($scope.data.name)) {
            $scope.err_msg = "账户名不能为空";
            result = false;
        }
        return result;
    }
    $scope.can_dh_show = function() {
        if ($scope.data.role.name == "阅片医生" || $scope.data.role.name == "审核医生") {
            return true;
        }
        return false;
    };
    $scope.init_data = function() {
        userHttp.get_form_init_data({
            user_id: ($scope.data.id ? $scope.data.id : "")
        }, function(result) {
            $scope.hospitals = result.hospital_arr;
            $scope.data.manage_hospitals = $scope.hospitals;
            $scope.roles = result.role_arr;
            $scope.doctor_hospitals = result.doctor_hospitals;
            $scope.hospitals.forEach(function(h) {
                h.is_checked = false;
                var tmp_dh = $scope.doctor_hospitals.find(function(dh) {
                    if (h.id == dh.hospital_id) {
                        return true;
                    }
                });
                if (tmp_dh) {
                    h.is_checked = true;
                }
            })
        });
    };
    $scope.ok = function() {
        if ($scope.valid_edit_user()) {
            $uibModalInstance.close($scope.data);
        } else {
            $scope.has_err = true;
        }
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.init_data();
}]);