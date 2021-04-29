class Surveys::Checkup::CompareQuestions < ApplicationInteractor
  uses_via_context :answered_questions, :survey_questions

  def call
    context.survey_complete = completed?
  end

  private

  def completed?
    answered_questions.count == survey_questions.count
  end
end
