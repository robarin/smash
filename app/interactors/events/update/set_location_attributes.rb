class Events::Update::SetLocationAttributes < ApplicationInteractor
  uses_via_context :event, :params

  def call
    location_params = params.delete(:location)
    event.location.assign_attributes(location_params)
  end
end
