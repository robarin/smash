class SurveySessionAnswer < ApplicationRecord
  belongs_to :session_survey
  belongs_to :question_response
end
