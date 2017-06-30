class Manager < ApplicationRecord
    has_secure_password(validations: false)
    enum role: %i( admin other )

    ROLES = {admin: "管理员",other: "其他"}

    def role_zh
        ROLES[self.role.to_sym]
    end
end
