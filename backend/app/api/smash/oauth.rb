module Smash
  class Oauth < Grape::API
    helpers do
      def user_data
        @user_data ||= request.env['omniauth.auth']
      end

      def username
        name = user_data.info.name
        return unless name

        full_name = name.split(' ')
        {
          first_name: full_name[0],
          last_name: full_name[1]
        }
      end

      def omniauth_data
        user_data.info.merge(
          username,
          {
            provider: user_data.provider,
            uid: user_data.uid
          }
        )
      end

      def authorized_user
        @authorized_user ||= ::Users::Oauth::Organize.call(params: omniauth_data).user
      end

      def serialized_user
        UserSerializer.new(authorized_user).serializable_hash
      end

      def stream_user
        ActionCable.server.broadcast('users_channel', serialized_user)
      end
    end

    namespace :auth do
      desc 'Twitter oauth callback'
      get '/twitter/callback' do
        stream_user
        status :ok
      end

      desc 'Google oauth callback'
      get '/google_oauth2/callback' do
        stream_user
        status :ok
      end
    end
  end
end
