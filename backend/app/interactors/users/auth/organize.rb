class Users::Auth::Organize
  include Interactor::Organizer
  include Transactable

  organize ::Users::Auth::Create
end
