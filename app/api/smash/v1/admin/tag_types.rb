module Smash
  module V1
    module Admin
      class TagTypes < Grape::API
        resource :tag_types do
          desc 'GET /tag_types'

          get '/' do
            tag_types = ::TagType.all

            ActiveModelSerializers::SerializableResource.new(tag_types).serializable_hash
          end
        end
      end
    end
  end
end
