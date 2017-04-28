services.factory('userHttp', ['proxyHttp', function(proxyHttp) {
    return {
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/users/get_page_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_form_init_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/users/get_form_init_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        save: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/users/save',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        change_state: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/users/change_state',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);