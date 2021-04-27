class SurveyQuestions::New::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::SurveyQuestions::New::SetAttributes,
           ::SurveyQuestions::QuestionResponses::SetAttributes,
           ::SurveyQuestions::Save
end
