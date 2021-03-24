module Smash
  module V1
    module Mobile
      class Base < Grape::API
        use Grape::Knock::Authenticable

        # mount Smash::V1::Mobile::
      end
    end
  end
end
