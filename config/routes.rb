Rails.application.routes.draw do
  mount RuCaptcha::Engine => "/rucaptcha"

  mount TxmanagerAPI => '/api'

  resource :sessions do
    collection do
      get "logout"
    end
  end

  root 'admin#index'

end
