class SurveySerializer < ActiveModel::Serializer
  belongs_to :survey_type

  has_many :survey_questions, each_serializer: SurveyQuestionSerializer
  has_many :session_surveys, each_serializer: SessionSurveySerializer

  attributes :id,
             :name,
             :description,
             :created_at
end
