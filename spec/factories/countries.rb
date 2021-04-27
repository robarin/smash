FactoryBot.define do
  factory :country do
    abbrev { Faker::Address.unique.country_code }
    name { Faker::Address.country_by_code(code: abbrev) }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end
