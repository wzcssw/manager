services.factory('diagnoseCenterManagersHttp', ['httpBase', function(httpBase) {
    return {
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/diagnose_centers/dc_users',
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
                    url: '/diagnose_centers/save_manager',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        }
    }
}]);