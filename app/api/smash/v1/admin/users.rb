module Smash
  module V1
    module Admin
      class Users < Grape::API
        resource :users do
          desc 'GET /users'

          get '/' do
            users = ::User.includes(:person)

            ActiveModelSerializers::SerializableResource.new(users).serializable_hash
          end
        end
      end
    end
  end
end
