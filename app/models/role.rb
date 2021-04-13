class Role < ApplicationRecord
  has_many :person_groups

  validates :name, presence: true, uniqueness: true
end
