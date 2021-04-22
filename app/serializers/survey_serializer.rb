class SurveySerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :created_at

  attribute :survey_type do |object|
    SurveyTypeSerializer.new(object.survey_type).serializable_hash[:data]
  end

  attribute :survey_questions do |object|
    SurveyQuestionSerializer.new(object.survey_questions).serializable_hash[:data]
  end
end
