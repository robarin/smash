require 'rails_helper'

RSpec.describe 'Roles', type: :request do

  describe 'GET /v1/roles' do
    let!(:roles) { create_list(:role, 2) }

    it 'returns roles' do
      as_user do
        get '/v1/roles'

        expect(response).to have_http_status(200)
        parsed_body.each_with_index do |role, idx|
          expect(role['name']).to eq roles[idx][:name]
          expect(role['description']).to eq roles[idx][:description]
        end
      end
    end
  end
end
