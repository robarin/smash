class PersonSerializer
  include JSONAPI::Serializer

  belongs_to :user

  attributes :id,
             :first_name,
             :last_name,
             :middle_name,
             :birth_date
end
