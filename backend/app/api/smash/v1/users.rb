module Smash
  module V1
    class Users < Grape::API
      helpers do
        def current_admin
          @current_admin ||= ::Admin.find_by(email: params[:email])
        end

        def current_user
          @current_user ||= ::User.find_by(email: params[:email])
        end

        def validate_password!
          error!({ message: 'Invalid password' }, 401) unless logged_in_user&.valid_password?(params[:password])
        end

        def validate_email!
          error!({ message: 'Invalid email' }, 401) unless logged_in_user
        end

        def validate_user!
          validate_email!
          validate_password!
        end

        def check_confirmation!
          error!({ message: 'You need to confirm your email' }, 401) unless logged_in_user&.confirmed?
        end

        def logged_in_user
          current_admin || current_user
        end

        def user_response(user = nil)
          if current_admin
            return current_admin.as_json.merge('isAdmin' => true)
          end

          res = user || current_user
          UserSerializer.new(res).serializable_hash
        end

        def generate_password
          Devise.friendly_token(10)
        end
      end

      resource :users do
        desc 'Log in user'
        params do
          requires :email, type: String, desc: 'User email'
          requires :password, type: String, desc: 'User password'
        end

        post '/login' do
          validate_user!
          check_confirmation!

          user_response
        end

        desc 'Sign up user'
        params do
          requires :email, type: String, desc: 'User email'
          requires :password, type: String, desc: 'User password'
          requires :first_name, type: String, desc: 'First name'
          requires :last_name, type: String, desc: 'Last name'
        end

        post '/sign_up' do
          result = ::Users::Auth::Organize.call(params: params)
          error!(result.message, 400) if result.failure?

          user_response(result.user)
        end

        desc 'Log out user'
        delete '/logout' do
          status :no_content
        end

        namespace :oauth do
          desc 'Sign up with oauth'
          params do
            requires :email, type: String, desc: 'User email'
            requires :first_name, type: String, desc: 'First name'
            requires :last_name, type: String, desc: 'Last name'
            optional :provider, type: String, desc: 'OAuth provider'
            optional :uid, type: String, desc: 'OAuth UID'
          end

          post '/sign_up' do
            new_password = generate_password
            user_data = params.merge(password: new_password)

            result = ::Users::Oauth::Organize.call(params: user_data)
            error!(result.message, 400) if result.failure?

            user_response(result.user)
          end
        end
      end
    end
  end
end
