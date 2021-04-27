module Smash
  module V1
    module Admin
      module ApiHelper
        extend Grape::API::Helpers

        def current_admin
          @current_admin ||= ::Admin.find_by(access_token: token)
        end

        def token
          headers['X-Auth-Access-Token'] || session[:access_token]
        end

        def authenticate_admin!
          # TODO use session auth instead of token
          # error!('401 Unauthorized', 401) unless current_admin
        end

        def session
          env['rack.session']
        end

        def error_message(object)
          object.errors.full_messages.join('; ')
        end
      end
    end
  end
end
