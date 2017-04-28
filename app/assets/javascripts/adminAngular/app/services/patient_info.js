// custom userHttp demo
services.factory('patientInfoHttp', ['proxyHttp', function(proxyHttp) {
    return {
        get_queue_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/patient_infos/get_queue_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        call_success: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/patient_infos/call_success',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        not_coming: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/patient_infos/not_coming',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        finish_examine: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/patient_infos/finish_examine',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        cancel_examine: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/patient_infos/cancel_examine',
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
                    url: '/patient_infos/get_form_init_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        load_hospital_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/patient_infos/load_hospital_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        form_save: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/patient_infos/form_save',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_schedules_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/patient_infos/get_schedules_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_late_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/patient_infos/get_late_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        re_appointment_at: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/patient_infos/re_appointment_at',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);