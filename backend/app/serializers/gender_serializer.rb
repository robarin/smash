class GenderSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description
end
