class Users::Oauth::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::Users::Oauth::Create,
           ::Users::Oauth::Confirm,
           ::Users::Oauth::Update
end
