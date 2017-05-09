class SessionsController < Clearance::SessionsController
    REMEMBER_TOKEN_COOKIE = 'remember_token'.freeze
    layout false
    def show
    end

    def create
        @dc_user = authenticate(params)
        # 验证码校验
        if !verify_rucaptcha?()
            flash[:error] = "验证码错误"
            redirect_to "/sessions"
            return
        end
        # 用户校验
        if @dc_user.blank?
            flash[:error] = "用户名或密码输入错误"
            redirect_to "/sessions"
            return
        else
          sign_in(@dc_user) do |status|
            if status.success?
                flash[:error] = nil
                unless @dc_user.is_admin?
                    flash[:error] = "非管理员用户"
                    redirect_to "/sessions"
                    return
                end
                session[:user] = @dc_user
                redirect_to "/"
            else
              flash[:error] = nil
              redirect_to '/sessions'
            end
          end
        end
    end
    
    def logout
        session[:user] = nil
        redirect_to "/sessions"
    end
end
