// custom managerHttp demo
services.factory('managerHttp', ['httpBase', function (httpBase) {
    return {
        test: function (successDo, errorDo, alwaysDo) {
            httpBase.get({
                url: '/orders/test',
                successDo: successDo,
                errorDo: errorDo,
                alwaysDo: alwaysDo
            });
        }
    }
}]);