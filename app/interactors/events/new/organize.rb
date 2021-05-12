class Events::New::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::Events::New::SetLocation,
           ::Events::New::SetAttributes,
           ::Events::Save
end
