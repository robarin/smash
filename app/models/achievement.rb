class Achievement < ApplicationRecord
  has_many :person_event_achievements, dependent: :destroy
  has_many :person_events, through: :person_event_achievements
end
