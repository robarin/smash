# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "smash"
set :repo_url, "git@github.com:robarin/smash.git"

set :rvm_ruby_version, '2.7.0@smash'

set :file_permissions_paths, %w(app/logs app/cache)
set :file_permissions_users, %w(www-data)

set :rvm_ruby_version, '2.7.0@smash'
set :bundle_bins, %w{gem rake rails}
set :bundle_env_variables, { nokogiri_use_system_libraries: 1 }
set :rvm1_map_bins, %w(rake gem bundle ruby honeybadger)
set :assets_dependencies, %w(app/assets lib/assets vendor/assets Gemfile.lock config/routes.rb)

# Puma
set :pty, true
set :puma_user, fetch(:user)
set :puma_init_active_record, true
set :puma_preload_app, true
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :puma_workers, 5
set :puma_daemonize, true

append :linked_files, ".env", "config/master.key"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "public/uploads", ".bundle"

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :create_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  task :create_binstubs do
    on roles(:app) do
      execute "cd /var/www/smash/current && bin/bundle binstub puma"
      sleep 5
    end
  end

  before :start, :create_dirs
  before :start, :create_binstubs
end

before 'deploy:updated', 'bundler:install'
before 'deploy:updated', 'yarn:install'

# after 'deploy:published', 'deploy:assets:precompile'
after 'deploy:finished', 'puma:stop'
after 'deploy:finished', 'puma:start'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
