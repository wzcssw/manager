services.factory('brandHttp', ['httpBase', function(httpBase) {
    return {
        get_page_data: function (params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/brands/get_page_data',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/brands/save',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        }
    }
}]);