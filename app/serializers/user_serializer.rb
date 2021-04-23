class UserSerializer < ActiveModel::Serializer
  has_one :person, serializer: PersonSerializer

  attributes :id,
             :email,
             :created_at,
             :access_token,
             :provider,
             :uid,
             :sign_in_count,
             :confirmed,
             :person

  def confirmed
    object.confirmed?
  end
end
