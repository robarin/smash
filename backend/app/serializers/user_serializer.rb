class UserSerializer
  include JSONAPI::Serializer

  attributes :id,
             :first_name,
             :last_name,
             :email,
             :created_at,
             :access_token,
             :provider,
             :uid,
             :role

  attribute :confirmed do |object|
    object.confirmed?
  end
end
