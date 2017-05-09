Clearance.configure do |config|
  config.allow_sign_up = true
  config.cookie_domain = 'tongxinyilian.com'
  config.cookie_expiration = ->(cookies) { 1.day.from_now }
  config.cookie_path = '/'
  config.routes = false
  config.httponly = false
  config.mailer_sender = 'reply@tongxinyilian.com'
  config.password_strategy = Clearance::PasswordStrategies::BCrypt
  config.redirect_url = '/sessions'
  config.secure_cookie = false
  config.sign_in_guards = []
  config.user_model = DcUser
end
