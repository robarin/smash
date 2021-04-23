module Smash
  module V1
    class Roles < Grape::API
      resource :roles do
        get do
          roles = Role.all

          ActiveModelSerializers::SerializableResource.new(roles).serializable_hash
        end
      end
    end
  end
end
