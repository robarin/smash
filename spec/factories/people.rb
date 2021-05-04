FactoryBot.define do
  factory :person do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    middle_name { Faker::Name.middle_name }
    birth_date { Faker::Date.birthday(min_age: 18, max_age: 65) }
    gender
    avatar { Faker::Avatar.image }
    sequence(:phone) { |n| "#{n}#{Faker::PhoneNumber.unique.phone_number}" }
    user
    province
  end
end
