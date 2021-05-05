class Province < ApplicationRecord
  belongs_to :region

  has_many :persons
  has_many :locations, dependent: :destroy

  validates :name, presence: true
end
