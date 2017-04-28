services.factory('orderHttp', ['proxyHttp', function(proxyHttp){
      return {
          get_page_data: function(params ,successDo, errorDo, alwaysDo){
              proxyHttp.send(
                  {
                    method: 'get',
                    url: '/orders/get_page_data',
                    param :params
                  },
                  successDo,
                  errorDo,
                  alwaysDo
              );
          }
      }
    }]);