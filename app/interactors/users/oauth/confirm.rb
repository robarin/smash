class Users::Oauth::Confirm < ApplicationInteractor
  uses_via_context :user

  def call
    return if user.confirmed?

    user.confirm
  end
end
