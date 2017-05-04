class RoleEntity < Grape::Entity
  expose :id, safe: true
  expose :name, safe: true
  expose :description, safe: true
  expose :code, safe: true
  expose :created_at, safe: true
end
