// custom userHttp demo
services.factory('myMeetingHttp', ['proxyHttp', function(proxyHttp) {
    return {
        get_init_data: function(successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/my_meetings/get_init_data',
                    param: {}
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_page_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/my_meetings/get_page_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_form_init_data: function(successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/my_meetings/get_form_init_data',
                    param: {}
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_my_patient_arr: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/my_meetings/get_my_patient_arr',
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
                    url: '/my_meetings/save',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        open_meeting: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/my_meetings/open_meeting',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        join_meeting: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/my_meetings/join_meeting',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        finish_meeting: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/my_meetings/finish_meeting',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);