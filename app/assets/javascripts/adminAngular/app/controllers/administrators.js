controllers.controller('administratorCtrl', ['$scope',  'administratorHttp', '$uibModal', function($scope, administratorHttp, $uibModal) {
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
        administratorHttp.get_page_data({
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
    // 添加或编辑Manager
    $scope.add_or_edit_user = function (row) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'add_or_edit_manager.html',
            controller: 'addOrEditAdminCtrl',
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
    $scope.save = function(params){
        administratorHttp.save(params, function(result) {
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
                title: "该用户已存在",
                type: "error",
            });
            setTimeout(function() {
                $(".confirm").click();
            }, 1700);
        });
    };
    // 修改医院状态
    $scope.change_state = function(row) {
        $(".confirm").show();
        warn_confirm({
            title: "修改人员状态",
            text: "确定修改人员状态吗？",
            sure_func: function() {
                administratorHttp.change_state({
                    id: row.id
                }, function(result) {
                    if (!result.success) {
                        return;
                    }
                    $scope.get_page_data();
                });
            }
        });
    }
    // enter
    $scope.search_keydown = function($event) {
        if ($event.keyCode === 13) {
            $scope.get_page_data();
        }
    };
    $scope.get_page_data();
}]);

// 添加编辑医院
controllers.controller('addOrEditAdminCtrl', ["$scope", "$uibModalInstance", "params","administratorHttp", function($scope, $uibModalInstance, params,administratorHttp) {
    $scope.data = params;
    $scope.hospitals = [];
    $scope.roles = [];
    params == undefined ? $scope.title = '添加' : $scope.title = '编辑';
    if(params == undefined){
        $scope.data = {};
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
}]);