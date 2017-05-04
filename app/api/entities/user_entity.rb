class UserEntity < Grape::Entity
  expose :id, safe: true
  expose :name, safe: true
  expose :realname, safe: true
  expose :phone, safe: true
  expose :hospital_id, safe: true
  expose :role_id, safe: true
  expose :is_delete, safe: true

  expose :hospital, safe: true, with: HospitalEntity
  expose :role, safe: true, with: RoleEntity
end
