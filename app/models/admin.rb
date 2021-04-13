class Admin < ApplicationRecord
  include AccessTokenable

  devise :database_authenticatable,
         :recoverable,
         :rememberable,
         :validatable
end
