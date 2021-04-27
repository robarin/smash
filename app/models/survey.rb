class Survey < ApplicationRecord
  alias_attribute :type, :survey_type

  belongs_to :survey_type

  has_many :survey_questions, dependent: :destroy
  has_many :session_surveys, dependent: :destroy

  validates :name, presence: true

  scope :with_survey_questions, -> {
    includes(
      :survey_type,
      survey_questions: :question_responses
    )
  }
end
