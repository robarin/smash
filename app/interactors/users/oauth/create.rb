class Users::Oauth::Create < ApplicationInteractor
  uses_via_context :params

  def call
    user = User.from_omniauth(params)
    context.user = user
  end
end
