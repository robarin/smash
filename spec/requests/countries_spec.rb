require 'rails_helper'

RSpec.describe 'Countries', type: :request do

  describe 'GET /v1/countries' do
    let!(:countries) do
      create_list(:country, 2)
      # Country factories + Country of user
      Country.all
    end

    it 'returns countries' do
      as_user do
        get '/v1/countries'

        expect(response).to have_http_status(200)
        parsed_body.each_with_index do |country, idx|
          expect(country['name']).to eq countries[idx].name
          expect(country['description']).to eq countries[idx].description
        end
      end
    end
  end
end
