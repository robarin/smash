class SurveyQuestions::New::SetAttributes < ApplicationInteractor
  uses_via_context :survey, :params

  before do
    context.responses_params = params[:question_responses]
  end

  def call
    context.survey_question = survey.survey_questions.new(
      params.slice(:body, :position, :response_type)
    )
  end
end
