class User < ApplicationRecord
  include AccessTokenable

  enum role: %i[regular]

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable,
         :omniauthable, omniauth_providers: %i[google_oauth2]

  alias authenticate valid_password?

  def self.from_omniauth(auth)
    where(provider: auth[:provider], uid: auth[:uid]).first_or_create! do |user|
      user.email = auth[:email]
      user.password = auth[:password]
      user.first_name = auth[:first_name]
      user.last_name = auth[:last_name]
    end
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
