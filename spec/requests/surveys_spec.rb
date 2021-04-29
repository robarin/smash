require 'rails_helper'

RSpec.describe 'Surveys', type: :request do

  describe 'GET /v1/surveys' do
    let!(:survey) { create(:survey) }
    let(:params) { { survey_type_name: survey.type.name } }

    it 'returns surveys' do
      as_user do
        get '/v1/surveys', params: params

        expect(response).to have_http_status(200)
        expect(parsed_body['name']).to eq survey.name
        expect(parsed_body['description']).to eq survey.description
        expect(parsed_body['survey_type']['id']).to eq survey.type.id
        expect(parsed_body['survey_type']['name']).to eq survey.type.name
      end
    end
  end
end
