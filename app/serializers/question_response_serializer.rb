class QuestionResponseSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :response
end
