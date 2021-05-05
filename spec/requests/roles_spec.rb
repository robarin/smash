require 'rails_helper'

RSpec.describe 'Roles', type: :request do

  describe 'GET /v1/roles' do
    it 'returns roles' do
      as_user do
        get '/v1/roles'

        expect(response).to have_http_status(200)

        roles = ["student", "recruiter"]

        expect(parsed_body).to eq roles
      end
    end
  end
end
