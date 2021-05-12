class Events::New::SetAttributes < ApplicationInteractor
  uses_via_context :params, :location

  def call
    event = location.events.new(params)
    context.event = event
  end
end
