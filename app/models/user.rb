class User < ApplicationRecord
  belongs_to :role
  belongs_to :hospital, required: false
  has_many :doctor_hospitals

  has_secure_password(validations: false)

  def authenticate? password
    self && self.password_digest? && self.authenticate(password) ? self : nil
  end

  def self.GetShowData(params)
    dp_arr = User.all
    if params[:q].present?
      dp_arr = dp_arr.where("realname = ?",params[:q])
    end
    if params[:role_id].present?
      dp_arr = dp_arr.where("role_id = ?",params[:role_id])
    end
    return dp_arr
  end
end
