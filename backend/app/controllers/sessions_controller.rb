class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: %i[oauth create]

  def create
    ActionCable.server.broadcast('messages_channel', auth_data)

    render status: :ok
  end

  private

  def auth_data
    request.env['omniauth.auth']
  end
end
