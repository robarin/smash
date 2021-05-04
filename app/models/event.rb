class Event < ApplicationRecord
  enum type: {}

  has_many :person_events, dependent: :destroy
  belongs_to :location
end
