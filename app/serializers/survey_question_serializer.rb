class SurveyQuestionSerializer < ActiveModel::Serializer
  belongs_to :survey

  has_many :question_responses, each_serializer: QuestionResponseSerializer

  attributes :id,
             :body,
             :position,
             :created_at,
             :response_type,
             :position
end
