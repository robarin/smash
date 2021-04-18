require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Smash
  class Application < Rails::Application
    config.api_only = true
    config.session_store :cookie_store, key: '_interslice_session', httponly: true
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore, config.session_options

    config.autoload_paths << Rails.root.join('app', 'api')
    config.autoload_paths << Rails.root.join('app', 'channels')
    config.autoload_paths << Rails.root.join('app', 'interactors', 'support')
    config.autoload_paths << Rails.root.join('app', 'interactors')
    config.autoload_paths << "#{Rails.root}/lib"
    config.assets.initialize_on_precompile = false

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Don't generate system test files.
    config.generators.system_tests = nil
    config.generators do |g|
      g.assets false
      g.helper false
      g.orm :active_record
      g.template_engine :slim
      g.stylesheets false
      g.javascripts false

      g.test_framework :rspec,
                       fixtures: true,
                       view_specs: false,
                       helper_specs: false,
                       routing_specs: false,
                       request_specs: false,
                       controller_specs: true
    end

    config.active_job.queue_adapter = :delayed_job
  end
end
