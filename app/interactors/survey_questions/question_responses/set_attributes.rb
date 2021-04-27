class SurveyQuestions::QuestionResponses::SetAttributes < ApplicationInteractor
  uses_via_context :survey_question, :responses_params

  def call
    question_responses = responses_params.map do |response_params|
      response = survey_question.question_responses.find_or_initialize_by(id: response_params[:id])
      response.assign_attributes(response_params)
      response
    end

    survey_question.assign_attributes(question_responses: question_responses)
  end
end
