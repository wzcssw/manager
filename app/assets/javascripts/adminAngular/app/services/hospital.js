
// custom userHttp demo
services.factory('hospitalHttp', ['proxyHttp', function (proxyHttp) {
    return {
        get_init_data: function (successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/hospitals/get_init_data',
                    param: {}
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_page_data: function (params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/hospitals/get_page_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        save: function (params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/hospitals/save',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        del: function (params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/hospitals/delete',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        change_state: function (params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/hospitals/change_state',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);