module Smash
  module V1
    module Admin
      class SurveyQuestions < Grape::API
        helpers do
          def update_survey_question
            @result ||= ::SurveyQuestions::Update::Organize.call(
              survey_question: survey_question,
              params: params
            )
          end

          def create_survey_question
            @result ||= ::SurveyQuestions::New::Organize.call(
              survey: survey,
              params: params
            )
          end

          def survey_question
            @survey_question ||= ::SurveyQuestion.find(params[:id])
          end

          def survey
            @survey ||= params[:survey_id] ? Survey.find(params[:survey_id]) : survey_question.survey
          end

          def survey_questions
            survey.survey_questions
          end
        end

        resource :survey_questions do
          desc 'POST /survey_questions'
          params do
            requires :survey_id, type: Integer
            requires :body, type: String
            requires :response_type, type: String
            requires :position, type: Integer
            optional :question_responses, type: Array do
              optional :id
              requires :name
              requires :description
            end
          end
          post '/' do
            if create_survey_question.failure?
              error!({ message: create_survey_question.message }, 400)
            else
              ActiveModelSerializers::SerializableResource.new(
                survey_questions.includes(:question_responses).order(:position)
              ).serializable_hash(include: :question_responses)
            end
          end

          desc 'PATCH /survey_questions/:id'
          params do
            requires :body, type: String
            requires :response_type, type: String
            requires :position, type: Integer
            optional :question_responses, type: Array do
              optional :id
              requires :name
              requires :description
            end
          end
          patch '/:id' do
            if update_survey_question.failure?
              error!({ message: update_survey_question.message }, 400)
            else
              ActiveModelSerializers::SerializableResource.new(
                survey_questions.includes(:question_responses).order(:position)
              ).serializable_hash(include: :question_responses)
            end
          end
        end
      end
    end
  end
end
