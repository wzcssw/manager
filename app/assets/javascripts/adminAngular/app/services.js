var services = angular.module('services', []);
//公共服务,处理网络请求异常或者程序异常等等情况
// params{result, status, headers, config, paramsObj}
services.factory("handleHttpError", function() {
    return {
        deal_app_error: function(params) {
            if (!params.result || !params.result.success) {
                params && params["paramsObj"] && (params["error_code"] = "app_error") && params["paramsObj"]["errorDo"] && params["paramsObj"]["errorDo"](params);
                return false;
            }
            return true;
        },
        deal_network_error: function(params) {
            console.log("错误码:", params.status);
            params && params["paramsObj"] && (params["error_code"] = "network_error") && params["paramsObj"]["errorDo"] && params["paramsObj"]["errorDo"](params);
            return false;
        }
    }
});

services.factory('httpBase', ['$http', 'handleHttpError', function($http, handleHttpError){
    return{
        request: function(paramsObj){
            var requestObj = {method: paramsObj.method, url: "api/admin/v1"+paramsObj.url};
            if (paramsObj.method == "GET"){
                requestObj.params = paramsObj.params;
            }else {
                requestObj.data = paramsObj.params;
            }

            $http(requestObj).success(function(result,status,headers,config){
                var handleResult = {result: result,status: status,headers: headers,config:config, paramsObj:paramsObj};
                var isErr = true;
                if(handleHttpError.deal_app_error(handleResult)){
                    isErr = false;
                    paramsObj["successDo"] && paramsObj["successDo"](handleResult["result"],handleResult);
                }
                paramsObj["alwaysDo"] && paramsObj["alwaysDo"](isErr, handleResult);
            }).error(function(result,status,headers,config){
                var handleResult = {result: result,status: status,headers: headers,config:config, paramsObj:paramsObj};
                handleHttpError.deal_network_error(handleResult);
                paramsObj["alwaysDo"] && paramsObj["alwaysDo"](handleResult, true);
            })
        },

        get: function(paramsObj){
            paramsObj.method = "GET";
            this.request(paramsObj);
        },

        post: function(paramsObj){
            paramsObj.method = "POST";
            this.request(paramsObj);
        },
        put: function(paramsObj){
            paramsObj.method = "PUT";
            this.request(paramsObj);
        }
    }
}]);

services.factory('get_params', function() {
    return {
        get_url_params: function(name) {
            var url = window.location.href.split('?').pop();
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = url.match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        }
    }
});
