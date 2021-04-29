module Smash
  module V1
    class Surveys < Grape::API
      helpers do
        def survey_name
          params[:survey_name].capitalize
        end

        def survey
          @survey ||= Survey.find_by(name: survey_name)
        end

        def basic_survey_options
          {
            questions_amount: ::Survey::BASIC_SURVEY_QUESTIONS_AMOUNT
          }
        end
      end

      resource :surveys do
        desc 'Get survey'
        params do
          requires :survey_name, type: String, desc: 'Survey name'
        end
        get '/' do
          SurveySerializer
            .new(survey)
            .serializable_hash(
              include: [:survey_type, {survey_questions: :question_responses}]
            )
        end

        desc 'Get basic survey'
        get '/basic' do
          SurveySerializer
            .new(Survey.basic, basic_survey_options)
            .serializable_hash(
              include: {survey_questions: :question_responses}
            )
        end

        namespace :results do
          desc 'Post survey result'
          params do
            requires :survey_result, type: Hash, desc: 'Survey results'
          end
          post '/' do
            result = ::Surveys::Result::Organize.call(person: current_user.person, params: params)
            error!({message: result.message}, 400) if result.failure?

            status :ok
          end
        end
      end
    end
  end
end
