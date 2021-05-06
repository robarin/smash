class LocationType < ApplicationRecord
  has_many :locations, dependent: :destroy

  validates :name, presence: true
end
