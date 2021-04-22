class Surveys::Result::CreateSurveySessionAnswer < ApplicationInteractor
  uses_via_context :params, :session_survey

  def call
    params[:surveyResult][:questionResponses].each do |res|
      question_responses = QuestionResponse.where(id: res[:questionResponseId])

      question_responses.each do |question_response|
        survey_session_answer = SurveySessionAnswer.new(
          session_survey: session_survey,
          question_response: question_response
        )
        survey_session_answer.body = res[:responseText]
        survey_session_answer.save!
      end
    end
  end
end
