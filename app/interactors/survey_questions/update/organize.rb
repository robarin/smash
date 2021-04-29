class SurveyQuestions::Update::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::SurveyQuestions::Update::SetPositions,
           ::SurveyQuestions::Update::SetAttributes,
           ::SurveyQuestions::QuestionResponses::SetAttributes,
           ::SurveyQuestions::Save
end
