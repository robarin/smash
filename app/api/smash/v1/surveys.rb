module Smash
  module V1
    class Surveys < Grape::API
      resource :surveys do
        desc 'Get survey'
        params do
          requires :survey_type_name, type: String, desc: 'Survey type name'
        end
        get '/' do
          survey_type = SurveyType.find_by(name: params[:survey_type_name].capitalize)
          survey = survey_type.surveys.first

          SurveySerializer.new(survey).serializable_hash(include: [:survey_type, { survey_questions: { question: {question_responses: :response}}}])
        end
      end
    end
  end
end
