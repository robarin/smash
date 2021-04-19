class QuestionSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :body,
             :response_type,
             :created_at

  attribute :question_type do |object|
    QuestionTypeSerializer.new(object.question_type).serializable_hash[:data]
  end

  attribute :question_responses do |object|
    QuestionResponseSerializer.new(object.question_responses).serializable_hash[:data]
  end
end
