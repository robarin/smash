class Surveys::Result::CreateSessionSurvey < ApplicationInteractor
  uses_via_context :survey, :session

  def call
    context.session_survey = SessionSurvey.create!(
      survey: survey,
      session: session
    )
  end
end
