class SurveyQuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :position,
             :created_at

  belongs_to :survey
  belongs_to :question
end
