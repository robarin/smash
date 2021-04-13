class Province < ApplicationRecord
  belongs_to :region

  has_many :persons

  validates :name, presence: true
end
