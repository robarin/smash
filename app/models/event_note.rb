class EventNote < ApplicationRecord
  enum type: {}

  belongs_to :person_event
  belongs_to :rating
end
