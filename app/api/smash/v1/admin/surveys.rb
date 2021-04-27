module Smash
  module V1
    module Admin
      class Surveys < Grape::API
        helpers do
          def create_survey
            @survey ||= survey_type.surveys.create(name: params[:name], description: params[:description])
          end

          def update_survey
            survey.tap do |survey|
              survey.update(
                survey_type: survey_type,
                name: params[:name],
                description: params[:description]
              )
            end
          end

          def survey_type
            @survey_type ||= ::SurveyType.find(params[:survey_type_id])
          end

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
            SurveySerializer.new(survey).serializable_hash(include: [:survey_type, survey_questions: :question_responses])
          end

          desc 'POST /surveys'
          params do
            requires :survey_type_id, type: Integer
            requires :name, type: String
            optional :description, type: String
          end
          post '/' do
            if create_survey.errors.any?
              error!({ message: error_message(create_survey) }, 400)
            else
              SurveySerializer.new(create_survey).serializable_hash
            end
          end

          desc 'PATCH /surveys/:id'
          params do
            requires :survey_type_id, type: Integer
            requires :name, type: String
            optional :description, type: String
          end
          patch '/:id' do
            if update_survey.errors.any?
              error!({ message: error_message(survey) }, 400)
            else
              SurveySerializer.new(survey).serializable_hash
            end
          end
        end
      end
    end
  end
end
