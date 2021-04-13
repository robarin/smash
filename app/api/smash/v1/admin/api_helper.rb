module Smash
  module V1
    module Admin
      module ApiHelper
        extend Grape::API::Helpers

        def current_admin
          @current_admin ||= ::Admin.find_by(access_token: token)
        end

        def token
          headers['X-Auth-Access-Token'] || params[:access_token]
        end

        def authenticate_admin!
          error!('401 Unauthorized', 401) unless current_admin
        end
      end
    end
  end
end
