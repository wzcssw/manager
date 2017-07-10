class Admin::V1::ConsultationAPI < Grape::API
  resources :consultations do

    before do
      user_authenticate!
    end

    desc "会诊中心列表"
    get :get_consultations do # /api/admin/v1/consultations/get_consultations
      @consultation_centers = ConsultationCenter.page(params[:page]).per(params[:page_size])
      
      present :current_page, @consultation_centers.current_page
      present :row_arr, @consultation_centers, with: ConsultationCenterEntity
      present :all_page, @consultation_centers.total_pages
      present :row_count, @consultation_centers.total_count
      present :page_size,@consultation_centers.size
      present :success,true
    end
    
    desc "保存会诊中心"
    post :save_consultation_center do
        result = false
        msg = ""
        puser = params
        cc = nil
        if puser[:id].present?
          cc = ConsultationCenter.find(puser[:id])
        else
          cc  = ConsultationCenter.new
          cc.is_open = true
        end
        cc.name = puser[:name]
        cc.description = puser[:description]
        cc.hospital_id = puser[:hospital_id]
        begin
          result = cc.save
        rescue ActiveRecord::RecordNotUnique => exception
          result = false
          msg = "会诊中心已经存在"
        end
        present :success, result
        present :msg, msg
        present :data, cc
    end
      
    desc "会诊中心用户列表"
    get :get_page_data do # /api/admin/v1/consultations/get_page_data
      @users = CcUser.order("created_at DESC").page(params[:page]).per(params[:page_size])
      
      present :current_page, @users.current_page
      present :row_arr, @users, with: ConsultationEntity
      present :all_page, @users.total_pages
      present :row_count, @users.total_count
      present :page_size,@users.size
      present :success,true
    end

    desc "会诊中心用户角色列表"
    params do
    end
    get :get_roles do
        @roles = CcRole.page(params[:page]).per(params[:page_size])

        present :current_page, @roles.current_page
        present :row_arr, @roles
        present :all_page, @roles.total_pages
        present :row_count, @roles.total_count
        present :page_size,@roles.size
        present :success,true
    end

    desc "保存会诊中心角色"
    post :save_role do
      @role = nil
      if params[:id].present?
        @role = CcRole.find(params[:id])
      else
        @role = CcRole.new
      end
      @role.name = params[:name]
      @role.description = params[:description]
      @role.code = params[:code]
      result = @role.save
      present :success, result.present?
    end

    desc "保存会诊中心用户"
    post :save do
        result = false
        msg = ""
        puser = params
        u = nil
        if puser[:id].present?
          u = CcUser.find(puser[:id])
        else
          u  = CcUser.new
          u.is_use = true
        end
        u.cc_role_id = puser[:cc_role_id] if puser[:cc_role_id].present?
        u.rank = puser[:rank] if puser[:rank].present?
        u.consultation_center_id = puser[:consultation_center_id]
        u.username = puser[:username]
        u.realname = puser[:realname]
        u.phone = puser[:phone]
        u.email = puser[:email]
        u.password = puser[:password] if puser[:password].present?
        begin
          result = u.save
        rescue ActiveRecord::RecordNotUnique => exception
          result = false
          msg = "用户名已经存在"
        end
        present :success, result
        present :msg, msg
        present :data, u
    end

    desc "会诊中心用户状态"
    params do
      requires :id, type: Integer
    end
    post :change_state do
      @user = CcUser.find(params[:id])
      @user.update(is_use: !@user.is_use)
      
      present :success, @user.present?
    end

    desc "会诊中心状态"
    params do
      requires :id, type: Integer
    end
    post :consultations_center_change_state do
      @center = ConsultationCenter.find(params[:id])
      @center.update(is_open: !@center.is_open)
      
      present :success, @center.present?
    end

  end
end
