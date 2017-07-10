module SessionHelpers

  def current_user
    user = Manager.where(id: session[:user]['id']).first if session[:user]
  end

  def session
    env['rack.session']
  end

  def user_authenticate!
    error!('没有权限', 401) unless current_user
  end

end
