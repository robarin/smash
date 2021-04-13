class SurveyType < ApplicationRecord
  has_many :surveys, dependent: :destroy

  validates :name, presence: true
end
