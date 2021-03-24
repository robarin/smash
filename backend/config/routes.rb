Rails.application.routes.draw do
  mount GrapeSwaggerRails::Engine => '/swagger'
  mount Smash::Api, at: '/'

  devise_for :admins
  devise_for :users
end
