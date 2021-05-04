FactoryBot.define do
  factory :event do
    name { Faker::Lorem.word }
    date { Time.zone.now }
    type { Event.types.values.sample }
    location
    description { Faker::Lorem.paragraph }
  end
end
