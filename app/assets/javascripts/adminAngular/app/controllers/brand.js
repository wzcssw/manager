controllers.controller('brandCtrl', ['$scope',  'brandHttp', '$uibModal', function($scope, brandHttp,  $uibModal) {
    $scope.maxSize = 5;
    $scope.city_arr = [];
    $scope.data_row = {
        current_page: 1,
        row_arr: [],
        all_page: 0,
        total_count: 0,
        total_pages: 1,
        page_size: 12
    };
    $scope.get_page_data = function() {
        brandHttp.get_page_data({
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
    // 新增或编辑厂商
    $scope.add_or_edit_brand = function(row){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'brand_form.html',
            controller: 'brandFormCtrl',
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
    }
    // 保存
    $scope.save = function(params){
        brandHttp.save(params, function(result) {
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


// 添加或编辑阅片中心人员
controllers.controller('brandFormCtrl', ["$scope", "$uibModalInstance", "params", function($scope, $uibModalInstance, params) {
    $scope.data = params;
    params == undefined ? $scope.title = '添加' : $scope.title = '编辑';
    if(params == undefined){
        $scope.data = {};
    }
   
    $scope.ok = function() {
        // if ($scope.data.name == undefined || $scope.data.username == null || $scope.data.username.trim() == "") {
        //     alert("名称不能为空");
        //     return;
        // }
        $uibModalInstance.close($scope.data);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);