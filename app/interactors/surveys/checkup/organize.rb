class Surveys::Checkup::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::Surveys::Checkup::GetBasicSurvey,
           ::Surveys::Checkup::GetSurveyQuestions,
           ::Surveys::Checkup::GetUserAnsweredQuestions,
           ::Surveys::Checkup::CompareQuestions,
           ::Surveys::Checkup::GetUnansweredQuestions
end
