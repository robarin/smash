class TagTypeSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description
end