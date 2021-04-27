FactoryBot.define do
  factory :survey do
    name { Faker::Lorem.word }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
    association :survey_type, :basic
  end
end
