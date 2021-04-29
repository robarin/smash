class Surveys::Result::FindSurvey < ApplicationInteractor
  uses_via_context :person, :params

  def call
    context.survey = Survey.find_by(id: params[:survey_result][:survey_id]) || Survey.basic
  end
end
