FactoryBot.define do
  factory :country do
    abbrev      { Faker::Address.unique.country_code }
    name        { Faker::Address.country_by_code(code: abbrev) }
    description { Faker::Lorem.sentence }
  end
end
