class RailsReactStarterKit::Api < Grape::API
  format :json
  default_format :json
  formatter :json, Grape::Formatter::ActiveModelSerializers

  rescue_from(Grape::Knock::ForbiddenError) { error!('403 Forbidden', 403) }

  mount RailsReactStarterKit::V1::Base => 'v1'
end
