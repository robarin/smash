class AdminSerializer
  include JSONAPI::Serializer

  attributes :id,
             :email,
             :created_at,
             :access_token

  attribute :admin do |object|
    object.is_a?(::Admin)
  end
end
