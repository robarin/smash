class GenderSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description
end
