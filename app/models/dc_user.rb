class DcUser < ApplicationRecord
    has_secure_password
    belongs_to :diagnose_center

    has_many :dc_user_roles
    has_many :dc_roles, :through => :dc_user_roles

    def is_admin?
        self.dc_roles.map(&:code).include? 'dc_admin'
    end
end
