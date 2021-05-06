FactoryBot.define do
  factory :event_type do
    name        { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
