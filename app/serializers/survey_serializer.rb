class SurveySerializer
  include JSONAPI::Serializer

  has_many :survey_questions

  attributes :id,
             :name,
             :description,
             :created_at

  attribute :survey_type do |object|
    SurveyTypeSerializer.new(object.survey_type).serializable_hash[:data]
  end
end
