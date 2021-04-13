class Session < ApplicationRecord
  belongs_to :person

  has_many :session_surveys, dependent: :destroy

  validates :begin_date, presence: true
end
