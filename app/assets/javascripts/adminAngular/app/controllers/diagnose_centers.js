// 阅片中心
controllers.controller('diagnoseCentersCtrl', ['$scope','$timeout', 'get_params','$uibModal','hospitalHttp','diagnoseCentersHttp', function($scope, $timeout,get_params,$uibModal,hospitalHttp,diagnoseCentersHttp){
  $scope.maxSize = 5;
  $scope.city_arr = [];
  $scope.data_row = {
    current_page:1,
    row_arr:[],
    all_page:0,
    row_count:0,
    page_size:12
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
      diagnoseCentersHttp.get_page_data({
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
  // 添加和编辑医院
  $scope.add_or_edit_diagnose_center = function(row) {
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'diagnose_center_form.html',
          controller: 'diagnoseCenterCtrl',
          windowClass: 'app-modal-window',
          resolve: {
              params: row
          }
      });
      modalInstance.result.then(function(params) {
          $scope.save_diagnose_centers(params);
      }, function() {
          console.log('Modal dismissed at: ' + new Date());
      });
  }
  // 保存医院
  $scope.save_diagnose_centers = function(params) {
      diagnoseCentersHttp.save(params, function(result) {
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
  // 修改医院状态
  $scope.change_state = function(row) {
      warn_confirm({
          title: "修改阅片中心状态",
          text: "确定修改阅片中心状态吗？",
          sure_func: function() {
              diagnoseCentersHttp.change_state({
                  id: row.id,
                  is_open: !row.is_open
              }, function(result) {
                  if(!result.success){
                      return;
                  }
                  $scope.get_page_data();
              });
          }
      });
  }
  // 设置绑定医院
  $scope.set_binding_hospital = function(row) {
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'binding_hospital_form.html',
          controller: 'bindingDiagnoseCenterCtrl',
          size: 'md',
          resolve: {
              params: row
          }
      });
      modalInstance.result.then(function(params) {
          diagnoseCentersHttp.binding_hospital(params,function(data){
            $scope.get_page_data();
          });
      }, function() {
          console.log('Modal dismissed at: ' + new Date());
      });
  }
  // 显示binding医院
  $scope.show_hospitals = function(hospitals){
    var hos = [];
    angular.forEach(hospitals, function(value, key){
        hos.push(value.name);
    });
    if(hos.length==0){
      return "--"
    }else{
      return hos.join("，");
    }
  }
  $scope.init_data();
  $scope.get_page_data();
}]);


// 添加编辑医院
controllers.controller('diagnoseCenterCtrl', ["$scope", "$uibModalInstance", "params", function($scope, $uibModalInstance, params) {
    $scope.data = params;
    params == undefined ? $scope.title = '添加阅片中心' : $scope.title = '编辑阅片中心';
    $scope.ok = function() {
        if ($scope.data.name == null || $scope.data.name.trim() == "") {
            alert("名称不能为空");
            return;
        }
        $uibModalInstance.close({
            id: $scope.data.id,
            name: $scope.data.name,
            description: $scope.data.description
        });
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
}]);

// 设置绑定医院
controllers.controller('bindingDiagnoseCenterCtrl', ["$scope", "$uibModalInstance", "params","hospitalHttp", function($scope, $uibModalInstance, params,hospitalHttp) {
    $scope.hospitals = null;
    $scope.data = params;
    $scope.result = [];
    $scope.result_ids = [];
    $scope.show_result = "";
    (params == undefined) ? $scope.title = '添加阅片中心' : $scope.title = '编辑阅片中心';
    $scope.ok = function() {
        $uibModalInstance.close({
            id: $scope.data.id,
            hospital_ids: $scope.result_ids
        });
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    hospitalHttp.get_page_data({page_size: 9999 }, function(result) {
        if (!result.success)
            return;
        $scope.hospitals = result.row_arr;
        // 回显数据
        angular.forEach($scope.data.hospitals, function(value, key){
            $scope.result.push(value);
            angular.forEach($scope.hospitals, function(v, k){
                if(value.id==v.id){
                  v.selected = true;
                }
            });
        });
    });
    $scope.$watch('result', function(newValue, oldValue) {
        var names = [];
        var ids = [];
        angular.forEach($scope.result, function(value, key){
            names.push(value.name);
            ids.push(value.id);
        });
        $scope.show_result = names.join("，");
        $scope.result_ids = ids;
    }, true);
    $scope.isSelected = function(obj){
      if('selected' in obj){
        return true;
      }else{
        return false;
      }
    }
    $scope.hospital_selected = function(obj){
      if(obj.selected){
        delete obj.selected
        $scope.manip("del",obj);
      }else{
        obj.selected = true;
        $scope.manip("add",obj);
      }
    }
    $scope.manip = function(param,obj){ // 操作result数组
      if (param == "add"){
        var ids = [];
        angular.forEach($scope.result, function(value, key){
            ids.push(value.id);
        });
        if(!contains(ids,obj.id)){
          $scope.result.push(obj);
        }
      }else if (param == "del"){
        angular.forEach($scope.result, function(value, key){
            if(value.id==obj.id){
                $scope.result.splice(key,1)
            }
        });
      }
      function contains(arr, obj) {  
          var i = arr.length;  
          while (i--) {  
              if (arr[i] === obj) {  
                  return true;  
              }  
          }  
          return false;  
      } 
    }
}]);