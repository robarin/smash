FactoryBot.define do
  factory :tag_type do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
