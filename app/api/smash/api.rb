class Smash::Api < Grape::API
  before do
    params.deep_transform_keys!(&:underscore)
  end

  format :json
  default_format :json

  # rescue_from(Grape::Knock::ForbiddenError) { error!('403 Forbidden', 403) }

  mount Smash::V1::Base => 'v1'
  mount Smash::V1::Admin::Base => 'v1/admin'
  mount Smash::V1::Oauth => '/'
end
