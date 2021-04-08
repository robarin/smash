class Person < ApplicationRecord
  belongs_to :user
  belongs_to :gender

  validates :first_name, :last_name, :middle_name, presence: true
end
