module Smash
  module V1
    module Admin
      class Surveys < Grape::API
        helpers do
          def survey
            @survey ||= ::Survey.with_survey_questions.find(params[:id])
          end
        end

        resource :surveys do
          desc 'GET /surveys'
          get '/' do
            surveys = ::Survey.includes(:survey_type).order('survey_types.name, surveys.name  asc')

            ActiveModelSerializers::SerializableResource.new(surveys).serializable_hash
          end

          desc 'GET /surveys/:id'
          get '/:id' do
            SurveySerializer.new(survey).serializable_hash(include: :survey_questions)
          end
        end
      end
    end
  end
end
