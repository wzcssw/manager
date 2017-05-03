class Admin::V1::UserAPI < Grape::API
  resources :users do
    desc "用户列表"
    params do
      # requires :url, type: String
      # requires :method, type: String
      # requires :param, type: JSON
    end
    get :get_page_data do
        @users = User.page(params[:page]).per(params[:page_size])
        
        present :current_page, @users.current_page
        present :row_arr, @users
        present :all_page, @users.total_pages
        present :row_count, @users.total_count
        present :page_size,@users.size
        present :success,true
    end


  end
end
