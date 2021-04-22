class Surveys::Result::FindSurvey < ApplicationInteractor
  uses_via_context :person, :params

  def call
    context.survey = Survey.find_by!(id: params[:surveyResult][:surveyId])
  end
end
