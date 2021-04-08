class Survey < ApplicationRecord
  has_many :survey_questions, dependent: :destroy
  has_many :session_surveys, dependent: :destroy

  validates :name, presence: true
end
