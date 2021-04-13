class People::Update::Save < ApplicationInteractor
  uses_via_context :person

  def call
    person.user.save!
  end
end
