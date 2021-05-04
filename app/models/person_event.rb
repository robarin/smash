class PersonEvent < ApplicationRecord
  has_many :person_event_achievements, dependent: :destroy
  has_many :achievements, through: :person_event_achievements
  has_many :event_notes, dependent: :destroy

  belongs_to :event
  belongs_to :person
  belongs_to :role
end
