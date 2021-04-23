class SurveyTypeSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :description,
             :created_at

  has_many :surveys, each_serializer: SurveySerializer
end
