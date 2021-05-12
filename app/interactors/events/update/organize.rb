class Events::Update::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::Events::Update::SetLocationAttributes,
           ::Events::Update::SetAttributes,
           ::Events::Save
end
