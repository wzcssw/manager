class DiagnoseCenterHospital < ApplicationRecord
    belongs_to :hospital
    belongs_to :diagnose_center
end
