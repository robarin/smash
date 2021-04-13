class PersonSerializer
  include JSONAPI::Serializer

  belongs_to :user
  belongs_to :gender

  attributes :id,
             :first_name,
             :last_name,
             :middle_name,
             :birth_date,
             :avatar

  attribute :gender do |object|
    GenderSerializer.new(object.gender).serializable_hash[:data]
  end
end
