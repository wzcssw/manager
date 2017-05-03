class DiagnoseCenterEntity < Grape::Entity
  expose :id, safe: true
  expose :name, safe: true
  expose :description, safe: true
  expose :is_open, safe: true
  expose :rank, safe: true
  expose :hospitals,with: HospitalEntity

end
