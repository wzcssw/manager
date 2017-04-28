// custom userHttp demo
services.factory('reportHttp', ['proxyHttp', function(proxyHttp) {
    return {
        get_index_init_data: function(successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/reports/get_index_init_data',
                    param: {}
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_data: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/reports/get_data',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_report: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/reports/get_report',
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
                    url: '/reports/save',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        change_report_state: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/reports/change_report_state',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        print_report: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/reports/print_report',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_report_templates: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/reports/get_report_templates',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        get_dir_report_templates: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'get',
                    url: '/reports/get_dir_report_templates',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        save_cus_report_template: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/reports/save_cus_report_template',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        delete_cus_report_template: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/reports/delete_cus_report_template',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        },
        save_cus_report_template_sort: function(params, successDo, errorDo, alwaysDo) {
            proxyHttp.send({
                    method: 'post',
                    url: '/reports/save_cus_report_template_sort',
                    param: params
                },
                successDo,
                errorDo,
                alwaysDo
            );
        }
    }
}]);