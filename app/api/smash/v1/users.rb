module Smash
  module V1
    class Users < Grape::API
      LOGIN_ERROR_MESSAGE = 'Invalid email or password'.freeze
      CONFIRMATION_ERROR_MESSAGE = 'You need to confirm your email'.freeze

      helpers do
        def admin
          @admin ||= ::Admin.find_by(email: params[:email])
        end

        def user
          @user ||= ::User.find_by(email: params[:email])
        end

        def serialized_admin(admin)
          AdminSerializer.new(admin).serializable_hash
        end

        def survey_result
          @survey_result ||= ::Surveys::Checkup::Organize.call(person: user.person)
        end

        def check_user_survey_questions
          questions = {}

          unless survey_result.survey_complete
            questions[:survey_questions] = ActiveModelSerializers::SerializableResource.new(
              survey_result.unanswered_questions,
              each_serializer: SurveyQuestionSerializer
            ).serializable_hash
          end

          questions
        end

        def serialized_user(user)
          UserSerializer.new(user).serializable_hash(include: {person: [:gender, :province]})
        end

        def valid_password?
          logged_in_user&.valid_password?(params[:password])
        end

        def valid_email?
          logged_in_user.present?
        end

        def validate_user!
          return if valid_email? && valid_password?
          error!({message: LOGIN_ERROR_MESSAGE}, 401)
        end

        def check_confirmation!
          return if admin

          error!({message: CONFIRMATION_ERROR_MESSAGE}, 401) unless logged_in_user&.confirmed?
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
            return serialized_admin(admin)
          end

          serialized_user(subject || user)
        end

        def save_user_session(user = nil)
          session[:access_token] = (user || logged_in_user).access_token
        end

        def me
          if current_admin
            return serialized_admin(current_admin)
          end

          serialized_user(current_user)
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

          response = user_response

          if user&.surveyable?
            response.merge!(check_user_survey_questions)
          end

          response
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
          error!({message: result.message}, 400) if result.failure?

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
