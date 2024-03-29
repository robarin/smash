FactoryBot.define do
  factory :event do
    name { Faker::Lorem.word }
    date { Time.zone.now + rand(10).days }
    description { Faker::Lorem.sentence }

    event_type
    location
  end
end
