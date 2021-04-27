class SurveyQuestions::Save < ApplicationInteractor
  uses_via_context :survey_question

  def call
    survey_question.save!
  end
end
