require 'rails_helper'

RSpec.describe "Admin::SurveyTypes", type: :request do
  describe "GET /v1/admin/survey_types" do
    before { create_list(:survey_type, 3, :basic) }
    let(:collection) {
      ActiveModelSerializers::SerializableResource.new(::SurveyType.includes(:surveys).order(:name)).to_json
    }

    it "returns survey types" do
      get "/v1/admin/survey_types"

      expect(response).to have_http_status(200)
      expect(response.body).to eq collection
    end
  end

  describe "POST /v1/admin/survey_types" do
    let(:params) do
      {
        name: 'New survey type',
        description: 'New survey type description'
      }
    end

    it "returns survey types" do
      post "/v1/admin/survey_types",
        params: params

      parsed_body = JSON.parse(response.body)
      expect(response).to have_http_status(201)
      expect(parsed_body['name']).to eq(params[:name])
      expect(parsed_body['description']).to eq(params[:description])
    end
  end

  describe "PATCH /v1/admin/survey_types/:id" do
    let(:survey_type) { create(:survey_type, :basic) }
    let(:new_attributes) do
      {
        name: 'New name',
        description: 'New description'
      }
    end

    it "updates specific survey type" do
      patch "/v1/admin/survey_types/#{survey_type.id}",
        params:  { name: 'New name', description: 'New description' }

      parsed_body = JSON.parse(response.body)

      expect(response).to have_http_status(200)
      expect(parsed_body['name']).to eq(new_attributes[:name])
      expect(parsed_body['description']).to eq(new_attributes[:description])
    end
  end

  describe "DELETE /v1/admin/survey_types/:id" do
    let(:survey_type) { create(:survey_type, :basic) }

    it "deletes specific survey type" do
      delete "/v1/admin/survey_types/#{survey_type.id}"

      expect(response).to have_http_status(200)
      expect { survey_type.reload }.to raise_error ActiveRecord::RecordNotFound
    end
  end
end
