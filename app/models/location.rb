class Location < ApplicationRecord
  enum type: {}

  has_many :events, dependent: :destroy
end
