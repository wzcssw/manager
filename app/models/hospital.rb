class Hospital < ApplicationRecord
  has_many :hospital_project_bodies
  has_many :projects ,:through => :hospital_project_bodies
  has_many :body_groups ,:through => :hospital_project_bodies
  has_many :bodies ,:through => :hospital_project_bodies
  scope :code_by, ->(hospital_code){hospital_code.blank? ? nil : where(hospital_code: hospital_code).first}
  scope :opened, ->{where(open: true)}


  def self.GetShowData(params)
    dp_arr = Hospital.all
    if params[:city_id].present?
      dp_arr = dp_arr.where("city_id = ?",params[:city_id])
    end
    if params[:is_open].present?
      dp_arr = dp_arr.where("in_open = ?",params[:is_open])
    end
    if params[:keyword].present?
      temp_like = "%#{params[:keyword]}%"
      dp_arr = dp_arr.where("name like ?",temp_like)
    end
    dp_arr = dp_arr.order("id desc")
    return dp_arr
  end
end
