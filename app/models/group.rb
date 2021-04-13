class Group < ApplicationRecord
  belongs_to :group_type
  has_many :person_groups

  validates :name, presence: true, uniqueness: true
end
