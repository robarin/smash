FactoryBot.define do
  factory :achievement do
    name { Faker::Lorem.word }
    type { Achievement.types.values.sample }
    description { Faker::Lorem.paragraph }
  end
end
