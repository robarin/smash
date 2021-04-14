class ProvinceSerializer
  include JSONAPI::Serializer

  attributes :name, :description
end
