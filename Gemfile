source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.0'

gem 'active_model_serializers', '~> 0.10.4'
gem 'carrierwave'
gem 'daemons'
gem 'delayed_job_active_record'
gem 'devise', github: 'heartcombo/devise', branch: 'master'
gem 'devise-jwt'
gem 'dotenv-rails'
gem 'jwt', '~> 2.2', '>= 2.2.2'
gem 'grape'
gem 'grape_on_rails_routes'
gem 'grape-route-helpers'
gem 'grape-swagger'
gem 'grape-swagger-rails'
gem 'interactor', '~> 3.0'
gem 'rack_session_access', git: 'https://github.com/the-sanjar/rack_session_access'
gem 'responders'
gem 'rest-client'
gem 'sendinblue'
gem "sentry-ruby"
gem "sentry-rails"
gem 'selenium-webdriver'
gem 'rails', '~> 6.1.3'
gem 'rack-cors'
gem 'redis'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'jsonapi-serializer'
gem 'jbuilder', '~> 2.7'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.4.4', require: false

gem 'omniauth', '~> 2.0', '>= 2.0.3'
gem 'omniauth-rails_csrf_protection'
gem 'omniauth-google-oauth2', '~> 1.0'
gem 'omniauth-twitter'

group :development, :test do
  gem 'awesome_print'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'launchy'

  gem 'bullet'
  gem 'capybara-email'
  gem 'cypress-on-rails'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'fuubar'
  gem 'rspec-rails'
  gem 'json_spec'
  gem 'webdrivers', '~> 4.0'
end

group :development do
  gem 'better_errors'
  gem 'foreman'

  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'

  gem 'rubocop', require: false
  gem 'rubocop-rspec', require: false

  gem 'capistrano'
  gem 'capistrano3-puma', github: "seuros/capistrano-puma"
  gem 'capistrano-rails', require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano-rvm', require: false
  gem 'capistrano-faster-assets', require: false
  gem 'capistrano3-delayed-job'
  gem 'capistrano-yarn'
end

group :test do
  gem 'database_cleaner'
  gem 'simplecov', require: false
end
