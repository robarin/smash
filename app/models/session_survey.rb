class SessionSurvey < ApplicationRecord
  belongs_to :person
  belongs_to :survey

  has_many :survey_session_answers, dependent: :destroy

  validates :begin_date, presence: true
end
