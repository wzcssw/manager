class DcUserEntity < Grape::Entity
  expose :id, safe: true
  expose :username, safe: true
  expose :realname, safe: true
  expose :phone, safe: true
  expose :email, safe: true
  expose :rank, safe: true
  expose :diagnose_center,with: DiagnoseCenterEntity
  expose :dc_roles, safe: true
end
