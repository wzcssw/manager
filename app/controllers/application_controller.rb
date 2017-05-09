class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  # Clearance begin
  include Clearance::Controller
  include Clearance::Authentication
  include Clearance::Authorization

  before_action :login?

  protected
  def authenticate(params)
    DcUser.authenticate(user_from_params.delete(:username), user_from_params.delete(:password))
  end

  def sign_in(user)
    user.reset_remember_token! if user
    super
  end

  def current_user
    super
  end

  private
  def user_from_params
    params[:sessions] || Hash.new
  end
  # Clearance end
  def login?
    if session[:user].blank? && request.path != "/sessions"
      redirect_to "/sessions"
    end
  end
end
