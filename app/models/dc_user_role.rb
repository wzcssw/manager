class DcUserRole < ApplicationRecord
    belongs_to :dc_user
    belongs_to :dc_role
end
