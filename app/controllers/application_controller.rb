class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  before_action :login?

  private
    def login?
      if session[:user].blank? && request.path != "/sessions"
        redirect_to "/sessions"
      end
    end
end