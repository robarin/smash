require 'rails_helper'

describe SurveyQuestions::Update::Organize do
  let!(:survey) { create(:survey, :with_questions) }
  let(:response_type) { SurveyQuestion.response_types.keys.sample }
  let(:question) { survey.survey_questions.sample }
  let(:params_with_responses) {
    {
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
      body: Faker::Lorem.sentence,
      response_type: response_type,
      position: 1,
      question_responses: []
    }
  }

  context 'with valid params' do
    describe 'update question with responses' do
      subject(:context) {
        SurveyQuestions::Update::Organize.call(
          survey_question: question,
          params: params_with_responses
        )
      }

      it 'updates the question' do
        expect(context).to be_a_success

        updated_question = context.survey_question.survey.survey_questions.find_by(id: question.id)

        expect(updated_question.body).to eq params_with_responses[:body]
        expect(updated_question.response_type).to eq params_with_responses[:response_type]
        expect(updated_question.position).to eq params_with_responses[:position]

        responses = params_with_responses[:question_responses]
        expect(updated_question.question_responses.count).to eq responses.count

        updated_question.question_responses.each.with_index do |response, index|
          response_attrs = responses[index]
          expect(response.name).to eq response_attrs[:name]
          expect(response.description).to eq response_attrs[:description]
        end
      end
    end

    describe 'update question with deleting responses' do
      subject(:context) {
        SurveyQuestions::Update::Organize.call(
          survey_question: question,
          params: params_without_responses
        )
      }

      it 'updates the question & removes responses' do
        expect(survey.survey_questions.count).to eq 2
        expect(context).to be_a_success

        updated_question = context.survey_question.survey.survey_questions.find_by(id: question.id)

        expect(updated_question.body).to eq params_without_responses[:body]
        expect(updated_question.response_type).to eq params_without_responses[:response_type]
        expect(updated_question.position).to eq params_without_responses[:position]
        expect(updated_question.question_responses.count).to eq 0
      end
    end
  end
end
