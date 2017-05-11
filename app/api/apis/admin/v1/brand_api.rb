class Admin::V1::BrandAPI < Grape::API
  resources :brands do

    desc "厂商列表"
    get :get_page_data do
        @brand = Brand.page(params[:page]).per(params[:page_size])

        present :success, true
        present :row_arr, @brand,with: BrandEntity
        present :current_page, @brand.current_page
        present :all_page, @brand.total_pages
        present :row_count, @brand.total_count
        present :page_size,@brand.size
    end

    desc "保存厂商"
    post :save do
        @brand = nil
        if params[:id].present?
          @brand = Brand.find(params[:id])
        else
          @brand = Brand.new
        end
        @brand.name = params[:name]
        @brand.logo_url = params[:logo_url]
        @brand.login_bg_url = params[:login_bg_url]
        @brand.main_color = params[:main_color]
        @brand.css_url = params[:css_url]
        @brand.save

        present :success, @brand.present?
        present :data, @brand,with: BrandEntity
    end

  end
end
