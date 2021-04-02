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

  class << self
    def from_omniauth(auth)
      where(provider: auth[:provider], uid: auth[:uid]).first_or_create! do |user|
        user.email = auth[:email]
        user.password = auth[:password] || generate_password
        user.first_name = auth[:first_name]
        user.last_name = auth[:last_name]
      end
    end

    private

    def generate_password
      Devise.friendly_token(10)
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
