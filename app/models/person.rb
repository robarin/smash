class Person < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  belongs_to :user
  belongs_to :gender

  has_many :sessions, dependent: :destroy

  validates :first_name, :last_name, :middle_name, presence: true

  def set_new_attributes(attrs)
    assign_attributes(permitted_attributes(attrs))
  end

  private

  def permitted_attributes(attrs)
    attrs.select { |k,_v| self.attributes.key?(k) }
  end
end
