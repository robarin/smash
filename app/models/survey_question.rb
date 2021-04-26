class SurveyQuestion < ApplicationRecord
  enum response_type: %i[
    single
    multiple
    text
    single_or_text
    multiple_or_text
    single_select
    multiple_select
  ]

  belongs_to :survey
  has_many :question_responses, dependent: :destroy

  accepts_nested_attributes_for :question_responses

  validates :body, presence: true
end
