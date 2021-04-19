# frozen_string_literal: true

class Users::ConfirmationsController < Devise::ConfirmationsController
  def show
    super
  end

  protected

  def after_confirmation_path_for(resource_name, resource)
    status = resource.confirmed? ? 'success' : 'failure'
    "#{ENV.fetch('CLIENT_URL')}/login?confirmation=#{status}"
  end
end
