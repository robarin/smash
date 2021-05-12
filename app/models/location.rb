class Location < ApplicationRecord
  belongs_to :location_type
  belongs_to :province

  has_many :events, dependent: :destroy

  validates :city, presence: true
end
