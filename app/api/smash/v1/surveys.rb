module Smash
  module V1
    class Surveys < Grape::API
      helpers do
        def survey_type_name
          params[:survey_type_name].capitalize
        end

        def survey_type
          @survey_type ||= SurveyType.find_by(name: survey_type_name)
        end

        def survey
          @survey ||= survey_type.surveys.includes(survey_questions: :question).first
        end
      end

      resource :surveys do
        desc 'Get survey'
        params do
          requires :survey_type_name, type: String, desc: 'Survey type name'
        end
        get '/' do
          SurveySerializer
            .new(survey)
            .serializable_hash(
              include: [
                :survey_type,
                {
                  survey_questions: {
                    question: {
                      question_responses: :response
                    }
                  }
                }
              ]
            )
        end
      end
    end
  end
end
