module AccessTokenable
  extend ActiveSupport::Concern

  included do
    validates :access_token, presence: true, uniqueness: true

    before_validation :ensure_access_token!
  end

  private

  def ensure_access_token!
    self.access_token ||= generate_access_token
  end

  def generate_access_token
    loop do
      token = Devise.friendly_token(32)
      break token unless self.class.find_by(access_token: token)
    end
  end
end
