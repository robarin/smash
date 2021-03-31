class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  include ActionController::RequestForgeryProtection

  protect_from_forgery prepend: true
  skip_before_action :verify_authenticity_token
end
