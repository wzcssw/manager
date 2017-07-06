controllers.controller('consultationCentersCtrl', ['$scope',  'consultationHttp', '$uibModal', function($scope, consultationHttp, $uibModal) {
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
        consultationHttp.get_consultations({
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
    // 添加或编辑会诊中心
    $scope.add_or_edit_consultation_center = function (row) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'consultation_center_form.html',
            controller: 'addOrEditConsultationCenterCtrl',
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
    // 修改中心状态
    $scope.change_state = function(row) {
        var tmp_str = (row.is_use ? '禁用' : '启用');
        $(".confirm").show();
        warn_confirm({
            title: tmp_str,
            text: "确定" + tmp_str + "该用户吗？",
            sure_func: function() {
                consultationHttp.consultations_center_change_state({ id: row.id }, function(result) {
                    if (!result.success) {
                        return;
                    }
                    $scope.get_page_data();
                });
            }
        });
    }
    // 保存consultation_center
    $scope.save = function(params){
        if (params.hospital){
            params.hospital_id = params.hospital.id;
        }
        consultationHttp.save_consultation_center(params, function(result) {
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
controllers.controller('addOrEditConsultationCenterCtrl', ["$scope", "$uibModalInstance", "params","consultationHttp","hospitalHttp", function($scope, $uibModalInstance, params,consultationHttp,hospitalHttp) {
    $scope.data = params;
    $scope.hospitals = [];
    $scope.roles = [];
    $scope.consultation_centers = [];
    $scope.hospitals = [];
    params == undefined ? $scope.title = '添加' : $scope.title = '编辑';
    if(params == undefined){
        $scope.data = {};
    }else{
        $scope.data.role = params.cc_role;
        $scope.data.consultation_center = params.consultation_center;
    };
    $scope.init_data = function(){
        hospitalHttp.get_page_data({
            page: 1,
            page_size: 999
        }, function(result) {
            if (!result.success) {
                return;
            }
            $scope.hospitals = result.row_arr;
        });
    }; 
    $scope.ok = function() {
        if ($scope.data.name == undefined || $scope.data.name.trim() == "") {
            alert("名称不能为空");
            return;
        }
        if (!$scope.hospital) {
            alert("绑定医院不能为空");
            return;
        }
        $uibModalInstance.close($scope.data);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.init_data();
}]);