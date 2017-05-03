class DcUser < ApplicationRecord
    has_secure_password
    belongs_to :diagnose_center

    has_many :dc_user_roles
    has_many :dc_roles, :through => :dc_user_roles
end
