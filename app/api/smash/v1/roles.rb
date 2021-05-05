module Smash
  module V1
    class Roles < Grape::API
      resource :roles do
        get do
          Person.roles.keys
        end
      end
    end
  end
end
