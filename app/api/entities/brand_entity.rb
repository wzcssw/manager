class BrandEntity < Grape::Entity

  expose :id, safe: true
  expose :name, safe: true
  expose :logo_url, safe: true
  expose :login_bg_url, safe: true
  expose :main_color, safe: true

end
