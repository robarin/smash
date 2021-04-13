class SessionSurvey < ApplicationRecord
  belongs_to :session
  belongs_to :survey

  has_many :survey_session_answers, dependent: :destroy
end
