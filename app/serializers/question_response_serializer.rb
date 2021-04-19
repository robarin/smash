class QuestionResponseSerializer
  include JSONAPI::Serializer

  attribute :response do |object|
    ResponseSerializer.new(object.response).serializable_hash[:data]
  end
end
