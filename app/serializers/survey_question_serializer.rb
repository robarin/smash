class SurveyQuestionSerializer
  include JSONAPI::Serializer

  attributes :id,
             :position,
             :created_at

  attribute :question do |object|
    QuestionSerializer.new(object.question).as_json["data"]
  end
end
