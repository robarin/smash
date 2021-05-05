module Smash
  module V1
    module Admin
      class TagTypes < Grape::API
        resource :tag_types do
          desc 'GET /tag_types'

          get '/' do
            Tag.serialized_types
          end
        end
      end
    end
  end
end
