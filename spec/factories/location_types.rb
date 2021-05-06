FactoryBot.define do
  factory :location_type do
    name        { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
