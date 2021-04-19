class Question < ApplicationRecord
  enum response_type: %i[single multiple text single_or_text multiple_or_text]

  belongs_to :question_type, optional: true

  has_many :survey_questions, dependent: :destroy
  has_many :question_responses, dependent: :destroy

  validates :name, :body, presence: true

  accepts_nested_attributes_for :question_responses
end
