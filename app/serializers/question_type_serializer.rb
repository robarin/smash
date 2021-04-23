class QuestionTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :created_at

  has_many :questions, serializer: QuestionSerializer
end
