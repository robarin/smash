class QuestionSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :body,
             :created_at

  attribute :question_type do |object|
    QuestionTypeSerializer.new(object.question_type).as_json["data"]
  end

  attribute :question_responses do |object|
    QuestionResponseSerializer.new(object.question_responses).as_json["data"]
  end
end
