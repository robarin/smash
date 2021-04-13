class Gender < ApplicationRecord
  has_many :persons

  validates :name, presence: true
end
