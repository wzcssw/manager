controllers.controller('hospitalCtrl', ['$scope',  'hospitalHttp', '$uibModal', function($scope, hospitalHttp, $uibModal) {
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
    $scope.init_data = function() {
        hospitalHttp.get_init_data(function(data) {
            if (!data.success) {
                return;
            }
            $scope.city_arr = data.city_arr;
        });
    }
    $scope.get_page_data = function() {
        hospitalHttp.get_page_data({
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
    // 修改医院状态
    $scope.change_state = function(row,field) {
        $(".confirm").show();
        warn_confirm({
            title: "修改医院状态",
            text: "确定修改医院状态吗？",
            sure_func: function() {
                hospitalHttp.change_state({
                    id: row.id,
                    field: field
                }, function(result) {
                    if (!result.success) {
                        return;
                    }
                    $scope.get_page_data();
                });
            }
        });
    }
    // 保存医院
    $scope.save_hospital = function(params) {
        hospitalHttp.save(params, function(result) {
            if (result.success) {
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
    // 添加和编辑医院
    $scope.add_or_edit_hospital = function(row) {
        var params = {
            id: "",
            name: "",
            hospital_code: "",
            city_id: "",
            open_time: "",
            close_time: "",
            brand: null
        };
        if(row){
            params.id = row.id;
            params.name = row.name;
            params.city_id = row.city_id;
            params.hospital_code = row.hospital_code;
            params.open_time = row.open_time;
            params.close_time = row.close_time;
            params.brand = row.brand;
        }
        params.city_arr = $scope.city_arr;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'hospitalForm.html',
            controller: 'hospitalFormCtrl',
            size: '',
            resolve: {
                params: params
            }
        });
        modalInstance.result.then(function(params) {
            $scope.save_hospital(params);
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    }
    $scope.init_data();
    $scope.get_page_data();
}]);

// 添加编辑医院
controllers.controller('hospitalFormCtrl', ["$scope", "$uibModalInstance", "params","brandHttp", function($scope, $uibModalInstance, params,brandHttp) {
    var open_t = null;
    var close_t = null;
    $scope.brands = [];
    $scope.brand = null;
    if (params.open_time) {
        open_t = new Date();
        var o_t = params.open_time.split(":");
        open_t.setHours(o_t[0]);
        open_t.setMinutes(o_t[1]);
    }
    if (params.close_time) {
        close_t = new Date();
        var c_t = params.close_time.split(":");
        close_t.setHours(c_t[0]);
        close_t.setMinutes(c_t[1]);
    }
    $scope.brand = params.brand;
    $scope.data = {
        id: params.id,
        name: params.name,
        city_id: params.city_id,
        city_name: '',
        city_arr: params.city_arr,
        hospital_code: params.hospital_code,
        city: null,
        open_time: open_t,
        close_time: close_t
    };
    $scope.title = '';
    $scope.data.id == "" ? $scope.title = '添加医院' : $scope.title = '编辑医院';
    brandHttp.get_page_data({ page: 1, page_size: 999 },function(result) {
        if (!result.success) {
            return;
        }
        $scope.brands = result.row_arr;
    });
    $scope.get_default_city = function() {
        for (var i = 0; i < $scope.data.city_arr.length; i++) {
            if ($scope.data.city_arr[i].id == $scope.data.city_id) {
                return $scope.data.city_arr[i];
            }
        }
    }
    $scope.ok = function() {
        var open_time_str = "";
        var close_time_str = "";
        if ($scope.data.name == null || $scope.data.name.trim() == "") {
            alert("医院名称不能为空");
            return;
        }
        if ($scope.data.city == null || $scope.data.city.id == "") {
            alert("医院所属城市不能为空");
            return;
        }
        if ($scope.data.hospital_code == null || $scope.data.hospital_code == "") {
            alert("医院唯一编码不能为空");
            return;
        }
        if ($scope.data.open_time != null) {
            open_time_str = ("0" + $scope.data.open_time.getHours()).slice(-2) + ":" + ("0" + $scope.data.open_time.getMinutes()).slice(-2);
        }
        if ($scope.data.close_time != null) {
            close_time_str = ("0" + $scope.data.close_time.getHours()).slice(-2) + ":" + ("0" + $scope.data.close_time.getMinutes()).slice(-2);
        }
        $uibModalInstance.close({
            id: $scope.data.id,
            name: $scope.data.name,
            hospital_code: $scope.data.hospital_code,
            city_id: $scope.data.city.id,
            city_name: $scope.data.city.name,
            open_time: open_time_str,
            close_time: close_time_str,
            brand_id: $scope.brand.id
        });
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);
