class DcUser < ApplicationRecord
  has_secure_password(validations: false)
  belongs_to :diagnose_center

  has_many :dc_user_roles
  has_many :dc_roles, :through => :dc_user_roles

  ##认证组件 begin
  include Clearance::User

  def reset_remember_token!
    generate_remember_token
    save validate: false
  end

  def self.authenticate(phone, password)
    dc_user = where(phone: phone).first
    if dc_user
      dc_user =  dc_user.authenticated?(password) ? dc_user : nil
    else
      dc_user = nil
    end
    dc_user
  end

  def is_admin?
      self.dc_roles.map(&:code).include? 'dc_admin'
  end

  private
    # Clearance
    def generate_confirmation_token
      self.confirmation_token = Clearance::Token.new
    end

    def generate_remember_token
      self.remember_token = Clearance::Token.new
    end
end
