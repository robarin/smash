class SessionSurveySerializer < ActiveModel::Serializer
  belongs_to :session
  belongs_to :survey

  has_many :survey_session_answers, each_serializer:  SurveySessionAnswerSerializer
end
