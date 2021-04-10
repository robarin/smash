module Smash
  module V1
    module ApiHelper
      extend Grape::API::Helpers

      def current_user
        @current_user ||= ::User.find_by(access_token: token)
      end

      def token
        headers['X-Auth-Access-Token'] || params[:access_token]
      end

      def authenticate_user!
        error!('401 Unauthorized', 401) unless current_user
      end

      def session
        env['rack.session']
      end
    end
  end
end
