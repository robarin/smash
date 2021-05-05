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

  before_validation :set_position

  private

  def set_position
    return if position.present?

    self.position = survey.survey_questions.count + 1
  end
end
