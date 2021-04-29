class Surveys::Checkup::GetSurveyQuestions < ApplicationInteractor
  uses_via_context :survey

  def call
    context.survey_questions = survey.survey_questions
  end
end
