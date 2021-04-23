module Smash
  module V1
    module Admin
      class SurveyTypes < Grape::API
        helpers do
          def survey_type
            @survey_type ||= ::SurveyType.find(params[:id])
          end

          def update_survey_type
            survey_type.update(params)
          end
        end

        resource :survey_types do
          desc 'GET /survey_types'
          get '/', each_serializer: SurveyTypeSerializer do
            collection = ::SurveyType.includes(:surveys).order(:name)
            ActiveModelSerializers::SerializableResource.new(collection).serializable_hash
          end

          desc 'POST /survey_types'
          params do
            requires :name,        type: String, desc: 'Name of the type'
            optional :description, type: String, desc: 'Decsription of the type'
          end
          post do
            new_survey_type = ::SurveyType.create(params)
            error!({ message: error_message(new_survey_type) }, 400) if new_survey_type.errors.any?

            SurveyTypeSerializer.new(new_survey_type).serializable_hash
          end

          desc 'PATCH /survey_types'
          params do
            requires :name, type: String, desc: 'Name of the type'
            optional :description, type: String, desc: 'Decsription of the type'
          end
          patch '/:id' do
            update_survey_type
            error!({ message: error_message(survey_type) }, 400) if survey_type.errors.any?

            SurveyTypeSerializer.new(survey_type).serializable_hash
          end

          desc 'DELETE /survey_types'
          delete '/:id' do
            survey_type.destroy
            error!({ message: error_message(survey_type) }, 400) unless survey_type.destroyed?

            status :ok
          end
        end
      end
    end
  end
end
