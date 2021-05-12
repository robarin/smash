class Events::New::SetLocation < ApplicationInteractor
  uses_via_context :params

  def call
    location_params = params.delete(:location)
    location = Location.new(location_params)

    context.location = location
  end
end
