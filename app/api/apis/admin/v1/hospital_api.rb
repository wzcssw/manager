class Admin::V1::HospitalAPI < Grape::API
  resources :hospitals do
    desc "医院"
    params do
      # requires :url, type: String
      # requires :method, type: String
      # requires :param, type: JSON
    end
    get :get_page_data do # /api/admin/v1/hospitals/get_page_data
      h_arr = Hospital.GetShowData(params)
      page_result = h_arr.page(params[:page]).per(params[:page_size])
      
      present :current_page, page_result.current_page
      present :row_arr, page_result, with: HospitalEntity
      present :all_page, page_result.total_pages
      present :row_count, page_result.total_count
      present :page_size,page_result.size
      present :success,true
    end

    desc "保存检查医院"
    params do
      requires :id, type: String
      requires :name, type: String
      requires :city_id, type: String
      requires :city_name, type: String
    end
    post :save do
      h = nil
      if params[:id].present?
        h = Hospital.find(params[:id])
        h.open_time = params[:open_time]
        h.close_time = params[:close_time]
      else
        h  = Hospital.new
        # cur_user = current_user
        # h.user_id = cur_user.id
        h.open_time = "08:00"
        h.close_time = "17:30"
      end
      h.name = params[:name]
      h.city_id = params[:city_id]
      h.city_name = params[:city_name]
      h.hospital_code = params[:hospital_code]
      h.save
      present :success, true
      present :data, h
    end

    desc "修改检查医院状态"
    params do
      requires :id, type: String
      requires :in_open ,type: Boolean
    end
    post :change_state do
      Hospital.find(params[:id]).update(in_open: params[:in_open])
      present :success, true
    end

    desc "test"
    params do
    end
    get :test do
      # http://localhost:3000/api/admin/v1/common/test
      "hello"
    end

  end
end
