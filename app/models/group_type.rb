class GroupType < ApplicationRecord
  has_many :groups

  validates :name, presence: true
end
