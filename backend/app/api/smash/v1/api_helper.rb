module Smash
  module V1
    module ApiHelper
      extend Grape::API::Helpers

      def session
        env['rack.session']
      end
    end
  end
end
