var controllers = angular.module('controllers', ['services', 'directives', 'filters', 'jkuri.slimscroll']);

// 测试对话
controllers.controller('roomCtrl', ['$scope', '$timeout', 'get_params', function($scope, $timeout, get_params) {
    $scope.msg_list = [];
    $scope.cur_msg = "";
    App.room = App.cable.subscriptions.create("RoomChannel", {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
            $timeout(function() {
                $scope.msg_list.push(data.message);
            });
        },
        speak: function(data) {
            return this.perform('speak', data);
        }
    });
    $scope.send_msg = function() {
        var tmp_msg = $scope.cur_msg;
        App.room.speak({ message: tmp_msg });
        $scope.cur_msg = "";
    }
}]);



controllers.controller('modalCtl', ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
    $scope.data = data;
    $scope.ok = function() {
        $uibModalInstance.close();
    }
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    }
}]);