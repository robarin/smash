class SurveySessionAnswerSerializer < ActiveModel::Serializer
  belongs_to :session_survey
  belongs_to :question_response

  attributes :body
end
