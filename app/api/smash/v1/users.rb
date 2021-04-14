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
          return if current_admin

          error!({ message: 'You need to confirm your email' }, 401) unless logged_in_user&.confirmed?
        end

        def update_sign_in_count
          return if current_admin

          current_user.update(sign_in_count: current_user.sign_in_count + 1)
        end

        def logged_in_user
          current_admin || current_user
        end

        def user_response(user = nil)
          if current_admin
            return AdminSerializer.new(current_admin).serializable_hash
          end

          res = user || current_user
          UserSerializer.new(res, include: [:person]).serializable_hash
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
          update_sign_in_count

          user_response
        end

        desc 'Sign up user'
        params do
          requires :email, type: String, desc: 'User email'
          requires :password, type: String, desc: 'User password'
          requires :first_name, type: String, desc: 'First name'
          requires :last_name, type: String, desc: 'Last name'
          requires :middle_name, type: String, desc: 'Middle name'
        end

        post '/sign_up' do
          result = ::Users::Auth::Organize.call(params: params)
          error!({ message: result.message }, 400) if result.failure?

          user_response(result.user)
        end

        desc 'Log out user'
        delete '/logout' do
          status :no_content
        end
      end
    end
  end
end
