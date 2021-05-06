class Event < ApplicationRecord
  belongs_to :event_type
  belongs_to :location

  has_many :event_groups, dependent: :destroy
  has_many :groups, through: :event_groups
  has_many :person_events, dependent: :destroy
end
