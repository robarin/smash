class SurveyTypeSerializer
  include JSONAPI::Serializer

  attributes :id,
             :name,
             :description,
             :created_at
end
