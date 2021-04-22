class People::Profile::Setup < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::Surveys::Result::Organize,
           ::People::Profile::Update
end
