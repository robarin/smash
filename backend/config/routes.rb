Rails.application.routes.draw do
  mount GrapeSwaggerRails::Engine => '/swagger'
  mount Smash::Api, at: '/'

  devise_for :admins
  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    omniauth_callbacks: 'users/omniauth_callbacks',
    sessions: 'users/sessions'
  }

  get :auth, to: 'sessions#auth'
end
