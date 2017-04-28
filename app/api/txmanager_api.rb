class TxmanagerAPI < Grape::API
  format :json
  # use ActionDispatch::Session::CacheStore
  # helpers do
  #   def session
  #     env['rack.session']
  #   end
  # end

  namespace :admin do
    namespace :v1 do
      mount Admin::V1::CommonAPI
      mount Admin::V1::PatientInfoAPI
    end
  end

end
