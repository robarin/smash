class Role < ApplicationRecord
  has_many :person_groups, dependent: :destroy
  has_many :person_events, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
