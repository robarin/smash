class QuestionResponse < ApplicationRecord
  belongs_to :question
  belongs_to :response

  has_many :survey_session_answers, dependent: :destroy
end
