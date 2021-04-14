class RoleSerializer
  include JSONAPI::Serializer

  attributes :name, :description
end
