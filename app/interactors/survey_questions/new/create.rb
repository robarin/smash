class SurveyQuestions::New::Create < ApplicationInteractor
  uses_via_context :survey, :question

  def call
    survey_question = survey.survey_questions.new(question: question)
    survey_question.save!

    context.survey_question = survey_question
  end
end
