class People::Update::Build < ApplicationInteractor
  uses_via_context :person, :params

  def call
    person.set_new_attributes(params)
  end
end
