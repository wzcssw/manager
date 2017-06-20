class Admin::V1::DiagnoseCentersAPI < Grape::API
  resources :diagnose_centers do

    desc "阅片中心"
    get :get_page_data do
        @dc = DiagnoseCenter.page(params[:page]).per(params[:page_size])
        present :success, true
        present :row_arr, @dc,with: DiagnoseCenterEntity
        present :current_page, @dc.current_page
        present :all_page, @dc.total_pages
        present :row_count, @dc.total_count
        present :page_size,@dc.size
    end

    desc "保存阅片中心"
    params do
      # requires :name, type: String
    end
    post :save do
      @dc = nil
      if params[:id].present?
        @dc = DiagnoseCenter.find(params[:id])
      else
        @dc = DiagnoseCenter.new
      end
      @dc.name = params[:name] if params[:name].present?
      @dc.description = params[:description]
      @dc.is_open = params[:is_open] if params[:is_open].present?
      @dc.rank = params[:rank] if params[:rank].present?
      @dc.examine_type = params[:examine_type] if params[:examine_type].present?
      @dc.save
      present :success, true
      present :data, @dc
    end

    desc "修改阅片中心状态"
    params do
      requires :id, type: String
      requires :is_open ,type: Boolean
    end
    post :change_state do
      DiagnoseCenter.find(params[:id]).update(is_open: params[:is_open])
      present :success, true
    end

    desc "阅片中心绑定医院"
    params do
      requires :id, type: String
    end
    post :binding_hospital do
      DiagnoseCenterHospital.where(diagnose_center_id: params[:id]).destroy_all
      params[:hospital_ids].each do |id|
        DiagnoseCenterHospital.where(diagnose_center_id: params[:id],hospital_id: id).first_or_create
      end
      present :success, true
    end

    desc "阅片中心用户"
    params do
      # requires :id, type: String
    end
    get :dc_users do
      @user = DcUser.page(params[:page]).per(params[:page_size])
      @user = @user.where("realname like '%#{params[:search_realname]}%'") if params[:search_realname].present?
      @user = @user.where(diagnose_center_id: params[:search_diagnose_center]) if params[:search_diagnose_center].present?

      present :success, true
      present :row_arr, @user,with: DcUserEntity
      present :current_page, @user.current_page
      present :all_page, @user.total_pages
      present :row_count, @user.total_count
      present :page_size,@user.size
    end

    desc "保存阅片中心人员"
    params do
      # requires :name, type: String
    end
    post :save_manager do
      result = false
      first_save = false
      msg = ""
      @user = nil
      if params[:id].present?
        @user = DcUser.find(params[:id])
      else
        @user = DcUser.new
        first_save = true
      end
      @user.diagnose_center_id = params[:diagnose_center_id]
      @user.email = params[:email]
      @user.phone = params[:phone]
      @user.realname = params[:realname]
      @user.username = params[:username]
      @user.password = params[:password] if params[:password].present?
      @user.rank = params[:rank] if params[:rank].present?
      if params[:dc_role_id].present?
        DcUserRole.where(dc_user_id: @user.id).delete_all
        DcUserRole.where(dc_user_id: @user.id,dc_role_id: params[:dc_role_id]).first_or_create
      end
      begin
        @user.save
        # 初始化报告模板
        DcCusReportTemplate.init_data_from_public(@user.id) if first_save
        result = @user.present?
      rescue ActiveRecord::RecordNotUnique => exception
        result = false
        msg = "用户名已经存在"
      end
      present :success, result.present?
      present :msg, msg
    end

    desc "角色列表"
    params do
    end
    get :get_roles do
        @roles = DcRole.page(params[:page]).per(params[:page_size])

        present :current_page, @roles.current_page
        present :row_arr, @roles
        present :all_page, @roles.total_pages
        present :row_count, @roles.total_count
        present :page_size,@roles.size
        present :success,true
    end

    desc "保存角色"
    params do
      # requires :name, type: String
    end
    post :save_role do
      @role = nil
      if params[:id].present?
        @role = DcRole.find(params[:id])
      else
        @role = DcRole.new
      end
      @role.name = params[:name]
      @role.description = params[:description]
      @role.code = params[:code]
      @role.rank = params[:rank] if params[:rank].present?
      result = @role.save
      present :success, result.present?
    end

    desc "阅片中心设备"
    params do
      requires :diagnose_center_id, type: String
    end
    get :dc_client_list do
      @dc = DcClient.where(diagnose_center_id: params[:diagnose_center_id]).page(params[:page]).per(params[:page_size])
      present :success, @dc.present?
      present :row_arr, @dc
      present :current_page, @dc.current_page
      present :all_page, @dc.total_pages
      present :row_count, @dc.total_count
      present :page_size,@dc.size
    end
    
    desc "保存阅片中心设备"
    post :save_dc_client do
      @dc = nil
      if params[:id].present?
        @dc = DcClient.find(params[:id])
      else
        @dc = DcClient.new
      end
      @dc.diagnose_center_id = params[:diagnose_center_id] if params[:diagnose_center_id].present?
      @dc.code = params[:code]
      @dc.in_use = params[:in_use]
      @dc.ip = params[:ip]
      @dc.port = params[:port]
      @dc.aetitle = params[:aetitle]
      @dc.protocol_name = params[:protocol_name]
      @dc.save

      present :success, @dc.present?
      present :data, @dc
    end

  end
end
