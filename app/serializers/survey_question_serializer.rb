class SurveyQuestionSerializer < ActiveModel::Serializer
  belongs_to :survey

  has_many :question_responses, each_serializer: QuestionResponseSerializer

  attributes :id,
             :body,
             :position,
             :response_type
end
