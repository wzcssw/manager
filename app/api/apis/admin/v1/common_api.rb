

class Admin::V1::CommonAPI < Grape::API
  resources :common do

    desc "城市列表"
    get :use_cities do
        present :success, true
        present :city_arr, City.use
    end

  end
end
