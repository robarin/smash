class Event < ApplicationRecord
  has_many :event_groups, dependent: :destroy
  has_many :groups, through: :event_groups
  has_many :person_events, dependent: :destroy

  belongs_to :location
end
