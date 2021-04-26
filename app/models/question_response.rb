class QuestionResponse < ApplicationRecord
  belongs_to :survey_question

  has_many :survey_session_answers, dependent: :destroy

  validates :name, presence: true
end
