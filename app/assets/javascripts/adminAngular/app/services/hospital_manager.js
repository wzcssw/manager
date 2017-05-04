services.factory('hospitalManagersHttp', ['httpBase', function(httpBase) {
    return {
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/users/get_page_data',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        get_roles: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/users/get_roles',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/users/save',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        change_state: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/users/change_state',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save_role: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/users/save_role',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        }
    }
}]);