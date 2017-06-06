class HospitalEntity < Grape::Entity
  expose :id, safe: true
  expose :name, safe: true
  expose :city_id, safe: true
  expose :city_name, safe: true
  expose :hospital_code, safe: true
  expose :in_open, safe: true
  expose :created_at, safe: true
  expose :open_time, safe: true
  expose :close_time, safe: true
  expose :brand, safe: true,with: BrandEntity
  expose :is_unimed, safe: true
  
end
