class TagTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description
end
