class Events::Save < ApplicationInteractor
  uses_via_context :event

  def call
    event.save!
  end
end
