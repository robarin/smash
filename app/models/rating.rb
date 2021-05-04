class Rating < ApplicationRecord
  has_many :event_notes, dependent: :destroy
end
