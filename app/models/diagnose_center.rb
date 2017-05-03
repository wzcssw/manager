class DiagnoseCenter < ApplicationRecord
    has_many :diagnose_center_hospitals
    has_many :hospitals, :through => :diagnose_center_hospitals
end
