class Admin::V1::CommonAPI < Grape::API
  resources :common do

    before do
      user_authenticate!
    end

    desc "城市列表"
    get :use_cities do
        present :success, true
        present :city_arr, City.use
    end

  end
end
