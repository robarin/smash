class Users::Auth::Create < ApplicationInteractor
  uses_via_context :params

  def call
    user = User.new(
      email: params[:email],
      password: params[:password],
      password_confirmation: params[:password],
    )

    user.build_person(
      first_name: params[:first_name],
      last_name: params[:last_name],
      middle_name: params[:middle_name],
    )

    user.save!

    context.user = user
  end
end
