class User < ApplicationRecord
  enum role: %i[regular]

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable

  validates :access_token, presence: true, uniqueness: true

  before_validation :ensure_access_token!

  alias authenticate valid_password?

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def ensure_access_token!
    self.access_token ||= generate_access_token
  end

  def generate_access_token
    loop do
      token = Devise.friendly_token(32)
      break token unless User.find_by(access_token: token)
    end
  end
end
