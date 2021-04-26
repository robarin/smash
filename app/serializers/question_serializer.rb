class QuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :body,
             :response_type,
             :created_at

  belongs_to :question_type
  has_many :question_responses, each_serializer: QuestionResponseSerializer
end
