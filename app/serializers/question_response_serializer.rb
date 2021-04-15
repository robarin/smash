class QuestionResponseSerializer
  include JSONAPI::Serializer

  attribute :response do |object|
    ResponseSerializer.new(object.response).as_json["data"]
  end
end
