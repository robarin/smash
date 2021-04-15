class Users::Oauth::Update < ApplicationInteractor
  uses_via_context :user

  def call
    user.update!(sign_in_count: user.sign_in_count + 1)
  end
end
