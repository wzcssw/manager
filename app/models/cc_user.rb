class CcUser < ApplicationRecord
    belongs_to :cc_role
    belongs_to :consultation_center
    has_secure_password(validations: false)
end
