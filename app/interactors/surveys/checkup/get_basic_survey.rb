class Surveys::Checkup::GetBasicSurvey < ApplicationInteractor
  def call
    context.survey = Survey.basic
  end
end
