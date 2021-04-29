class SurveyQuestions::New::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::SurveyQuestions::New::SetPositions,
           ::SurveyQuestions::New::SetAttributes,
           ::SurveyQuestions::QuestionResponses::SetAttributes,
           ::SurveyQuestions::Save
end
