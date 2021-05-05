class EventNote < ApplicationRecord
  belongs_to :person_event
  belongs_to :rating
end
