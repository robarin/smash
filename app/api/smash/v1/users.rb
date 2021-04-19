module Smash
  module V1
    class Users < Grape::API
      helpers do
        def admin
          @admin ||= ::Admin.find_by(email: params[:email])
        end

        def user
          @user ||= ::User.find_by(email: params[:email])
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
          return if admin

          error!({ message: 'You need to confirm your email' }, 401) unless logged_in_user&.confirmed?
        end

        def update_sign_in_count
          return if admin

          user.update(sign_in_count: user.sign_in_count + 1)
        end

        def logged_in_user
          admin || user
        end

        def user_response(subject = nil)
          if admin
            return AdminSerializer.new(admin).serializable_hash
          end

          res = subject || user
          UserSerializer.new(res, include: [:person]).serializable_hash
        end

        def save_user_session(user = nil)
          session[:access_token] = (user || logged_in_user).access_token
        end

        def me
          if current_admin
            return AdminSerializer.new(current_admin).serializable_hash
          end

          UserSerializer.new(current_user, include: [:person]).serializable_hash
        end
      end

      desc 'Get current user'
      get '/me' do
        me
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
          save_user_session

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

          save_user_session(result.user)
          user_response(result.user)
        end

        desc 'Log out user'
        delete '/logout' do
          session.clear
          status :ok
        end
      end
    end
  end
end
