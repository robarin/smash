namespace :deploy do
  desc 'build frontend application'
  task :frontend_build do
    on roles(:all) do
      execute "cd #{File.join(release_path, 'frontend')} && yarn install && yarn build:tailwind && yarn build"
    end
  end

  desc 'move assets to application catalog'
  task :frontend_release do
    on roles(:all) do
      assets     = File.join(release_path, 'frontend', 'build', '*')
      public_dir = File.join(release_path, 'public')

      execute "mv #{assets} #{public_dir}"
    end
  end
end
