class ResponseSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description
end
