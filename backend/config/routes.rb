Rails.application.routes.draw do
  mount GrapeSwaggerRails::Engine => '/swagger'
  mount RailsReactStarterKit::Api, at: '/'

  devise_for :admins
  devise_for :users
end
