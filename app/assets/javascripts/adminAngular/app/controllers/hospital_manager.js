controllers.controller('hospitalsManagerCtrl', ['$scope',  'hospitalManagersHttp', '$uibModal', function($scope, hospitalManagersHttp,  $uibModal) {
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
        hospitalManagersHttp.get_page_data({
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
    $scope.get_page_data();
}]);