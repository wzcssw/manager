// custom userHttp demo
services.factory('todayMeetingHttp', ['proxyHttp', function(proxyHttp) {
    return {
        get_info_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/today_meetings/get_info_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_film_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/films/get_film_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);