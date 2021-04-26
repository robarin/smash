class QuestionResponseSerializer < ActiveModel::Serializer
  belongs_to :survey_question

  has_many :survey_session_answers, each_serializer: SurveySessionAnswerSerializer

  attributes :id, :name, :description
end
