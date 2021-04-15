class User < ApplicationRecord
  include AccessTokenable

  enum role: %i[regular]

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :confirmable,
         :trackable

  alias authenticate valid_password?

  has_one :person, dependent: :destroy

  accepts_nested_attributes_for :person

  class << self
    def from_omniauth(auth)
      where(provider: auth[:provider], uid: auth[:uid]).first_or_create! do |user|
        user.email = auth[:email]
        user.password = auth[:password] || generate_password
        user.build_person(
          first_name: auth[:first_name],
          last_name: auth[:last_name],
          middle_name: auth[:middle_name]
        )
      end
    end

    private

    def generate_password
      Devise.friendly_token(10)
    end
  end
end
