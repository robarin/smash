class Question < ApplicationRecord
  belongs_to :question_type

  has_many :survey_questions, dependent: :destroy
  has_many :question_responses, dependent: :destroy

  validates :name, :body, presence: true

  accepts_nested_attributes_for :question_responses
end
