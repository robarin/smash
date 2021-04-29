require 'rails_helper'

RSpec.describe "Admin::Surveys", type: :request do
  describe "GET /v1/admin/surveys/" do
    let!(:surveys) { create_list(:survey, 2) }

    it "get surveys" do
      get "/v1/admin/surveys"

      expect(response).to have_http_status(200)
      sorted_response_body.each_with_index do |survey, idx|
        expect(survey['name']).to eq surveys[idx][:name]
        expect(survey['description']).to eq surveys[idx][:description]
      end
    end
  end

  describe "POST /v1/admin/surveys" do
    let(:survey_type) { create(:survey_type, :basic) }
    let(:params) do
      {
        name: 'New survey',
        description: 'New survey description',
        survey_type_id: survey_type.id
      }
    end

    it "create survey" do
      post "/v1/admin/surveys",
        params: params

      expect(response).to have_http_status(201)
      expect(parsed_body['name']).to eq params[:name]
      expect(parsed_body['description']).to eq params[:description]
      expect(parsed_body['survey_type']['id']).to eq survey_type.id
      expect(parsed_body['survey_type']['name']).to eq survey_type.name
      expect(parsed_body['survey_type']['description']).to eq survey_type.description
    end
  end

  describe "PATCH /v1/admin/surveys/:id" do
    let(:survey) { create(:survey) }
    let(:new_survey_type) { create(:survey_type, :basic) }
    let(:params) do
      {
        name: 'Updated name',
        description: 'Updated description',
        survey_type_id: new_survey_type.id
      }
    end

    it "update survey" do
      patch "/v1/admin/surveys/#{survey.id}",
        params: params

      expect(response).to have_http_status(200)
      expect(parsed_body['name']).to eq params[:name]
      expect(parsed_body['description']).to eq params[:description]
      expect(parsed_body['survey_type']['id']).to eq new_survey_type.id
      expect(parsed_body['survey_type']['name']).to eq new_survey_type.name
      expect(parsed_body['survey_type']['description']).to eq new_survey_type.description
    end
  end

  describe 'GET /surveys/:id' do
    let!(:surveys) { create_list(:survey, 2, :with_questions) }

    describe 'when survey id is valid' do
      it 'responds with surveys' do
        survey = surveys.first
        get "/v1/admin/surveys/#{survey.id}"

        expect(response.status).to eq 200

        body = parsed_body.deep_symbolize_keys
        survey_type_details = survey.survey_type.attributes.deep_symbolize_keys.except(:updated_at, :created_at)
        question_details = survey.survey_questions.map do |question|
          {
            id: question.id,
            body: question.body,
            position: question.position,
            response_type: question.response_type,
            question_responses: question.question_responses.map do |response|
              { id: response.id, name: response.name, description: response.description }
            end
          }
        end

        expect(body[:id]).to eq survey.id
        expect(body[:name]).to eq survey.name
        expect(body[:description]).to eq survey.description
        expect(body[:response_types]).to eq SurveyQuestion.response_types.keys
        expect(body[:survey_type].except(:created_at)).to eq survey_type_details
        expect(body[:survey_questions]).to eq question_details
      end
    end
  end
end
