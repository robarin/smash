class Surveys::Result::CreateSession < ApplicationInteractor
  uses_via_context :person, :params

  def call
    session = person.sessions.create!(begin_date: Time.zone.now)

    context.session = session
  end
end
