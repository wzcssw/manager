// 管理界面
controllers.controller('managerCtrl', ['$scope', '$uibModal',  'get_params', '$state',function($scope, $uibModal,  get_params,$state){
    $scope.$on("$stateChangeSuccess", function () {
        angular.forEach($scope.tabarr,function(data,index){
            if($state.current.name === data.url){
                $scope.current_tabindex = index;
            }
        })
    })
    $scope.current_tabindex = 0;
    $scope.tabarr = [
        { name: "阅片中心人员", url: "manager.diagnose_centers_manager"},
        { name: "医院人员", url: "manager.hospitals_manager"}
    ];
    $scope.go_tab = function(index) {
        $scope.current_tabindex = index;
        $state.go($scope.tabarr[index].url);
    };
    angular.forEach($scope.tabarr,function(data,index){
        if($state.current.name === data.url){
            $scope.current_tabindex = index;
        }
    })
    $scope.is_current_tab = function(index) {
        return ($scope.current_tabindex == index);
    };
    // doctorsHttp.get_auth({}, function(result) {
    //     if(result.data.role !== 'admin' && result.data.role !== 'super_admin'){
    //         $scope.tabarr.splice(1,1);
    //     }
    // });
}]);
