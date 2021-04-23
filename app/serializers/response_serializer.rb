class ResponseSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description
end
