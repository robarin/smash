class PersonSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :gender
  belongs_to :province

  attributes :id,
             :first_name,
             :last_name,
             :middle_name,
             :birth_date,
             :phone,
             :avatar

  def avatar
    return unless object.avatar.present?

    object.avatar.versions.reduce({}) do |h, v|
      h[v[0]] = { url: v[1].url }
      h
    end
  end
end
