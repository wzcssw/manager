class Admin::V1::CommonAPI < Grape::API
  resources :common do
    desc "代理请求"
    params do
      # requires :url, type: String
      # requires :method, type: String
      # requires :param, type: JSON
    end
    get :proxy_req do
      result = "ahhh"
      result
    end

    desc "test"
    params do
    end
    get :test do
      # http://localhost:3000/api/admin/v1/common/test
      "hello"
    end

  end
end
