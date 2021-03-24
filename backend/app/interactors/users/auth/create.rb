class Users::Auth::Create < ApplicationInteractor
  uses_via_context :params

  def call
    user = User.create!(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password]
    )

    context.user = user
  end
end
