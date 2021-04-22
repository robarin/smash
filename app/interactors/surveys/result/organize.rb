class Surveys::Result::Organize < ApplicationInteractor
  include Interactor::Organizer
  include Transactable

  organize ::Surveys::Result::CreateSession,
           ::Surveys::Result::FindSurvey,
           ::Surveys::Result::CreateSessionSurvey,
           ::Surveys::Result::CreateSurveySessionAnswer
end
