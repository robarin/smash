FactoryBot.define do
  factory :location do
    city          { Faker::Address.city }
    street_number { Faker::Address.street_address }
    zip           { Faker::Address.zip_code }
    name          { Faker::Name.name }
    description   { Faker::Lorem.paragraph(sentence_count: 2) }

    location_type
    province
  end
end
