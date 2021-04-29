FactoryBot.define do
  factory :province do
    name { Faker::Address.state }
    region
  end
end
