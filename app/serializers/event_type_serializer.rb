class EventTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description
end
