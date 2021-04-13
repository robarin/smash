class Smash::Api < Grape::API
  format :json
  default_format :json
  formatter :json, Grape::Formatter::ActiveModelSerializers

  # rescue_from(Grape::Knock::ForbiddenError) { error!('403 Forbidden', 403) }

  mount Smash::V1::Base => 'v1'
  mount Smash::V1::Admin::Base => 'v1/admin'
  mount Smash::Oauth => '/'
end
