module Smash
  module V1
    module Admin
      class Surveys < Grape::API
        resource :surveys do
          desc 'GET /surveys'
          get '/' do
            surveys = ::Survey.includes(:survey_type).order('survey_types.name, surveys.name  asc')

            SurveySerializer.new(surveys).serializable_hash
          end
        end
      end
    end
  end
end
