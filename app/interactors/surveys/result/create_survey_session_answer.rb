class Surveys::Result::CreateSurveySessionAnswer < ApplicationInteractor
  uses_via_context :params, :session_survey

  def call
    params[:survey_result][:question_responses].each do |res|
      question_responses = QuestionResponse.where(id: res[:question_response_id])

      question_responses.each do |question_response|
        survey_session_answer = SurveySessionAnswer.new(
          session_survey: session_survey,
          question_response: question_response
        )
        survey_session_answer.body = res[:response_text]
        survey_session_answer.save!
      end
    end
  end
end
