class Response < ApplicationRecord
  has_many :question_responses, dependent: :destroy

  validates :name, presence: true
end
