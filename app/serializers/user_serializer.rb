class UserSerializer
  include JSONAPI::Serializer

  has_one :person

  attributes :id,
             :email,
             :created_at,
             :access_token,
             :provider,
             :uid,
             :sign_in_count

  attribute :confirmed do |object|
    object.confirmed?
  end

  attribute :person do |object|
    PersonSerializer.new(object.person).serializable_hash[:data]
  end
end
