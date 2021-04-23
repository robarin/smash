class AdminSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :created_at,
             :access_token,
             :admin

  def admin
    object.is_a?(::Admin)
  end
end
