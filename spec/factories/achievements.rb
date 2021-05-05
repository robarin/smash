FactoryBot.define do
  factory :achievement do
    name { Faker::Lorem.word }
    description { Faker::Lorem.paragraph }
  end
end
