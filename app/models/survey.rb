class Survey < ApplicationRecord
  belongs_to :survey_type

  has_many :survey_questions, dependent: :destroy
  has_many :session_surveys, dependent: :destroy

  validates :name, presence: true
end
