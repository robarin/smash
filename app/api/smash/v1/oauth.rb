module Smash
  module V1
    class Oauth < Grape::API
      helpers Smash::V1::ApiHelper
      helpers do
        def user_data
          @user_data ||= request.env['omniauth.auth']
        end

        def username
          default_name = { first_name: '', last_name: '' }
          name = user_data.info.name

          return default_name unless name

          full_name = name.split(' ')
          default_name.merge(
            first_name: full_name[0],
            last_name: full_name[1]
          )
        end

        def provider_data
          {
            provider: user_data.provider,
            uid: user_data.uid
          }
        end

        def omniauth_data
          user_data.info.merge(
            username,
            provider_data
          )
        end

        def create_user
          @user ||= begin
            result = ::Users::Oauth::Organize.call(params: omniauth_data)
            error!({ message: result.message }) if result.failure?

            result.user
          end
        end

        def authorized_user
          @authorized_user ||= create_user
        end

        def serialized_user
          UserSerializer.new(authorized_user, include: [:person]).serializable_hash
        end

        def stream_user
          ActionCable.server.broadcast('users_channel', serialized_user)
        end

        def save_user_session
          session[:access_token] = authorized_user.access_token
        end
      end

      namespace :auth do
        desc 'Twitter oauth callback'
        get '/twitter/callback' do
          create_user
          stream_user
          save_user_session

          status :ok
        end

        desc 'Google oauth callback'
        get '/google_oauth2/callback' do
          create_user
          stream_user
          save_user_session

          status :ok
        end
      end
    end
  end
end
