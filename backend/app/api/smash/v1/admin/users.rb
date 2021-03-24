module Smash
  module V1
    module Admin
      class Users < Grape::API
        resource :users do
          desc 'GET /users'

          get '/' do
            users = User.all
            users.to_json
          end
        end
      end
    end
  end
end
