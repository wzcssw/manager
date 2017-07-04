// 会诊中心人员管理
controllers.controller('consultationCtrl', ['$scope',  'consultationHttp', '$uibModal', function($scope, consultationHttp, $uibModal) {
    $scope.maxSize = 5;
    $scope.city_arr = [];
    $scope.search_hospital = "";
    $scope.search_realname = "";
    $scope.data_row = {
        current_page:1,
        row_arr:[],
        all_page:0,
        row_count:0,
        page_size:10
    };
    $scope.get_page_data = function() {
        consultationHttp.get_page_data({
            page: $scope.data_row.current_page,
            page_size: $scope.data_row.page_size,
            search_hospital: $scope.search_hospital.id,
            search_realname:  $scope.search_realname,
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.data_row.row_arr = result.row_arr;
            $scope.data_row.current_page = result.current_page;
            $scope.data_row.row_count = result.row_count;
        });
    };
    // 添加或编辑Meeting
    $scope.add_or_edit_consultation = function (row) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add_or_edit_consultation.html',
            controller: 'addOrEditConsultationCtrl',
            windowClass: 'app-modal-window',
            resolve: {
                params: row
            }
        });
        modalInstance.result.then(function(params) {
            $scope.save(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    // 添加或编辑角色
    $scope.add_or_edit_cc_role = function(row){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'cc_role_form.html',
            controller: 'ccRoleFormCtrl',
            size: 'md',
            // windowClass: 'app-modal-window',
            resolve: {
                params: row
            }
        });
        modalInstance.result.then(function(params) {
            // $scope.save_dc_user(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    // 修改用户状态
    $scope.change_state = function(row) {
        var tmp_str = (row.is_use ? '禁用' : '启用');
        $(".confirm").show();
        warn_confirm({
            title: tmp_str,
            text: "确定" + tmp_str + "该用户吗？",
            sure_func: function() {
                consultationHttp.change_state({ id: row.id }, function(result) {
                    if (!result.success) {
                        return;
                    }
                    $scope.get_page_data();
                });
            }
        });
    }
    // 保存User
    $scope.save = function(params){
        params.cc_role_id = params.role.id;
        params.consultation_center_id = params.consultation_center.id;
        consultationHttp.save(params, function(result) {
          if(result.success) {
            $(".confirm").hide();
            swal({
                title: "保存成功",
                type: "success",
            });
            setTimeout(function() {
                $(".confirm").click();
            }, 1700);
          } else {
              return;
          }
          $scope.get_page_data();
        },function(result){
            $(".confirm").hide();
            swal({
                title: "保存失败",
                type: "error",
            });
            setTimeout(function() {
                $(".confirm").click();
            }, 1700);
        });
    };
    $scope.get_page_data();
}]);

// 添加编辑Consultation
controllers.controller('addOrEditConsultationCtrl', ["$scope", "$uibModalInstance", "params","consultationHttp", function($scope, $uibModalInstance, params,consultationHttp) {
    $scope.data = params;
    $scope.hospitals = [];
    $scope.roles = [];
    $scope.consultation_centers = [];
    params == undefined ? $scope.title = '添加' : $scope.title = '编辑';
    if(params == undefined){
        $scope.data = {};
    }else{
        $scope.data.role = params.cc_role;
        $scope.data.consultation_center = params.consultation_center;
    };
    $scope.init = function () {
        consultationHttp.get_roles({ page: 1, page_size: 999 }, function(result) {
            if (!result.success)
                return;
            $scope.roles = result.row_arr;
        });
        consultationHttp.get_consultations({ page: 1, page_size: 999 }, function(result) {
            if (!result.success)
                return;
            $scope.consultation_centers = result.row_arr;
        });
    }
    $scope.ok = function() {
        if ($scope.data.username == undefined || $scope.data.username.trim() == "") {
            alert("账户名不能为空");
            return;
        }
        if ($scope.data.realname == undefined || $scope.data.realname.trim() == "") {
            alert("真实姓名不能为空");
            return;
        }
        if ($scope.data.consultation_center == undefined || $scope.data.consultation_center == null) {
            alert("会诊中心不能为空");
            return;
        }
        if ($scope.data.role == undefined || $scope.data.role == null) {
            alert("角色不能为空");
            return;
        }
        if ($scope.data.phone == undefined || $scope.data.phone.trim() == "") {
            alert("电话不能为空");
            return;
        }
        if($scope.title == '添加'){
            if ($scope.data.password == undefined || $scope.data.password.trim() == "") {
                alert("密码不能为空");
                return;
            }
        }
        $uibModalInstance.close($scope.data);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init();
}]);


// 角色
controllers.controller('ccRoleFormCtrl', ["$scope", "$uibModalInstance", "params","consultationHttp",'$uibModal', function($scope, $uibModalInstance, params,consultationHttp,$uibModal) {
    $scope.data = params;
    $scope.roles = [];
    $scope.get_page_data = function(){
        consultationHttp.get_roles({ page: 1, page_size: 9999 }, function(result) { // 载入角色
            if (!result.success)
                return;
            $scope.roles = result.row_arr;
        });
    }
    $scope.add_or_edit_cc_role = function(row){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add_or_edit_cc_role_form.html',
            controller: 'addOrEditCcRoleCtrl',
            windowClass: 'app-modal-window-sm',
            resolve: {
                params: row
            }
        });
        modalInstance.result.then(function(params) {
            $scope.save_role(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    // 保存角色
    $scope.save_role = function(params){
        consultationHttp.save_role(params, function(result) {
          if(result.success) {
            $(".confirm").hide();
            swal({
                title: "保存成功",
                type: "success",
            });
            setTimeout(function() {
                $(".confirm").click();
            }, 1700);
          } else {
              return;
          }
          $scope.get_page_data();
        });
    }
    $scope.get_page_data();
}]);


// 编辑角色form
controllers.controller('addOrEditCcRoleCtrl', ["$scope", "$uibModalInstance", "params", function($scope, $uibModalInstance, params) {
    params == undefined ? $scope.title = '添加' : $scope.title = '编辑';
    $scope.role = {};
    if(params != undefined){
        $scope.role = params;
    }
    $scope.ok = function() {
        $uibModalInstance.close($scope.role);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);