class Events::Update::SetAttributes < ApplicationInteractor
  uses_via_context :event, :params

  def call
    event.assign_attributes(params)
  end
end
