FactoryBot.define do
  factory :location do
    name { Faker::Name.name }
    type { Location.types.values.sample }
    street_number { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    zip { Faker::Address.zip_code }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end
