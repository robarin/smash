class People::Update::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::People::Update::Build,
           ::People::Update::Save
end
