class ConsultationCenterEntity < Grape::Entity
  expose :id, safe: true
  expose :name, safe: true
  expose :description, safe: true
  expose :hospital_id, safe: true
  expose :is_open, safe: true
  expose :rank, safe: true
  expose :hospital, safe: true,with: HospitalEntity
end