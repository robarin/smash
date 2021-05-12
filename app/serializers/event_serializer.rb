class EventSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :date

  belongs_to :location, serializer: LocationSerializer
  belongs_to :event_type, serializer: EventTypeSerializer

  has_many :groups, through: :event_groups, each_serializer: GroupSerializer
end
