controllers.controller('diagnoseCentersManagerCtrl', ['$scope',  'diagnoseCenterManagersHttp','diagnoseCentersHttp', '$uibModal', function($scope, diagnoseCenterManagersHttp,  diagnoseCentersHttp,$uibModal) {
    $scope.maxSize = 5;
    $scope.city_arr = [];
    $scope.diagnose_centers = [];
    $scope.search_diagnose_center = "";
    $scope.search_realname = "";
    $scope.data_row = {
        current_page:1,
        row_arr:[],
        all_page:0,
        row_count:0,
        page_size:12
    };
    $scope.get_page_data = function() {
        if($scope.search_diagnose_center == null){
            $scope.search_diagnose_center = "";
        }
        diagnoseCenterManagersHttp.get_page_data({
            page: $scope.data_row.current_page,
            page_size: $scope.data_row.page_size,
            search_diagnose_center: $scope.search_diagnose_center.id,
            search_realname: $scope.search_realname
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.data_row.row_arr = result.row_arr;
            $scope.data_row.current_page = result.current_page;
            $scope.data_row.row_count = result.row_count;
        });
    }
    $scope.init = function () {
        diagnoseCentersHttp.get_page_data({ page: 1, page_size: 9999 }, function(result) { // 载入所属阅片中心
            if (!result.success)
                return;
            $scope.diagnose_centers = result.row_arr;
        });
    }
    // 添加或编辑阅片中心人员
    $scope.add_or_edit_dc_user = function(row){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'diagnose_center_manager_form.html',
            controller: 'addOrEditDiagnoseCentersManagerCtrl',
            windowClass: 'app-modal-window',
            resolve: {
                params: row
            }
        });
        modalInstance.result.then(function(params) {
            $scope.save_dc_user(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
    // 添加或编辑角色
    $scope.add_or_edit_dc_role = function(row){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'dc_role_form.html',
            controller: 'dcRoleFormCtrl',
            size: 'lg',
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
    }
    // 保存阅片中心人员
    $scope.save_dc_user = function(params){
        if(params.dc_roles[0]){
            params.dc_role_id = params.dc_roles[0].id;
        }
        diagnoseCenterManagersHttp.save(params, function(result) {
          if(result.success) {
            $(".confirm").hide();
            swal({
                title: "保存成功",
                type: "success",
            });
            setTimeout(function() {
                $(".confirm").click();
            }, 1700);
          }
          $scope.get_page_data();
        },function(result){
            $(".confirm").hide();
            swal({
                title: "用户名已经存在",
                type: "error",
            });
            setTimeout(function() {
                $(".confirm").click();
            }, 1700);
        });
    }
    // 显示角色
    $scope.show_dc_roles = function(row){
        var arr = [];
        angular.forEach(row.dc_roles, function(value, key){
            arr.push(value.name);
        });
        if(row.dc_roles.length == 0){
            return "--";
        }else{
            return arr.join("，");
        }
    }
    // enter
    $scope.search_keydown = function($event) {
        if ($event.keyCode === 13) {
            $scope.get_page_data();
        }
    };
    $scope.init();
    $scope.get_page_data();
}]);

// 添加或编辑阅片中心人员
controllers.controller('addOrEditDiagnoseCentersManagerCtrl', ["$scope", "$uibModalInstance", "params","diagnoseCentersHttp","diagnoseCenterManagersHttp", function($scope, $uibModalInstance, params,diagnoseCentersHttp,diagnoseCenterManagersHttp) {
    $scope.data = params;
    $scope.diagnose_centers = [];
    $scope.roles = [];
    params == undefined ? $scope.title = '添加' : $scope.title = '编辑';
    if(params == undefined){
        $scope.data = {};
    }
    diagnoseCentersHttp.get_page_data({ page: 1, page_size: 9999 }, function(result) { // 载入所属诊断中心
        if (!result.success)
            return;
        $scope.diagnose_centers = result.row_arr;
    });
    diagnoseCenterManagersHttp.get_roles({ page: 1, page_size: 9999 }, function(result) { // 载入角色
        if (!result.success)
            return;
        $scope.roles = result.row_arr;
    });
    $scope.ok = function() {
        if ($scope.data.username == undefined || $scope.data.username == null || $scope.data.username.trim() == "") {
            alert("账号不能为空");
            return;
        }
        if(params == undefined){
            if ($scope.data.password == null || $scope.data.password.trim() == "") {
                alert("密码不能为空");
                return;
            }
        }
        if ($scope.data.realname == null || $scope.data.realname.trim() == "") {
            alert("真实姓名不能为空");
            return;
        }
        if ($scope.data.diagnose_center == null || $scope.data.diagnose_center == undefined) {
            alert("所属诊断中心不能为空");
            return;
        }else{
            $scope.data.diagnose_center_id = $scope.data.diagnose_center.id;
        }
        if ($scope.data.dc_roles == null || $scope.data.dc_roles == undefined) {
            alert("角色不能为空");
            return;
        }else{
            $scope.data.dc_role_id = $scope.data.dc_roles.id;
        }
        if ($scope.data.phone == null || $scope.data.phone.trim() == "") {
            alert("电话不能为空");
            return;
        }
        $uibModalInstance.close($scope.data);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);

// 角色
controllers.controller('dcRoleFormCtrl', ["$scope", "$uibModalInstance", "params","diagnoseCenterManagersHttp",'$uibModal', function($scope, $uibModalInstance, params,diagnoseCenterManagersHttp,$uibModal) {
    $scope.data = params;
    $scope.roles = [];
    $scope.get_page_data = function(){
        diagnoseCenterManagersHttp.get_roles({ page: 1, page_size: 9999 }, function(result) { // 载入角色
            if (!result.success)
                return;
            $scope.roles = result.row_arr;
        });
    }
    $scope.add_or_edit_role = function(row){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add_or_edit_role_form.html',
            controller: 'addOrEditRoleCtrl',
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
        diagnoseCenterManagersHttp.save_role(params, function(result) {
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
controllers.controller('addOrEditRoleCtrl', ["$scope", "$uibModalInstance", "params","diagnoseCenterManagersHttp", function($scope, $uibModalInstance, params,diagnoseCenterManagersHttp) {
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