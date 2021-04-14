module Smash
  module V1
    class Roles < Grape::API
      resource :roles do
        get do
          roles = Role.all

          RoleSerializer.new(roles).serializable_hash
        end
      end
    end
  end
end
