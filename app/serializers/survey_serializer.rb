class SurveySerializer < ActiveModel::Serializer
  belongs_to :survey_type, serializer: SurveyTypeSerializer

  has_many :survey_questions, each_serializer: SurveyQuestionSerializer
  has_many :session_surveys, each_serializer: SessionSurveySerializer

  attributes :id,
             :name,
             :description,
             :created_at,
             :response_types

  def survey_questions
    questions = object.survey_questions.includes(:question_responses)
    return questions unless @instance_options[:questions_amount]

    questions.first(@instance_options[:questions_amount])
  end

  def response_types
    SurveyQuestion.response_types.keys
  end
end
