require 'rails_helper'

RSpec.describe 'Admin::Tag', type: :request do
  describe 'GET /v1/admin/tags' do
    let!(:tags) do
      ActiveModelSerializers::SerializableResource.new(
        create_list(:tag, 2)
      ).serializable_hash
    end

    it 'returns tags' do
      get '/v1/admin/tags'

      expect(parsed_body).to eq tags
    end
  end

  describe 'POST /v1/admin/tags' do
    let(:params) do
      {
        name: 'New tag',
        description: 'New tag description'
      }
    end

    it 'creates new tag' do
      post '/v1/admin/tags', params: params

      expect(parsed_body['name']).to eq params[:name]
      expect(parsed_body['description']).to eq params[:description]
    end

    it 'does not create new tag if name not passed' do
      post '/v1/admin/tags'

      expect(parsed_body).to eq('message' => "Name can't be blank")
    end
  end

  describe 'PATCH /v1/admin/tags/:id' do
    let!(:tag) { FactoryBot.create(:tag) }
    let(:new_params) do
      {
        name: 'Updated name',
        description: 'Updated description'
      }
    end

    it 'updates specific tag' do
      patch "/v1/admin/tags/#{tag.id}", params: new_params

      expect(parsed_body['name']).to eq(new_params[:name])
      expect(parsed_body['description']).to eq(new_params[:description])
    end
  end

  describe 'DELETE /v1/admin/tags/:id' do
    let!(:tag) { FactoryBot.create(:tag) }

    it 'delete specific tag' do
      expect { delete "/v1/admin/tags/#{tag.id}" }.to change{ Tag.count }.from(1).to(0)
    end
  end
end
