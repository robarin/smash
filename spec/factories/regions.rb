FactoryBot.define do
  factory :region do
    name { Faker::Address.unique.state }
    country
  end
end
