class SurveyQuestion < ApplicationRecord
  enum response_type: {
    single: 0,
    multiple: 1,
    text: 2,
    single_or_text: 3,
    multiple_or_text: 4,
    single_select: 5,
    multiple_select: 6
  }

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
