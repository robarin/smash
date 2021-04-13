Rails.application.config.middleware.use OmniAuth::Builder do
  OmniAuth.config.allowed_request_methods = [:post, :get]
  OmniAuth.config.logger = Rails.logger
  OmniAuth.config.silence_get_warning = true

  provider :google_oauth2, ENV.fetch('GOOGLE_CLIENT_ID'), ENV.fetch('GOOGLE_CLIENT_SECRET')
  provider :twitter, ENV.fetch('TWITTER_CLIENT_KEY'), ENV.fetch('TWITTER_CLIENT_SECRET')
end
