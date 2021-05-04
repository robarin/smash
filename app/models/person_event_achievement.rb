class PersonEventAchievement < ApplicationRecord
  belongs_to :person_event
  belongs_to :achievement
end
