class Admin::V1::AdministratorAPI < Grape::API
  resources :administrators do
      
    desc "管理员列表"
    get :get_page_data do # /api/admin/v1/administrators/get_page_data
      @managers = Manager.page(params[:page]).per(params[:page_size])
      
      present :current_page, @managers.current_page
      present :row_arr, @managers, with: AdministratorEntity
      present :all_page, @managers.total_pages
      present :row_count, @managers.total_count
      present :page_size,@managers.size
      present :success,true
    end

    desc "保存管理员"
    post :save do
      m = nil
      if params[:id].present?
        m = Manager.find(params[:id])
      else
        m  = Manager.new
        m.disable = false
      end
      m.username = params[:username]
      m.realname = params[:realname]
      m.phone = params[:phone]
      m.role = params[:role]
      m.password = params[:password] if params[:password].present?
      m.save
      present :success, true
      present :data, m
    end
    
    desc "管理员状态"
    post :change_state do
      @manager = Manager.find(params[:id])
      if @manager.present?
        flag = @manager.disable
        @manager.update(disable: !flag)
      end
      present :success, @manager.present?
    end

  end
end
