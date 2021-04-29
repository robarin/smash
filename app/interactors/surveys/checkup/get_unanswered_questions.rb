class Surveys::Checkup::GetUnansweredQuestions < ApplicationInteractor
  uses_via_context :survey_complete, :survey_questions, :answered_questions

  def call
    context.unanswered_questions = survey_complete ? [] : unanswered_questions
  end

  private

  def unanswered_questions
    (survey_questions - answered_questions).first(Survey::REGULAR_QUESTIONS_AMOUNT)
  end
end
