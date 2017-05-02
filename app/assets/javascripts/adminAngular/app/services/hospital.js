services.factory('hospitalHttp', ['httpBase', function(httpBase) {
    return {
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/hospitals/get_page_data',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        change_state: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/hospitals/change_state',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        get_init_data: function (successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/common/use_cities',
                    param: {},
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/hospitals/save',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        }
    }
}]);