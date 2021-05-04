FactoryBot.define do
  factory :rating do
    name { Faker::Lorem.word }
    numeric { Faker::Number.decimal(l_digits: 2) }
    description { Faker::Lorem.paragraph }
  end
end
