module Smash
  module V1
    class Profiles < Grape::API
      helpers do
        def user_response
          UserSerializer.new(current_user.reload, include: [:person]).serializable_hash
        end
      end

      namespace :profile do
        desc 'Update user\'s profile'
        params do
          requires :first_name, type: String, desc: 'First name'
          requires :last_name, type: String, desc: 'Last name'
          requires :middle_name, type: String, desc: 'Middle name'
        end

        patch do
          result = ::People::Update::Organize.call(person: current_user.person, params: params)
          error!({ message: result.message }) if result.failure?

          user_response
        end

        desc 'Update user\'s avatar'
        params do
          requires :file, type: File, desc: 'Profile image'
        end
        post '/avatar' do
          result = ::People::Update::Avatar.call(person: current_user.person, file: params[:file])
          error!({ message: result.message }) if result.failure?

          user_response
        end
      end
    end
  end
end
