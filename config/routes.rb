Rails.application.routes.draw do
  mount GrapeSwaggerRails::Engine => '/swagger'
  mount Smash::Api, at: '/'
  mount ActionCable.server => '/cable'

  devise_for :admins
  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    sessions: 'users/sessions'
  }
end
