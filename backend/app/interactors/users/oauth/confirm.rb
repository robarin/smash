class Users::Oauth::Confirm < ApplicationInteractor
  uses_via_context :user

  def call
    user.confirm
  end
end
