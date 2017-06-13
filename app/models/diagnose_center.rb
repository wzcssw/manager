class DiagnoseCenter < ApplicationRecord
    has_many :diagnose_center_hospitals
    has_many :hospitals, :through => :diagnose_center_hospitals
    has_many :dc_clients

    enum examine_type: %i(single_sign double_sign)
end
