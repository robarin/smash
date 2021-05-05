class Location < ApplicationRecord
  has_many :events, dependent: :destroy
end
