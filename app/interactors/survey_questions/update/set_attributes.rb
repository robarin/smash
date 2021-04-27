class SurveyQuestions::Update::SetAttributes < ApplicationInteractor
  uses_via_context :survey_question, :params

  before do
    context.responses_params = params[:question_responses]
  end

  def call
    survey_question.assign_attributes(
      params.slice(:body, :response_type, :position)
    )
  end
end
