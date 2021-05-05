require 'rails_helper'
require 'faker'

RSpec.describe Smash::V1::Admin::SurveyQuestions, type: :request do
  let!(:survey) { create(:survey, :with_questions) }
  let(:response_type) { SurveyQuestion.response_types.keys.sample }
  let(:question) { survey.survey_questions.last }
  let(:params_with_responses) {
    {
      survey_id: survey.id,
      body: Faker::Lorem.sentence,
      response_type: response_type,
      position: 1,
      question_responses: [
        {
          name: Faker::Lorem.sentence,
          description: Faker::Lorem.sentence
        }
      ]
    }
  }
  let(:params_without_responses) {
    {
      survey_id: survey.id,
      body: Faker::Lorem.sentence,
      response_type: response_type,
      position: 1,
      question_responses: []
    }
  }

  describe 'POST /survey_questions' do
    context 'with valid params' do
      describe 'with responses' do
        it 'creates new survey_question & sends new survey_question' do
          send_request(:post, '/v1/admin/survey_questions', params: params_with_responses)

          parsed_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
          survey_questions = questions_attributes(survey.reload)

          parsed_body.each.with_index do |parsed_question, index|
            parsed_attrs = parsed_question.slice(:id, :body, :position, :response_type, :question_responses)
            question_attrs = survey_questions[index].slice(:id, :body, :position, :response_type, :question_responses)
            parsed_survey_attrs = parsed_question[:survey].slice(:id, :name, :description, :response_types)
            survey_attrs = survey_questions[index][:survey].slice(:id, :name, :description, :response_types)

            expect(parsed_attrs).to eq question_attrs
            expect(parsed_survey_attrs).to eq survey_attrs
          end
        end
      end

      describe 'without responses' do
        it 'creates new survey_question & sends new survey_question' do
          send_request(:post,'/v1/admin/survey_questions', params: params_without_responses)

          new_question = SurveyQuestion.last
          parsed_body = JSON.parse(response.body).map(&:deep_symbolize_keys)

          survey_questions = questions_attributes(survey.reload)

          parsed_body.each.with_index do |parsed_question, index|
            parsed_attrs = parsed_question.slice(:id, :body, :position, :response_type, :question_responses)
            question_attrs = survey_questions[index].slice(:id, :body, :position, :response_type, :question_responses)
            parsed_survey_attrs = parsed_question[:survey].slice(:id, :name, :description, :response_types)
            survey_attrs = survey_questions[index][:survey].slice(:id, :name, :description, :response_types)

            expect(parsed_attrs).to eq question_attrs
            expect(parsed_survey_attrs).to eq survey_attrs
          end

          expect(new_question.question_responses.count).to eq 0
        end
      end
    end

    context 'invalid params' do
      describe 'without survey_id' do
        it 'responds with status 400' do
          send_request(:post,'/v1/admin/survey_questions',
                       params: params_without_responses.except(:survey_id))

          expect(response.status).to eq 400
          expect(JSON.parse(response.body)['error']).to eq 'survey_id is missing'
        end
      end

      describe 'without body' do
        it 'responds with status 400' do
          send_request(:post,'/v1/admin/survey_questions',
                       params: params_without_responses.except(:body))

          expect(response.status).to eq 400
          expect(JSON.parse(response.body)['error']).to eq 'body is missing'
        end
      end

      describe 'without response_type' do
        it 'responds with status 400' do
          send_request(:post,'/v1/admin/survey_questions',
                       params: params_without_responses.except(:response_type))

          expect(response.status).to eq 400
          expect(JSON.parse(response.body)['error']).to eq 'response_type is missing'
        end
      end
    end
  end

  describe 'PATCH /survey_questions/:id' do
    context 'with valid params' do
      describe 'with all attributes' do
        it 'creates new survey_question & sends new survey_question' do
          send_request(:patch,"/v1/admin/survey_questions/#{question.id}",
                       params: params_with_responses.except(:survey_id))

          parsed_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
          survey_questions = questions_attributes(survey.reload)

          parsed_body.each.with_index do |parsed_question, index|
            parsed_attrs = parsed_question.slice(:id, :body, :position, :response_type, :question_responses)
            question_attrs = survey_questions[index].slice(:id, :body, :position, :response_type, :question_responses)
            parsed_survey_attrs = parsed_question[:survey].slice(:id, :name, :description, :response_types)
            survey_attrs = survey_questions[index][:survey].slice(:id, :name, :description, :response_types)

            expect(parsed_attrs).to eq question_attrs
            expect(parsed_survey_attrs).to eq survey_attrs
          end
        end
      end

      describe 'without changing responses' do
        it 'creates new survey_question & sends new survey_question' do
          question_responses = question_responses(question)

          send_request(:patch,"/v1/admin/survey_questions/#{question.id}",
                       params: params_without_responses.except(:survey_id)
                                 .deep_merge(question_responses: question_responses))

          parsed_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
          updated_question = parsed_body.find { |q| q[:id] == question.id }
          survey_questions = questions_attributes(survey.reload)

          parsed_body.each.with_index do |parsed_question, index|
            parsed_attrs = parsed_question.slice(:id, :body, :position, :response_type, :question_responses)
            question_attrs = survey_questions[index].slice(:id, :body, :position, :response_type, :question_responses)
            parsed_survey_attrs = parsed_question[:survey].slice(:id, :name, :description, :response_types)
            survey_attrs = survey_questions[index][:survey].slice(:id, :name, :description, :response_types)

            expect(parsed_attrs).to eq question_attrs
            expect(parsed_survey_attrs).to eq survey_attrs
          end

          expect(updated_question[:question_responses]).to eq question_responses
        end
      end

      describe 'with removed responses' do
        it 'creates new survey_question & sends new survey_question' do
          responses_all = QuestionResponse.count
          responses_count = question.question_responses.count
          send_request(:patch,"/v1/admin/survey_questions/#{question.id}",
                       params: params_without_responses.except(:survey_id))

          parsed_body = JSON.parse(response.body).map(&:deep_symbolize_keys)
          updated_question = parsed_body.find { |q| q[:id] == question.id }
          survey_questions = questions_attributes(survey.reload)

          parsed_body.each.with_index do |parsed_question, index|
            parsed_attrs = parsed_question.slice(:id, :body, :position, :response_type, :question_responses)
            question_attrs = survey_questions[index].slice(:id, :body, :position, :response_type, :question_responses)
            parsed_survey_attrs = parsed_question[:survey].slice(:id, :name, :description, :response_types)
            survey_attrs = survey_questions[index][:survey].slice(:id, :name, :description, :response_types)

            expect(parsed_attrs).to eq question_attrs
            expect(parsed_survey_attrs).to eq survey_attrs
          end

          expect(updated_question[:question_responses]).to eq []
          expect(QuestionResponse.count).to eq (responses_all - responses_count)
        end
      end
    end

    context 'invalid params' do
      describe 'without body' do
        it 'responds with status 400' do
          send_request(:patch,"/v1/admin/survey_questions/#{question.id}",
                       params: params_without_responses.except(:body))

          expect(response.status).to eq 400
          expect(JSON.parse(response.body)['error']).to eq 'body is missing'
        end
      end

      describe 'without response_type' do
        it 'responds with status 400' do
          send_request(:patch,"/v1/admin/survey_questions/#{question.id}",
                       params: params_without_responses.except(:response_type))

          expect(response.status).to eq 400
          expect(JSON.parse(response.body)['error']).to eq 'response_type is missing'
        end
      end
    end
  end

  def questions_attributes(survey)
    ActiveModelSerializers::SerializableResource.new(
      survey.survey_questions.includes(:question_responses).order(:position)
    ).serializable_hash(include: :question_responses)
  end

  def question_responses(question)
    question.question_responses
      .map(&:attributes)
      .map(&:deep_symbolize_keys)
      .map { |r| r.slice(:id, :name, :description) }
  end
end
