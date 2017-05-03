class DcRole < ApplicationRecord
    has_many :dc_user_roles
    has_many :dc_users, :through => :dc_user_roles
end
