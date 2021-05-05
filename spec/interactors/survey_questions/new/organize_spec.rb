require 'rails_helper'

describe SurveyQuestions::New::Organize do
  let!(:survey) { create(:survey) }
  let!(:survey_with_questions) { create(:survey, :with_questions) }
  let!(:questions_count) { survey_with_questions.survey_questions.count }
  let(:response_type) { SurveyQuestion.response_types.keys.sample }
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
        },
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

  context 'with valid params' do
    describe 'add question with responses to empty survey' do
      subject(:context) {
        SurveyQuestions::New::Organize.call(
          survey: survey,
          params: params_with_responses
        )
      }

      it 'creates new question with responses' do
        expect(survey.survey_questions.count).to eq 0
        expect(context).to be_a_success

        new_question = context.survey.survey_questions.last

        expect(new_question.body).to eq params_with_responses[:body]
        expect(new_question.response_type).to eq params_with_responses[:response_type]
        expect(new_question.position).to eq params_with_responses[:position]

        responses = params_with_responses[:question_responses]

        new_question.question_responses.each.with_index do |response, index|
          response_attrs = responses[index]
          expect(response.name).to eq response_attrs[:name]
          expect(response.description).to eq response_attrs[:description]
        end
      end
    end

    describe 'add question without responses to empty survey' do
      subject(:context) {
        SurveyQuestions::New::Organize.call(
          survey: survey,
          params: params_without_responses
        )
      }

      it 'creates new question with responses' do
        expect(survey.survey_questions.count).to eq 0
        expect(context).to be_a_success

        new_question = context.survey.survey_questions.last

        expect(new_question.body).to eq params_without_responses[:body]
        expect(new_question.response_type).to eq params_without_responses[:response_type]
        expect(new_question.position).to eq params_without_responses[:position]
        expect(new_question.question_responses.count).to eq 0
      end
    end

    describe 'add question without responses to survey with questions' do
      subject(:context) {
        SurveyQuestions::New::Organize.call(
          survey: survey_with_questions,
          params: params_without_responses
        )
      }

      it 'creates new question with responses' do
        expect(survey_with_questions.survey_questions.count).to eq questions_count
        expect(context).to be_a_success

        new_question = context.survey.survey_questions.find_by(position: params_without_responses[:position])

        expect(new_question.body).to eq params_without_responses[:body]
        expect(new_question.response_type).to eq params_without_responses[:response_type]
        expect(new_question.position).to eq params_without_responses[:position]
        expect(new_question.question_responses.count).to eq 0
      end
    end
  end
end
