class Surveys::Result::CreateSessionSurvey < ApplicationInteractor
  uses_via_context :person, :params, :survey

  def call
    session_survey = person.session_surveys.create!(
      survey: survey,
      begin_date: Time.zone.now
    )

    context.session_survey = session_survey
  end
end
