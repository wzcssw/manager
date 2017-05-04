class Admin::V1::UserAPI < Grape::API
  resources :users do
    desc "用户列表"
    get :get_page_data do
        @users = User.page(params[:page]).per(params[:page_size])
        @users = @users.where("realname like '%#{params[:search_realname]}%'") if params[:search_realname].present?
        @users = @users.where(hospital_id: params[:search_hospital]) if params[:search_hospital].present?
        
        present :current_page, @users.current_page
        present :row_arr, @users,with: UserEntity
        present :all_page, @users.total_pages
        present :row_count, @users.total_count
        present :page_size,@users.size
        present :success,true
    end

    desc "角色列表"
    get :get_roles do
        @roles = Role.page(params[:page]).per(params[:page_size])
        
        present :current_page, @roles.current_page
        present :row_arr, @roles,with: RoleEntity
        present :all_page, @roles.total_pages
        present :row_count, @roles.total_count
        present :page_size,@roles.size
        present :success,true
    end

    desc "保存用户"
    post :save do
        result = false
        puser = params
        u = nil
        if puser[:id].present?
          u = User.find(puser[:id])
        else
          u  = User.new
        end
        u.role_id = puser[:role_id] if puser[:role_id].present?
        u.hospital_id = puser[:hospital_id] if puser[:hospital_id].present?
        u.name = puser[:name]
        u.realname = puser[:realname]
        u.phone = puser[:phone]
        u.password = puser[:password] if puser[:password].present?
        result = u.save
        # 如果新增的是医生用户、管理员用户则要生成报告自定义模板
        cur_role = u.role
        if puser[:id].blank? && ['h_admin','g_admin','read_doctor','check_doctor'].include?(cur_role.code)
          CusReportTemplate.init_data_from_public(u.id)
        end
        present :success, result
        present :data, u
    end

    desc "启用禁用用户"
    params do
      requires :id, type: String
      requires :is_delete, type: Boolean
    end
    post :change_state do
      user = User.find(params[:id])
      user.update(is_delete: params[:is_delete])
      present :success, true
    end

    desc "保存角色"
    post :save_role do
      @role = nil
      if params[:id].present?
        @role = Role.find(params[:id])
      else
        @role = Role.new
      end
      @role.name = params[:name]
      @role.description = params[:description]
      @role.code = params[:code]
      result = @role.save
      present :success, result.present?
    end

  end
end
