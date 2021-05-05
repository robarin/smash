class Location < ApplicationRecord
  belongs_to :province

  has_many :events, dependent: :destroy

  validates :name, :city, :street_number, presence: true
  validates :city, uniqueness: true
end
