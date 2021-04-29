class Survey < ApplicationRecord
  BASIC_SURVEY_NAME = 'Basic'.freeze
  BASIC_SURVEY_QUESTIONS_AMOUNT = 8
  REGULAR_QUESTIONS_AMOUNT = 3

  alias_attribute :type, :survey_type

  belongs_to :survey_type

  has_many :survey_questions, -> { order(position: :asc) }, dependent: :destroy
  has_many :session_surveys, dependent: :destroy

  validates :name, presence: true

  scope :with_survey_questions, -> {
    includes(
      :survey_type,
      survey_questions: :question_responses
    )
  }

  def self.basic
    find_by(name: BASIC_SURVEY_NAME)
  end
end
