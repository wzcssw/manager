class ConsultationEntity < Grape::Entity
  expose :id, safe: true
  expose :consultation_center_id, safe: true
  expose :username, safe: true
  expose :realname, safe: true
  expose :phone, safe: true
  expose :email, safe: true
  expose :is_use, safe: true
  expose :cc_role_id, safe: true
  expose :rank, safe: true
  expose :cc_role, safe: true,with: CcRoleEntity
  expose :consultation_center, safe: true,with: ConsultationCenterEntity
end