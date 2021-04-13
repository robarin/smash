class UserSerializer
  include JSONAPI::Serializer

  has_one :person

  attributes :id,
             :email,
             :created_at,
             :access_token,
             :provider,
             :uid

  attribute :confirmed do |object|
    object.confirmed?
  end
end
