class Group < ApplicationRecord
  has_many :event_groups, dependent: :destroy
  has_many :events, through: :event_groups

  has_many :person_groups, dependent: :destroy
  has_many :people, through: :person_groups

  validates :name, presence: true, uniqueness: true
end
