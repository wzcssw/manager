class TxmanagerAPI < Grape::API
  format :json

  namespace :admin do
    namespace :v1 do
      mount Admin::V1::HospitalAPI
      mount Admin::V1::DiagnoseCentersAPI
      mount Admin::V1::CommonAPI
    end
  end

end
