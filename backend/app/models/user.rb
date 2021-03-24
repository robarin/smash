class User < ApplicationRecord
  include AccessTokenable

  enum role: %i[regular]

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable

  alias authenticate valid_password?

  def full_name
    "#{first_name} #{last_name}"
  end
end
