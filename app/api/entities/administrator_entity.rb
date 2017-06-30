class AdministratorEntity < Grape::Entity
  expose :id, safe: true
  expose :username, safe: true
  expose :realname, safe: true
  expose :phone, safe: true
  expose :role, safe: true
  expose :role_zh, safe: true
  expose :disable, safe: true
  expose :created_at, safe: true
end
