require 'rails_helper'

RSpec.describe "Admin::Users", type: :request do
  describe "GET /v1/admin/users" do
    let!(:users) { create_list(:user, 2) }

    it "returns tag types" do
      get "/v1/admin/users"

      expect(response).to have_http_status(200)
      parsed_body.each_with_index do |user, idx|
        expect(user['email']).to eq users[idx][:email]
      end
    end
  end
end
