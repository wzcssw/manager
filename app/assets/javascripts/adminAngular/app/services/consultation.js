services.factory('consultationHttp', ['httpBase', function(httpBase) {
    return {
        get_consultations: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/consultations/get_consultations',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save_consultation_center: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/consultations/save_consultation_center',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/consultations/get_page_data',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/consultations/save',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        get_roles: function(params, successDo, errorDo, alwaysDo) {
            httpBase.get({
                    url: '/consultations/get_roles',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        change_state: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/consultations/change_state',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        consultations_center_change_state: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/consultations/consultations_center_change_state',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        },
        save_role: function(params, successDo, errorDo, alwaysDo) {
            httpBase.post({
                    url: '/consultations/save_role',
                    params: params,
                    successDo: successDo,
                    errorDo: errorDo,
                    alwaysDo: alwaysDo
                });
        }
    }
}]);