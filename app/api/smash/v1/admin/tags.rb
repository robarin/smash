module Smash
  module V1
    module Admin
      class Tags < Grape::API
        helpers do
          def tag
            @tag ||= ::Tag.find(params[:id])
          end

          def new_tag
            @tag ||= ::Tag.create(params)
          end
        end

        resource :tags do
          desc 'GET /tags'
          get '/' do
            tags = Tag.order(name: :asc)

            ActiveModelSerializers::SerializableResource.new(tags).serializable_hash
          end

          desc 'POST /tags'
          params do
            optional :name, type: String
            optional :description, type: String
          end
          post '/' do
            if new_tag.errors.any?
              error!({ message: error_message(new_tag) }, 400)
            else
              TagSerializer.new(new_tag).serializable_hash
            end
          end

          desc 'DELETE /tags/:id'
          delete '/:id' do
            tag.destroy
            error!({ message: error_message(tag) }, 400) unless tag.destroyed?

            status :ok
          end

          desc 'PATCH /tags/:id'
          params do
            requires :id, type: Integer
            optional :name, type: String
            optional :description, type: String
          end
          patch '/:id' do
            if tag.update(params)
              TagSerializer.new(tag).serializable_hash
            else
              error!({ message: error_message(tag) }, 400)
            end
          end
        end
      end
    end
  end
end
