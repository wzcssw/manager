controllers.controller('diagnoseCentersManagerCtrl', ['$scope',  'diagnoseCenterManagersHttp', '$uibModal', function($scope, diagnoseCenterManagersHttp,  $uibModal) {
    $scope.maxSize = 5;
    $scope.city_arr = [];
    $scope.data_row = {
        current_page:1,
        row_arr:[],
        all_page:0,
        row_count:0,
        page_size:12
    };
    $scope.get_page_data = function() {
        diagnoseCenterManagersHttp.get_page_data({
            page: $scope.data_row.current_page,
            page_size: $scope.data_row.page_size
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.data_row.row_arr = result.row_arr;
            $scope.data_row.current_page = result.current_page;
            $scope.data_row.row_count = result.row_count;
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
    // 保存阅片中心人员
    $scope.save_dc_user = function(params){
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
          } else {
              return;
          }
          $scope.get_page_data();
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
        console.log($scope.data);
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