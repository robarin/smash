FactoryBot.define do
  factory :tag do
    name { Faker::Lorem.word }
    description { Faker::Lorem.paragraph(sentence_count: 2) }
  end
end
