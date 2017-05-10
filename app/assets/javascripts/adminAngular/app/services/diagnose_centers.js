services.factory('diagnoseCentersHttp', ['httpBase', function(httpBase) {
    return {
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/diagnose_centers/get_page_data',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/diagnose_centers/save',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        change_state: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/diagnose_centers/change_state',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        binding_hospital: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/diagnose_centers/binding_hospital',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        dc_client_list: function (params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/diagnose_centers/dc_client_list',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save_dc_client: function (params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/diagnose_centers/save_dc_client',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        }
    }
}]);