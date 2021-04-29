class Surveys::Checkup::GetUserAnsweredQuestions < ApplicationInteractor
  uses_via_context :person, :survey

  def call
    answered_questions = SurveyQuestion
      .distinct
      .joins(question_responses: {survey_session_answers: {session_survey: [:survey, :person]}})
      .where(survey_session_answers: {session_surveys: {survey_id: survey.id, person_id: person.id}})

    context.answered_questions = answered_questions
  end
end
