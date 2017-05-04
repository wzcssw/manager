class SessionsController < ApplicationController
    layout false
    def show
    end

    def create
        username = params[:sessions]["name"]
        password = params[:sessions]["password"]
        @user = DcUser.where(username: username).first if username.present?
        if !verify_rucaptcha?(@user)
            flash[:error] = "验证码错误"
            redirect_to "/sessions"
            return
        end
        if @user.present? && @user.authenticate(password).present?
            unless @user.is_admin?
                flash[:error] = "非管理员用户"
                redirect_to "/sessions"
                return
            end
            session[:user] = @user
            redirect_to "/"
        else
            flash[:error] = "用户名或密码输入错误"
            redirect_to "/sessions"
        end
    end
    
    def logout
        session[:user] = nil
        redirect_to "/sessions"
    end
end
