class Person < ApplicationRecord
  enum role: { student: 0, recruiter: 1 }

  mount_uploader :avatar, AvatarUploader

  belongs_to :user
  belongs_to :gender, optional: true
  belongs_to :province, optional: true

  has_many :session_surveys, dependent: :destroy

  has_many :person_groups, dependent: :destroy
  has_many :groups, through: :person_groups

  has_many :person_events, dependent: :destroy
  has_many :events, through: :person_events

  def full_name
    "#{first_name} #{last_name}"
  end

  def set_new_attributes(attrs)
    assign_attributes(permitted_attributes(attrs))
  end

  private

  def permitted_attributes(attrs)
    attrs.select { |k,_v| self.attributes.key?(k) }
  end
end
