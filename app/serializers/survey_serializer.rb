class SurveySerializer < ActiveModel::Serializer
  belongs_to :survey_type
  has_many :survey_questions

  attributes :id,
             :name,
             :description,
             :created_at
end
