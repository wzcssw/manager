services.factory('roleHttp', ['proxyHttp', function (proxyHttp) {
    return {
        get_page_data: function (params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/roles/get_page_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);
