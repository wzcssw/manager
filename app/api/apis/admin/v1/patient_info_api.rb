class Admin::V1::PatientInfoAPI < Grape::API
  resources :patient_info do
    desc "代理请求"
    params do
    end
    post :new_kz_order do
      {success: true}
    end

  end
end
